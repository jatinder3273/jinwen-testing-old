"use client";
import React, { useState } from "react";
import CustomButton from "../theme/customButton";
import { LoginIcon } from "@/app/investorOnboarding/icons";
import Image from "next/image";
import { size } from "lodash";
import { LogoutIcon } from "@/admin_components/icons";
import ConfirmationModal from "@/admin_components/common/confirmationModal";
import useAuthService from "@/utils/authService";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ isBgExist }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const pathname = usePathname();
  const route = useRouter();
  const { clearToken, getToken, getUserRoleId } = useAuthService();
  const token = getToken();


  const handleLogout = () => {
    clearToken();
    route.replace("/auth/login");
    setLogoutModal(false);
  };

  return (
    <>
      <div
        className={`relative flex items-center justify-between ${
          isBgExist ? "bg-[#ffffff]" : ""
        } p-6 px-10`}
      >
        <Image
          src="/assets/image/fintecLogo.png"
          alt=""
          width={110}
          height={44}
          className="w-[110px] h-[44px]"
        />
        {pathname.includes("/investorOnboarding/") ? (
          <CustomButton
          variantColor="black"
          variantType="outlined"
          onClick={() => route.push("/auth/login")}
          style={{
            border: "1px solid #D2D7DC",
            fontSize: "14px",
            backgroundColor: isBgExist ? "" : "#ffffff",
            display: "flex",
            gap: "12px",
          }}
        >
          Login
        </CustomButton>
         
        ) : (
          <CustomButton
          variantColor="black"
          variantType="outlined"
          onClick={() => setLogoutModal(true)}
          style={{
            border: "1px solid #D2D7DC",
            fontSize: "14px",
            backgroundColor: isBgExist ? "" : "#ffffff",
            display: "flex",
            gap: "12px",
          }}
        >
          Log Out <LogoutIcon />
        </CustomButton>
        )}

        <div
          className={`absolute bottom-0 left-12 w-[calc(100%-3rem)] h-[2px] ${
            isBgExist ? "bg-[#D2D7DC]" : ""
          } `}
        ></div>

        <ConfirmationModal
          isOpen={logoutModal}
          image="/assets_admin/images/logout.png"
          title="LOG OUT"
          description="Are you sure you want to log out this account?"
          handleClose={() => setLogoutModal(false)}
          confirmBtn={
            <CustomButton onClick={() => handleLogout()}>Log Out</CustomButton>
          }
        />
      </div>
    </>
  );
};

export default Navbar;
