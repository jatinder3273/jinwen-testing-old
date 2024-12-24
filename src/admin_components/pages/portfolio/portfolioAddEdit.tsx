import CustomButton from "@/components/theme/customButton";
import InputField from "@/components/theme/input";
import React from "react";
import { PulseLoader } from "react-spinners";
interface IProps {
  formik: any;
  loading: boolean;
  buttonLoading: boolean;
  title: string;
  editId: string | string[];
}

const PortfolioAddEdit = ({
  buttonLoading,
  editId,
  formik,
  loading,
  title,
}: IProps) => {
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
              <InputField
                formik={formik}
                name="name"
                placeholder="Portfolio Name"
              />
            </div>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <InputField
                formik={formik}
                name="account_no"
                placeholder="Account Number"
                type="text"
              />
            </div>
          </div>
          <CustomButton
            onClick={() => formik.handleSubmit()}
            loading={buttonLoading}
            className="mt-5"
          >
            {editId ? "Save Portfolio" : "Add Portfolio"}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default PortfolioAddEdit;
