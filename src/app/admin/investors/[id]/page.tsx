import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import dynamic from "next/dynamic";
import AppWrapper from "@/components/layouts/appWrapper";
const AddEditInvestor = dynamic(
  () => import("@/admin_components/pages/investors/addEditInvestor")
);

const Page = () => {
  return (
    <DashboardLayout backBtn>
      <AddEditInvestor />
    </DashboardLayout>
  );
};

export default Page;
