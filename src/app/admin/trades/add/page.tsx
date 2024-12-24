import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import dynamic from "next/dynamic";
import AppWrapper from "@/components/layouts/appWrapper";

const AddEditTradePage = dynamic(
    () => import("@/admin_components/pages/trades/addEditTrade")
  );

const Page = () => {
    return (
      <DashboardLayout backBtn>
        <AddEditTradePage />
      </DashboardLayout>
    );
};
  
export default Page;