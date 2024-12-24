"use client";

import React, { useEffect, useState } from "react";
import ModalLayout from "@/components/modalLayout";
import InputField from "@/components/theme/input";
import CustomButton from "@/components/theme/customButton";
import useFetch from "@/hooks/useFetch";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import useAuthService from "@/utils/authService";

interface Iprops {
  handleClose: () => void;
  show: boolean;
  title?: string;
  loading?: boolean;
  formikErrorMesg?: any;
  setSteps: any;
  steps: any;
}

const Confirm2FAModal = ({
  handleClose,
  title,
  show,
  setSteps,
  steps,
}: Iprops) => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [type2FA, setType2FA] = useState<number>(1);
  const [selectedCountry, setSelectedCountry] = useState<string>("+1");

  const { storeToken, getToken } = useAuthService();
  const token = getToken();

  const [enableTwoFactorApi, { response, loading, error }] = useFetch(
    `/auth/enable-twofactor/`,
    {
      method: "PUT",
    },
    true
  );

  useEffect(() => {
    try {
    //   const decodedToken = JSON.parse(atob(token.split(".")[1]));
    //   setEmail(decodedToken.email);
      setEmail(localStorage.getItem('decodedEmail'));
      
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }, [email]);

  const handleTwoFactorAuthViaEmail = async () => {
    const newValues = {
      two_factor_type: 1,
      email: email,
   
    };
    const res = await enableTwoFactorApi(newValues);
    localStorage.setItem("enableToken", res?.data);
    // storeToken(res?.data, "");
    if (res.status) {
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
        <h1
          className="text-[39px] font-black text-[#494F53] uppercase"
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          Confirm Two Factor Authentication
        </h1>
        <p
          className="text-[16px] font-light text-[#494F53] mb-4"
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          To confirm two factor authentication is enabled on your account with
          the email: <strong className="font-bold">{email}</strong>, please
          click <strong className="font-bold">"Submit"</strong>.<br></br>
          Contact support for any issues.
        </p>
        <div className="flex justify-between space-x-4 mt-10">
          <CustomButton
            className="rounded-none !text-[18px] !font-bold h-[48px] !border-none w-[249px]"
            onClick={handleTwoFactorAuthViaEmail}
            loading={loading}
            disabled={loading}
          >
            Submit
          </CustomButton>
          <CustomButton
            variantColor="black"
            variantType="outlined"
            className="rounded-none !text-[18px] h-[48px] !font-bold w-[249px]"
            onClick={() => setSteps(3)}
          >
            Back
          </CustomButton>
        </div>
      </div>
    </ModalLayout>
  );
};

export default Confirm2FAModal;
