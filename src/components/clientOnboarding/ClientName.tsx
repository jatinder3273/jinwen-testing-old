


import React, { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import CustomButton from "@/components/theme/customButton";
import InputField from "../theme/input";
import useFetch from "@/hooks/useFetch";
import { updateInvestorOnboard } from "@/validationSchema";

interface Iprops {
  setSteps: (step: number) => void;
  stepData: {
    first_name?: string;
    last_name?: string;
  };
  setStepData: (data: { first_name: string; last_name: string }) => void;
}

const ClientName = ({ setSteps, stepData, setStepData }: Iprops) => {
  const [updateProfileApi, { loading }] = useFetch(`/auth/update-profile/`, {
    method: "PUT",
  });

  const formik = useFormik({
    initialValues: {
      first_name: stepData?.first_name || "",
      last_name: stepData?.last_name || "",
    },
    validationSchema: updateInvestorOnboard,
    onSubmit: async (values) => {
     
      if (
        values.first_name !== stepData.first_name ||
        values.last_name !== stepData.last_name
      ) {
        try {
          const res = await updateProfileApi(values);

          if (res?.code === 200 && res?.status === 1) {
            toast.success(res.message);
            setStepData({
              first_name: res.data.first_name,
              last_name: res.data.last_name,
            });
            setSteps(2);
          } else {
            toast.error(res?.message || "Something went wrong");
          }
        } catch (error) {
          toast.error("An unexpected error occurred.");
          console.error("Error in API call:", error);
        }
      } else {
        // Proceed to the next step without hitting the API
        setSteps(2);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      first_name: stepData?.first_name || "",
      last_name: stepData?.last_name || "",
    });
  }, [stepData]);

  return (
    <div
      className="flex justify-center m-auto flex-col w-[755px]"
      style={{ height: "calc(100vh - 92px)" }}
    >
      <h1
        className="text-[40px] font-black text-[#494F53] uppercase"
        style={{ fontFamily: '"Public Sans", sans-serif' }}
      >
        Enter your first and last name.
      </h1>
      <p
        className="text-[16px] font-light text-[#494F53] mt-3"
        style={{ fontFamily: '"Public Sans", sans-serif' }}
      >
        This should be the name of you, the person creating this account, which
        may not be the same as the subscribing individual or entity.
      </p>
      <div className="flex w-full justify-center space-x-4 mt-10">
        <div className="!w-1/2">
          <InputField
            formik={formik}
            name="first_name"
            placeholder="First Name"
            className="w-full border-[0.8px] border-[#DCE1E6] bg-white rounded-none "
          />
        </div>
        <div className="!w-1/2">
          <InputField
            formik={formik}
            name="last_name"
            placeholder="Last Name"
            className="w-full border-[0.8px] border-[#DCE1E6] bg-white rounded-none "
          />
        </div>
      </div>
      <CustomButton
        className="rounded-none !text-[18px] !font-bold !border-none w-[208px] h-[48px] mt-10"
        onClick={formik.handleSubmit}
        type="submit"
        disabled={loading}
        loading={loading}
      >
        Continue
      </CustomButton>
    </div>
  );
};

export default ClientName;
