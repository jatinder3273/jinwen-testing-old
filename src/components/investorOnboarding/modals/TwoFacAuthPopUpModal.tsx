"use client";
import React from "react";
import ModalLayout from "@/components/modalLayout";
import InputField from "@/components/theme/input";
import CustomButton from "@/components/theme/customButton";
import { useRouter } from "next/navigation";
import useAuthService from "@/utils/authService";
import { clearTokenForResendApi } from "@/utils/Functions";

interface Iprops {
  handleClose: () => void;
  show: boolean;
  title?: string;
  editModal?: boolean;
  loading?: boolean;
  formikErrorMesg?: any;
  setSteps: any;
}

const TwoFacAuthPopUpModal = ({
  handleClose,
  title,
  show,
  loading,
  setSteps,
}: Iprops) => {
  const router = useRouter();
  const { clearToken } = useAuthService();
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
          Enable Two factor authentication
        </h1>
        <p
          className="text-[16px] font-light text-[#494F53] mb-4"
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          Turning on 2FA can be done either through your email or phone number.
        </p>
        <div className="flex justify-between space-x-4 mt-10">
          <CustomButton
            className="rounded-none !text-[18px] w-[249px] h-[48px] !font-bold !border-none "
            onClick={() => setSteps(3)}
          >
            {" "}
            Enable
          </CustomButton>
          <CustomButton
            variantColor="black"
            variantType="outlined"
            className="rounded-none !text-[18px] w-[249px] h-[48px] !font-bold"
            onClick={() => {
              clearToken();
              clearTokenForResendApi();
              router.push("/auth/login");
            }}
          >
            Not Right Now
          </CustomButton>
        </div>
      </div>
    </ModalLayout>
  );
};

export default TwoFacAuthPopUpModal;
