import AppWrapper from "@/components/layouts/appWrapper";
import AuthLayout from "@/components/layouts/authLayout";
import SignUp from "@/components/pages/signup";
import React from "react";

const Page = () => {
  return (
    <AuthLayout maxWidth="800">
      <SignUp />
    </AuthLayout>
  );
};

export default Page;
