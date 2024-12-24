import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import Investor from "@/admin_components/pages/investors";
import AppWrapper from "@/components/layouts/appWrapper";

const Page = () => {
  return (
    <DashboardLayout title="Archive Investors">
      <Investor list_type="archive" />
    </DashboardLayout>
  );
};

export default Page;
