

'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/investorOnboarding/Navbar";
import About from "@/components/investorOnboarding/emailDetail/About";
import OfferingDocs from "@/components/investorOnboarding/emailDetail/OfferingDocs";
import SignUpModal from "@/components/investorOnboarding/modals/SignUpModal";
import TwoFacAuthPopUpModal from "@/components/investorOnboarding/modals/TwoFacAuthPopUpModal";
import Confirm2FAModal from "@/components/investorOnboarding/modals/Confirm2FAModal";
import ByPhoneNoModal from "@/components/investorOnboarding/modals/ByPhoneNoModal";
import VerifyLoginModal from "@/components/investorOnboarding/modals/VerifyLoginModal";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import { TwoFacAuthOptionModal } from "@/components/investorOnboarding/modals/TwoFacAuthOptionModal";
import useAuthService from "@/utils/authService";

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [steps, setSteps] = useState(1);
    const [authMode, setAuthMode] = useState<string>(""); // State for TwoFacAuthOptionModal
    const [email, setEmail] = useState<string>(""); // State for Confirm2FAModal
    const {clearToken} = useAuthService();
    /** State to store the loading status of verification */
    const [isVerifying, setIsVerifying] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState<number | null>(null);

    const searchParams = usePathname();
    const token = searchParams.split("/");
    const paramsToken = token[token.length - 1];
    const [verifyInviteLinkApi, { response, loading, error }] = useFetch(
        `auth/verify-invite-link/${paramsToken}`,
        {
            method: "GET",
        }
    );

    useEffect(() => {
        const verifyLink = async () => {
            clearToken();

            try {
                const res = await verifyInviteLinkApi();
                if (res?.status === 1) {
                    setTimeout(() => setVerificationStatus(1), 3000);
                } else {
                    setVerificationStatus(0);
                    toast.error(res?.message);
                    setTimeout(() => window.close(), 3000);
                }
            } catch (e) {
                toast.error("An error occurred while verifying the link.");
                setVerificationStatus(0);
                setTimeout(() => window.close(), 3000);
            } finally {
                setIsVerifying(false);
            }
        };
        const timeoutId = setTimeout(() => verifyLink(), 5000);
        return () => clearTimeout(timeoutId);
    }, []);

    if (isVerifying) {
        return (
            <div className="flex items-center justify-center h-screen">
                <PulseLoader color="#ff782c" />
            </div>
        );
    }

    if (verificationStatus === 0) {
        return null;
    }

    return (
        <div className="bg-[#f4f4f4] overflow-hidden h-[100vh]">
            <div className="border border-[#D2D7DC] rounded-md">
                <Navbar isBgExist={true} />
                <div className="flex">
                    <About />
                    <OfferingDocs />
                </div>
            </div>
            {steps === 1 && (
                <SignUpModal
                    show={isModalOpen}
                    handleClose={() => setIsModalOpen(false)}
                    setSteps={setSteps}
                />
            )}
            {steps === 2 && (
                <TwoFacAuthPopUpModal handleClose={() => { }} show setSteps={setSteps} />
            )}
            {steps === 3 && (
                <TwoFacAuthOptionModal
                    handleClose={() => {}}
                    show
                    setSteps={setSteps}
                    authMode={authMode}
                    setAuthMode={setAuthMode}
                />
            )}
            {steps === 4 && (
                <Confirm2FAModal
                    handleClose={() => {}}
                    show
                    setSteps={setSteps}
                    steps={steps}
                   
                />
            )}
            {steps === 5 && (
                <ByPhoneNoModal handleClose={() => { }} show setSteps={setSteps} steps={steps} />
            )}
            {steps === 6 && (
                <VerifyLoginModal show setSteps={setSteps} />
            )}
        </div>
    );
};

export default Page;
