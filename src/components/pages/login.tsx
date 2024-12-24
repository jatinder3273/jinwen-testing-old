

"use client";
import useFetch from "@/hooks/useFetch";
import useAuthService from "@/utils/authService";
import { loginValidationSchema } from "@/validationSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomButton from "../theme/customButton";
import InputField from "../theme/input";

import { useState } from "react";
import VerifyLoginModal from "../investorOnboarding/modals/VerifyLoginModal";
import { clearTokenForResendApi, saveTokenForResendApi } from "@/utils/Functions";
import VerifyAfterLoginModal from "../investorOnboarding/modals/verifyAfterLogin";

const Login = () => {
  const router = useRouter();
  const { storeToken } = useAuthService();
  const [LoginApi, { loading }] = useFetch("auth/login/", {
    method: "post",
  });
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values) => {
    localStorage.clear();
    const res = await LoginApi(values);
    console.log("res", res);

    if (res?.status) {
      toast.success(res.message);
  
      storeToken(res?.data?.token, `${res?.data?.role?.id ?? ""}`);
      localStorage.setItem('tokenAfterLogin',res?.data?.token);
      localStorage.setItem('emailLogin',res?.data?.email);
      localStorage.setItem('phone',res?.data?.phone_no);
      localStorage.setItem('phoneCode',res?.data?.country_code);
      localStorage.setItem('twoFactorType',res?.data?.two_factor_type ?? 0);
      if (res?.data?.role?.id === 1) {
        router.push("/admin/dashboard");
      } else if (
        res?.data?.role?.id === 2 &&
        res?.data?.two_factor_enable === true
      ) {
        clearTokenForResendApi();
       
      
        setShowVerifyModal(true);
      } else if (res?.data?.role?.id === 2 && !res?.data?.first_name) {
        router.push("/clientOnboarding");
      } else if (res?.data?.role?.id === 2  && res?.data?.first_name) {
        router.push("/clientOnboarding/dashboard");
      } else {
        router.push("/investor/dashboard");
      }
    } else {
      toast.error(res.message);
      console.log(res);
    }
  };

  return (
    <div>
      {showVerifyModal && <VerifyAfterLoginModal show={showVerifyModal} />}
      <p className="font-[900] leading-[47px] text-[40px] text-[#494F53] max-[500px]:text-[33px] max-[500px]:leading-[37px] ">
        LOG IN
      </p>
      <p className="font-[300] leading-[18.8px] text-[16px] text-[#494F53] my-[10px] deploy">
        Please fill the below details to log in.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-5 mt-10">
          <InputField
            formik={formik}
            placeholder="Email"
            type="email"
            name="email"
            noRadius
          />
        </div>
        <div className="my-5 mb-8">
          <InputField
            formik={formik}
            placeholder="Password"
            type="password"
            name="password"
            noRadius
          />
        </div>
        <p className="font-[300] leading-[18.8px] mt-2 text-[16px] text-[#3190E6] text-right">
          <span
            onClick={() => router.push("/auth/forgotPassword")}
            className="cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </p>
        <div className="flex justify-between gap-3 items-center my-8">
          <CustomButton
            type="submit"
            disabled={loading}
            loading={loading}
            noRadius
          >
            Log In
          </CustomButton>
          <p> </p>
          {/* <p
            className="font-[600] leading-[23.5px] text-[20px] text-[#FF782C] max-[500px]:text-[15px] cursor-pointer hover:underline"
            onClick={() => router.push("/auth/signup")}
          >
            Create Account?
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
