import AppWrapper from "@/components/layouts/appWrapper";
import AuthLayout from "@/components/layouts/authLayout";
import ForgotPassword from "@/components/pages/forgotPassword";
import React from "react";

const Page = () => {
  return (
    <AuthLayout>
      <ForgotPassword />
    </AuthLayout>
  );
};
export default Page;
