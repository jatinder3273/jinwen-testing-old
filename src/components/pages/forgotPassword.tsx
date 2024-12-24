"use client";
import useFetch from "@/hooks/useFetch";
import { ForgotPasswordSchema } from "@/validationSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import InputField from "../theme/input";
import CustomButton from "../theme/customButton";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [Errors, setErrors] = useState({
    email: "",
  });

  const [ForgotPasswordApi, { response, loading, error }] = useFetch(
    "auth/forget-password/",
    {
      method: "post",
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      handleLink(values);
    },
  });
  const handleLink = async (values: any) => {
    const res = await ForgotPasswordApi(values);
    if (res.status) {
      toast.success(res.message);
      router.push("/auth/login");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div>
      <p className="font-[900] leading-[47px] text-[40px] uppercase text-[#494F53] max-[500px]:text-[33px] max-[500px]:leading-[37px] ">
        {" "}
        Forgot password
      </p>
      <p className="font-[300] leading-[18.8px] text-[16px] text-[#494F53] my-[10px] ">
        {" "}
        Please fill the email below. We will send you a link to reset your
        password.
      </p>
      <div className="my-5 mt-10">
        <InputField
          formik={formik}
          placeholder="Email"
          type="email"
          name="email"
          noRadius
        />
      </div>

      <div className="flex gap-3 items-center my-8">
        <CustomButton
          onClick={() => formik.handleSubmit()}
          disabled={loading}
          loading={loading}
          noRadius
        >
          Get Link
        </CustomButton>
        <p
          className="font-[700] leading-[23.5px] text-[20px] text-[#FF782C] max-[500px]:text-[15px] cursor-pointer"
          onClick={() => router.back()}
        >
          Go Back
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
