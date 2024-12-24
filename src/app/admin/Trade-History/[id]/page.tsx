import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import dynamic from "next/dynamic";

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