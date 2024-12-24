"use client";
import CustomButton from "@/components/theme/customButton";
import InputField from "@/components/theme/input";
import { PulseLoader } from "react-spinners";
import React, { useEffect, useState } from "react";
import SelectField from "@/components/theme/select";
import useFetch from "@/hooks/useFetch";

interface IProps {
  formik: any;
  loading: boolean;
  buttonLoading: boolean;
  title: string;
  editId: string | string[];
}

const AddEditTrade: React.FC<IProps> = ({
  formik,
  loading,
  title,
  buttonLoading,
  editId,
}) => {
  const [portfolioList, setPortfolioList] = useState([]);
  const [getPortfolioList, { errorMessage }] = useFetch(
    "/admin/list-portfolio/",
    {
      method: "POST",
    }
  );
  const handleGetPortfolio = async (pageNumber?: number) => {
    try {
      const res = await getPortfolioList({
        start: 0,
        length: 0,
        search: {
          value: "",
        },
      });
      if (res.status) {
        setPortfolioList(res?.data ?? []);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGetPortfolio();
    }, 300); // Add a debounce to reduce API calls

    return () => clearTimeout(delayDebounceFn);
  }, []);

  return (
    <div className="ring-1 ring-borderColor bg-white py-6 rounded-[10px] min-h-[50vh]">
      <div className="flex justify-between items-center  px-6 pb-6 mb-8 border-b-[1px] border-b-borderColor">
        <h5 className="text-xl font-medium">{title}</h5>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <PulseLoader color="#ff782c" />
        </div>
      ) : (
        <div className="px-6">
          <div className="flex gap-y-5 flex-wrap -mx-[10px]">
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <SelectField
                placeholder="Portfolio"
                formik={formik}
                name="portfolio"
                disabled={editId ? true : false}
                options={portfolioList?.map((item) => ({
                  label: item?.name ?? "",
                  value: item?.id ?? "",
                }))}
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="stock_name"
                placeholder="Stock Name"
              />
            </div>

            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="quantity"
                placeholder="Quantity"
                type="number"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="price"
                placeholder="Price"
                type="number"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="market_value"
                placeholder="Market Value"
                type="number"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="cost_basis"
                placeholder="Cost Basis"
                type="number"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="gain_loss"
                placeholder="Gain/Loss"
                type="number"
              />
            </div>
          </div>
          <CustomButton
            onClick={() => formik.handleSubmit()}
            loading={buttonLoading}
            className="mt-5"
          >
            {editId ? "Save Trade" : "Add Trade"}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default AddEditTrade;
