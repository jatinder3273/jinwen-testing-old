import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import EditProfile from "@/admin_components/pages/investors/editProfile";
import AppWrapper from "@/components/layouts/appWrapper";

const Page = () => {
  return (
    <DashboardLayout backBtn>
      {/* <MyProfile /> */}
      <EditProfile />
    </DashboardLayout>
  );
};

export default Page;
