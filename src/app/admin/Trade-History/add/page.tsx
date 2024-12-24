import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import dynamic from "next/dynamic";
import AppWrapper from "@/components/layouts/appWrapper";

const AddEditTradeHistoryPage = dynamic(
    () => import("@/admin_components/pages/Trade-History/addEditTradeHistory")
  );

const Page = () => {
    return (
      <DashboardLayout backBtn>
        <AddEditTradeHistoryPage />
      </DashboardLayout>
    );
};
  
export default Page;