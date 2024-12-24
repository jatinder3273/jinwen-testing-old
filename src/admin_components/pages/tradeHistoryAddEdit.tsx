"use client";
import CustomButton from "@/components/theme/customButton";
import InputField from "@/components/theme/input";
import SelectField from "@/components/theme/select";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

interface IProps {
  formik: any;
  loading: boolean;
  buttonLoading: boolean;
  title: string;
  editID: string | string[];
}

const TradeHistoryAddEdit: React.FC<IProps> = ({
  formik,
  loading,
  title,
  buttonLoading,
  editID,
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

  // Function to format date to MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = () => {
    formik.values.date = formatDate(formik.values.date);
    formik.handleSubmit();
  };

  return (
    <div className="ring-1 ring-borderColor bg-white py-6 rounded-[10px] min-h-[50vh]">
      <div className="flex justify-between items-center px-6 pb-6 mb-8 border-b-[1px] border-b-borderColor">
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
                disabled={editID ? true : false}
                options={portfolioList?.map((item) => ({
                  label: item?.name ?? "",
                  value: item?.id ?? "",
                }))}
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField formik={formik} name="symbol" placeholder="Symbol" />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="date"
                placeholder="Date"
                type="date"
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
                name="t_price"
                placeholder="T. Price"
                type="number"
                step="0.01"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="c_price"
                placeholder="C. Price"
                type="number"
                step="0.01"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="proceeds"
                placeholder="Proceeds"
                type="number"
                step="0.01"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="commissions"
                placeholder="Commissions"
                type="number"
                step="0.01"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="basis"
                placeholder="Basis"
                type="number"
                step="0.01"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="realized_profit_loss"
                placeholder="Realized P/L"
                type="number"
                step="0.01"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="mtm_profit_loss"
                placeholder="MTM P/L"
                type="number"
                step="0.01"
              />
            </div>
          </div>
          <CustomButton
            onClick={handleSubmit}
            loading={buttonLoading}
            className="mt-5"
          >
            {editID ? "Save Trade History" : "Add Trade History"}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default TradeHistoryAddEdit;
