import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import ChangePassword from "@/admin_components/pages/changePassword";
import AppWrapper from "@/components/layouts/appWrapper";
import React from "react";

const Page = () => {
  return (
    <DashboardLayout backBtn>
      <ChangePassword />
    </DashboardLayout>
  );
};

export default Page;
