import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import ViewInvestor from "@/admin_components/pages/investors/viewInvestor";
import AppWrapper from "@/components/layouts/appWrapper";
import dynamic from "next/dynamic";

const Page = () => {
  return (
    <DashboardLayout backBtn>
      <ViewInvestor />
    </DashboardLayout>
  );
};

export default Page;
