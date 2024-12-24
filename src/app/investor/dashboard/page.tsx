import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import AdminDashboard from "@/admin_components/pages/dashboard";
import AppWrapper from "@/components/layouts/appWrapper";
import React from "react";

const Page = () => {
  return (
    <DashboardLayout title="Dashboard">
      <AdminDashboard />
    </DashboardLayout>
  );
};

export default Page;
