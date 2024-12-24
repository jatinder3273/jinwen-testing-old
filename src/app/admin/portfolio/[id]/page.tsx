import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import PortfolioAddEditForm from "@/admin_components/pages/portfolio/portfolioAddEditForm";
import React from "react";

const EditPortfolio = () => {
  return (
    <DashboardLayout backBtn>
      <PortfolioAddEditForm />
    </DashboardLayout>
  );
};

export default EditPortfolio;
