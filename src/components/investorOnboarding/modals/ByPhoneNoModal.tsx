"use client";

import React, { useEffect, useState } from "react";
import ModalLayout from "@/components/modalLayout";
import InputField from "@/components/theme/input";
import CustomButton from "@/components/theme/customButton";
import PhoneInputField from "@/components/theme/phoneNumber_input";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { useFormik } from "formik";
import { ByPhoneNoModalSchem } from "@/validationSchema";
import { toast } from "sonner";
import useAuthService from "@/utils/authService";
import PhoneInput from "@/components/theme/phone";

interface Iprops {
  handleClose: () => void;
  show: boolean;
  title?: string;
  editModal?: boolean;
  loading?: boolean;
  formikErrorMesg?: any;
  setSteps: any;
  steps: any;
}

const ByPhoneNoModal = ({
  handleClose,
  title,
  show,
  setSteps,
  steps,
}: Iprops) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("+1");
  const { storeToken, getToken, clearToken } = useAuthService();
  const token = getToken();
  const [email, setEmail] = useState<string>(
    localStorage.getItem("decodedEmail")
  );

  const [enableTwoFactorApi, { response, loading, error }] = useFetch(
    `/auth/enable-twofactor/`,
    {
      method: "PUT",
    },
    true
  );

  const formik = useFormik({
    initialValues: {
      phone_no: "",
    },
    validationSchema: ByPhoneNoModalSchem,
    onSubmit: (values) => {
      handleTwoFactorViaPhone(values);
    },
  });
  const handleTwoFactorViaPhone = async (values: any) => {
    const newValues = {
      ...values,
      country_code: selectedCountry,
      two_factor_type: 2,
      email: email,
    };
    const res = await enableTwoFactorApi(newValues);
    // storeToken(res?.data, "");
    localStorage.setItem("enableToken", res?.data);

    if (res.status) {
      const decodedToken = JSON.parse(atob(res?.data.split(".")[1]));

      localStorage.setItem("decodedPhone", decodedToken.phone_no);
      localStorage.setItem("decodedPhoneCode", decodedToken.country_code);
      localStorage.setItem("decodedTwoFA", decodedToken.two_factor_type);
      toast.success(res.message);
      setSteps(6);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <ModalLayout
      title={title}
      show={show}
      size={600}
      handleToggle={() => {
        handleClose();
      }}
    >
      <div>
        <form onClick={formik.handleSubmit}>
          <h1
            className="text-[39px] font-black text-[#494F53] uppercase"
            style={{ fontFamily: '"Public Sans", sans-serif' }}
          >
            Phone Number
          </h1>
          <div className="mt-9">
           
            <PhoneInput
              className="w-full border-[0.8px] border-[#DCE1E6] bg-white h-[50px] rounded-none placeholder:!text-[#494F53] placeholder:text-[18px]"
              countryCode={selectedCountry}
              phoneNumber={formik.values.phone_no}
              onChange={({ countryCode, phoneNumber }) => {
                formik.setFieldValue("country_code", countryCode || "+1");
                formik.setFieldValue("phone_no", phoneNumber || "");
              }}
            />
          </div>

          <div className="flex justify-between space-x-4 mt-10">
            <CustomButton
              className="rounded-none !text-[18px] w-[249px] h-[48px] !font-bold !border-none "
              loading={loading}
              disabled={loading}
            >
              Next
            </CustomButton>
            <CustomButton
              variantColor="black"
              variantType="outlined"
              className="w-[249px] h-[48px] rounded-none !text-[18px] !font-bold"
              onClick={() => setSteps(3)}
            >
              Back
            </CustomButton>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default ByPhoneNoModal;
