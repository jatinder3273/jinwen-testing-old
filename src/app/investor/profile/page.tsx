import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import MyProfile from "@/admin_components/pages/investors/profile";
import ViewInvestor from "@/admin_components/pages/investors/viewInvestor";
import AppWrapper from "@/components/layouts/appWrapper";

const Page = () => {
  return (
    <DashboardLayout backBtn>
      <MyProfile />
    </DashboardLayout>
  );
};

export default Page;
