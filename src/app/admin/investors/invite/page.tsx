import DashboardLayout from "@/admin_components/layouts/dashboardLayout";
import dynamic from "next/dynamic";
import AppWrapper from "@/components/layouts/appWrapper";
import InviteInvestor from "@/admin_components/pages/investors/inviteInvestor";

const Page = () => {
    return (
        <DashboardLayout backBtn>
            <InviteInvestor />
        </DashboardLayout>
    );
};

export default Page;
