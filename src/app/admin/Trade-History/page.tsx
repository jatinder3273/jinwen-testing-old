import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import TradeHistoryPage from "@/admin_components/pages/Trade-History";

const Page = () => {
  return (
    <DashboardLayout title="Trade History">
      <TradeHistoryPage showAddBtn/>
    </DashboardLayout>
  );
};

export default Page;