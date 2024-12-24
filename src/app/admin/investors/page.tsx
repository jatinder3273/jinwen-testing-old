import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import Investor from "@/admin_components/pages/investors";
import AppWrapper from "@/components/layouts/appWrapper";

const Page = () => {
  return (
    <DashboardLayout title="Investors">
      <Investor list_type="approved" showAddBtn />
    </DashboardLayout>
  );
};

export default Page;
