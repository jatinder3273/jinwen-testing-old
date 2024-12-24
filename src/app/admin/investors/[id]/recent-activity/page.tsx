import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import RecentActivity from "@/admin_components/pages/investors/recentActivity";
import AppWrapper from "@/components/layouts/appWrapper";
const Page = () => {
  return (
    <DashboardLayout backBtn>
      <RecentActivity />
    </DashboardLayout>
  );
};

export default Page;
