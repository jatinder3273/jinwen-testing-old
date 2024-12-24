import AppWrapper from "@/components/layouts/appWrapper";
import AuthLayout from "@/components/layouts/authLayout";
import Login from "@/components/pages/login";
import React from "react";

const Page = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default Page;
