import AppWrapper from "@/components/layouts/appWrapper";
import AuthLayout from "@/components/layouts/authLayout";
import ResetPassword from "@/components/pages/resetPassword";
import SetPassword from "@/components/pages/setPassword";
import React from "react";

const Page = () => {
  return (
    <AuthLayout>
      <SetPassword />
    </AuthLayout>
  );
};

export default Page;
