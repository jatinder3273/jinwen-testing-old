import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import Portfolio from "@/admin_components/pages/portfolio";
import React from "react";

const Page = () => {
  return (
    <DashboardLayout title="Portfolio">
      <Portfolio showAddBtn />
    </DashboardLayout>
  );
};

export default Page;
