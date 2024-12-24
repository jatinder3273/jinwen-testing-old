"use client";
import CustomButton from "@/components/theme/customButton";
import InputField from "@/components/theme/input";
import NextImage from "@/components/theme/nextImage";
import useFetch from "@/hooks/useFetch";
import { ChangePasswordSchema } from "@/validationSchema";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import * as yup from "yup";

interface IProps {}

const ChangePassword: React.FC<IProps> = () => {
  const router = useRouter();
  const [changePasswordApi, { response, loading, error }] = useFetch(
    "auth/update-password/",
    {
      method: "put",
    }
  );

  const validationSchema = ChangePasswordSchema;

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changePasswordApi(values);
    },
  });

  useEffect(() => {
    if (response) {
      toast.success(response.message);
      router.push("/admin/dashboard");
    }
    if (error) {
      toast.error(error.message);
    }
  }, [response, error]);

  return (
    <div className="ring-1 ring-borderColor bg-white rounded-[10px] min-h-[50vh]">
      <div className="flex justify-between items-center  px-6 py-6 border-b-[1px] border-b-borderColor">
        <h5 className="text-xl font-medium">Change Password</h5>
      </div>
      <div className="px-8 py-5 flex flex-wrap -mx-4 gap-y-6">
        <div className="flex gap-5 flex-col basis-[100%] xl:basis-[50%] px-4">
          <p className="font-light text-textBlack">
            Here you can change your password below.
          </p>
          <InputField
            formik={formik}
            type="password"
            name="old_password"
            placeholder="Old Password"
          />

          <InputField
            formik={formik}
            type="password"
            name="new_password"
            placeholder="New Password"
          />

          <InputField
            formik={formik}
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
          />
          <CustomButton
            loading={loading}
            className="self-start"
            onClick={() => formik.handleSubmit()}
          >
            Change
          </CustomButton>
        </div>
        <div className="px-4 basis-[100%] xl:basis-[50%]">
          <div className="p-3 ring-1 ring-borderColor bg-adminBg rounded-[10px] h-full flex items-center justify-center">
            <NextImage
              src="/assets_admin/images/password.png"
              alt="password"
              width={300}
              height={225}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
