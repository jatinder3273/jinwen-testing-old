import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import Investor from "@/admin_components/pages/investors";
import AppWrapper from "@/components/layouts/appWrapper";

const Page = () => {
  return (
    <DashboardLayout title="Pending Investors">
      <Investor list_type="pending" />
    </DashboardLayout>
  );
};

export default Page;
