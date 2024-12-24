"use client";

import React, { useEffect } from "react";
import ModalLayout from "@/components/modalLayout";
import InputField from "@/components/theme/input";
import CustomButton from "@/components/theme/customButton";
import useFetch from "@/hooks/useFetch";
import { usePathname, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import { signupValidationSchema } from "@/validationSchema";
import useAuthService from "@/utils/authService";
import { saveTokenForResendApi } from "@/utils/Functions";

interface Iprops {
  handleClose: () => void;
  show: boolean;
  title?: string;
  editModal?: boolean;
  loading?: boolean;
  formikErrorMesg?: any;
  setSteps: any;
}

const SignUpModal = ({
  handleClose,
  title,
  show,

  setSteps,
}: Iprops) => {
  const router = useRouter();
  const searchParams = usePathname();
  const token = searchParams.split("/");
  const paramsToken = token[token.length - 1];

  const { storeToken, getToken,clearToken } = useAuthService();

  const [signupApiCall, { response, loading, error }] = useFetch(
    `auth/signup/${paramsToken}/`,
    {
      method: "post",
    },
    true
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      handleLink(values);
    },
  });

  const handleLink = async (values: any) => {
    const { confirm_password, ...payload } = values;
    const res = await signupApiCall(payload);
    // storeToken(res?.data, "");
    // saveTokenForResendApi(res?.data);
    if (res.status) {

      const decodedToken = JSON.parse(atob(res?.data.split(".")[1]));
     
      localStorage.setItem('decodedEmail',decodedToken.email)
      toast.success(res.message);
      setSteps(2);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <ModalLayout
      title={title}
      show={show}
      size={525}
      handleToggle={() => {
        handleClose();
      }}
      showIcon={true}
    >
      <div>
        <h1
          className="text-[37px] font-black text-[#494F53] uppercase "
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          Sign up for access.
        </h1>
        <p
          className="text-[16px] font-light text-[#494F53] mb-4 "
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          View detailed offering details and documents to begin a subscription
          after creating an account.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-6">
            <InputField
              className="!rounded-none"
              name="email"
              // type="email"
              formik={formik}
              placeholder="Email"
            />

            <InputField
              className="!rounded-none"
              name="password"
              type="password"
              formik={formik}
              placeholder="Password"
            />

            <InputField
              className="!rounded-none"
              name="confirm_password"
              type="password"
              formik={formik}
              placeholder="Confirm  password"
            />
          </div>
          <CustomButton
            className="rounded-none !text-[20px] h-[48px] !font-bold !border-none w-full mt-10"
            type="submit"
            loading={loading}
            disabled={loading}
            onClick={() => formik.handleSubmit}
          >
            Create Account
          </CustomButton>
        </form>
        <div
          className="text-left mt-7 text-[20px] font-normal text-[#494F53]"
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          <span>Have an account already? </span>
          <a
            href="#"
            className="text-[20px] font-bold text-[#FF782C]"
            onClick={() => {
              clearToken();
              router.push("/auth/login");}}
          >
            Login
          </a>
        </div>
        <p
          className="text-[18px] font-medium text-[#494F53] mt-10"
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          By proceeding, you are accepting our{" "}
          <a href="#" className="text-[#3190E6] underline">
            Privacy Policy
          </a>
          ,{" "}
          <a href="#" className="text-[#3190E6] underline">
            EDCA
          </a>
          , and{" "}
          <a href="#" className="text-[#3190E6] underline">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </ModalLayout>
  );
};

export default SignUpModal;
