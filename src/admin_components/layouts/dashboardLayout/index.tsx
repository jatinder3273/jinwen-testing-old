"use client";

import ConfirmationModal from "@/admin_components/common/confirmationModal";
import {
  ArrowBottomIcon,
  ArrowLeftIcon,
  LogoutIcon,
  PasswordLockIcon,
  UserIcon,
} from "@/admin_components/icons";
import AdminSidebar from "@/admin_components/sections/sidebar";
import ClickAwayListener from "@/admin_components/utils/ClickAwayListener";
import CustomButton from "@/components/theme/customButton";
import useAuthService from "@/utils/authService";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import styles from "./style.module.scss";
import axios from "axios";

interface IProps {
  children: React.ReactNode;
  title?: string;
  backBtn?: boolean;
  noHeader?: boolean;
}

const DashboardLayout: React.FC<IProps> = ({
  children,
  title,
  backBtn,
  noHeader,
}) => {
  const route = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [email, setEmail] = useState(""); 
  const { clearToken, getToken, getUserRoleId } = useAuthService();

const pathname = usePathname();


  const token = getToken();
  const roleId = getUserRoleId();
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const toggleHeaderMenu = () => {
    setIsHeaderMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    clearToken();
    route.replace("/auth/login");
    setLogoutModal(false);
  };

  const sendGenerateReportEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/generate-report/",
        { email }
      );
      if (response.data.status === "success") {
        alert("Email sent successfully!");
      } else {
        console.error("Failed to send email:", response.data);
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error(
        "An error occurred while sending the email:",
        error.response || error.message
      );
      alert("An error occurred while sending the email.");
    }
  };

  useEffect(() => {
    if (window) {
      const checkWindowSize = () => {
        setIsMobile(window.innerWidth <= 767);
      };
      checkWindowSize();
      window.addEventListener("resize", checkWindowSize);
      return () => {
        window.removeEventListener("resize", checkWindowSize);
      };
    }
  }, []);

  return (
    <>
      {token ? (
        <div
          className={`${styles.layout} ${
            isSidebarOpen ? styles.open : ""
          } bg-adminBg`}
        >
          <div
            id="default-sidebar"
            className={`${styles.sidebar} fixed top-0 left-0 z-[999] h-screen min-h-[100vh] transition-width duration-200`}
            aria-label="Sidebar"
          >
            <AdminSidebar
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isMobile ? !isSidebarOpen : isSidebarOpen}
            />
          </div>
          <div
            className={`${styles.layoutBody} min-h-[100vh] pt-14 md:pt-6 px-7 transition-width duration-200`}
          >
            {((isMobile && !isSidebarOpen) || (!isMobile && isSidebarOpen)) && (
              <div
                onClick={toggleSidebar}
                className={`fixed z-[99] bg-[rgba(0,0,0,0.7)] inset-0 h-full w-full block md:hidden`}
              />
            )}
            <button
              className="fixed top-2 left-0 bg-white p-3 rounded-r-[3rem] shadow-lg"
              type="button"
              onClick={toggleSidebar}
            >
              <MdMenu size={24} />
            </button>
            {!noHeader && (
              <div className="flex justify-between items-center mb-5">
                {title ? (
                  <h1 className="text-3xl md:text-[2rem] leading-[1.25]">
                    {title}
                  </h1>
                ) : null}
                {backBtn ? (
                  <button
                    type="button"
                    onClick={() => route.back()}
                    className="text-dbBlack flex items-center gap-2"
                  >
                    <ArrowLeftIcon width={9} height={14} />
                    Back
                  </button>
                ) : null}
                <div className="flex items-center gap-4">
                { !pathname.includes('/investor') && <Fragment>
                  <input
                    type="email"
                    placeholder="Enter your email ->"
                    value={email} // Bind input value to state
                    onChange={(e) => setEmail(e.target.value)} // Update state on input change
                    className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-[4rem] min-h-[42px] md:min-h-[46px] bg-white px-5 py-3 text-sm shadow-sm ring-1 ring-borderColor focus:ring-borderColor"
                  />
                  <button
                    type="button"
                    className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-[4rem] min-h-[42px] md:min-h-[46px] bg-white px-5 py-3 text-sm shadow-sm ring-1 ring-borderColor focus:ring-borderColor hover:bg-gray-50"
                    onClick={sendGenerateReportEmail}
                  >
                    Generate Dashboard Report
                  </button>
                  </Fragment>}
                  
                  <ClickAwayListener
                    onClickAway={() => setIsHeaderMenuOpen(false)}
                  >
                    <div className="relative inline-block text-left text-dbBlack whitespace-nowrap">
                      <button
                        onClick={toggleHeaderMenu}
                        type="button"
                        className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-[4rem] min-h-[42px] md:min-h-[46px] bg-white px-5 py-3 text-sm shadow-sm ring-1 ring-borderColor focus:ring-borderColor hover:bg-gray-50"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        My Account
                        <span className="-mr-1 h-5 w-5">
                          <ArrowBottomIcon />
                        </span>
                      </button>
                      <div
                        className={`absolute right-0 z-10 mt-2 min-w-50 origin-top-right rounded-[12px] bg-white ring-1 ring-borderColor focus:ring-borderColor focus:outline-none transition-all duration-200 shadow-[0_14px_40px_0px_rgba(0,0,0,0.1)] ${
                          !isHeaderMenuOpen ? "opacity-0 invisible" : ""
                        }`}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                      >
                        <div className="text-[14px] py-3 px-2" role="none">
                          {roleId === 2 ? (
                            <Link
                              href="/investor/profile"
                              className="flex items-center gap-2 px-4 py-[10px] rounded-md text-sm hover:bg-adminBg transition-all"
                              role="menuitem"
                              id="menu-item-0"
                            >
                              <UserIcon />
                              <span className="whitespace-nowrap">
                                My Profile
                              </span>
                            </Link>
                          ) : null}
                          <Link
                            href={`${
                              roleId === 1
                                ? "/admin/change-password"
                                : "/investor/change-password"
                            }`}
                            className="flex items-center gap-2 px-4 py-[10px] rounded-md text-sm hover:bg-adminBg transition-all"
                            role="menuitem"
                            id="menu-item-0"
                          >
                            <PasswordLockIcon />
                            <span className="whitespace-nowrap">
                              Change Password
                            </span>
                          </Link>
                          <button
                            onClick={() => setLogoutModal(true)}
                            className="flex items-center w-full gap-2 px-4 py-[10px] rounded-md text-sm hover:bg-adminBg transition-all"
                            role="menuitem"
                            id="menu-item-0"
                          >
                            <LogoutIcon />
                            <span className="whitespace-nowrap">Log Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </ClickAwayListener>
                </div>
              </div>
            )}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </div>
          <ConfirmationModal
            isOpen={logoutModal}
            image="/assets_admin/images/logout.png"
            title="LOG OUT"
            description="Are you sure you want to log out this account?"
            handleClose={() => setLogoutModal(false)}
            confirmBtn={
              <CustomButton onClick={() => handleLogout()}>
                Log Out
              </CustomButton>
            }
          />
        </div>
      ) : null}
    </>
  );
};

export default DashboardLayout;
