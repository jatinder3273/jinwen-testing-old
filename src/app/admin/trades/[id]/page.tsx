import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import dynamic from "next/dynamic";
const AddEditTrade = dynamic(
  () => import("@/admin_components/pages/trades/addEditTrade")
);
const Page = () => {
  return (
    <DashboardLayout backBtn>
      <AddEditTrade />
    </DashboardLayout>
  );
};

export default Page;
