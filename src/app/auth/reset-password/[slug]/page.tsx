import AppWrapper from "@/components/layouts/appWrapper";
import AuthLayout from "@/components/layouts/authLayout";
import ResetPassword from "@/components/pages/resetPassword";
import React from "react";

const Page = () => {
  return (
    <AuthLayout>
      <ResetPassword />
    </AuthLayout>
  );
};

export default Page;
