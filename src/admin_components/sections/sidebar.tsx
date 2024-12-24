"use client";

import {
  ArrowBottomIcon,
  ArrowLeftIcon,
  DashboardIcon,
  DataRoomIcon,
  FundInfoIcon,
  InvestorIcon,
  PerformanceIcon,
  TransactionIcon,
} from "@/admin_components/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import * as _ from "lodash";
import { useStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import useAuthService from "@/utils/authService";

interface IProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}
interface sidebarSubMenuProps {
  name: string;
  link: string;
  isActive: boolean;
}

interface sidebarMenuProps {
  name: string;
  icon: JSX.Element;
  link?: string;
  isOpen?: boolean;
  sub_items?: sidebarSubMenuProps[];
}

const AdminSidebar = ({ toggleSidebar, isSidebarOpen }: IProps) => {
  const router = useRouter();
  const { getUserRoleId } = useAuthService();
  const roleId = getUserRoleId();
  const adminList = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/admin/dashboard",
      sub_items: undefined,
    },
    {
      name: "Investors",
      icon: <InvestorIcon />,
      isOpen: false,
      link: undefined,
      sub_items: [
        {
          name: "Approved Investors",
          link: "/admin/investors",
          isActive: false,
        },
        {
          name: "Pending Investors",
          link: "/admin/investors/pending",
          isActive: false,
        },
        {
          name: "Archive Investors",
          link: "/admin/investors/archived",
          isActive: false,
        },
      ],
    },
    {
      name: "Portfolio",
      link: "/admin/portfolio",
      sub_items: undefined,
    },
    {
      name: "Trades",
      link: "/admin/trades",
      sub_items: undefined,
    },
    {
      name: "Trade History",
      link: "/admin/Trade-History",
      sub_items: undefined,
    }
  ];
  const investorList = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/investor/dashboard",
      sub_items: undefined,
    },
  ];

  const OnboardingList = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/investor/dashboard",
      sub_items: undefined,
    },
    {
      name: "Performance",
      icon: <PerformanceIcon />,
      link: "",
      sub_items: undefined,
    },
    {
      name: "Transactions",
      icon: <TransactionIcon />,
      link: "",
      sub_items: undefined,
    },
    {
      name: "Data Room",
      icon: <DataRoomIcon />,
      link: "",
      sub_items: undefined,
    },
    {
      name: "Fund Information",
      icon: <FundInfoIcon />,
      link: "",
      sub_items: undefined,
    },
  ];

  const initialList = roleId === 1 ? adminList : OnboardingList;

  const [sidebarList, setSidebarList] = useState([]);
  const pathname = usePathname();

  const handleSidebarItemClick = (item: sidebarMenuProps) => {
    if (item?.link) {
      router.push(item?.link);
    } else {
      const newArray = [...sidebarList];
      const index = _.findIndex(newArray, { name: item.name });
      if (index !== -1) {
        newArray[index].isOpen = !newArray[index].isOpen;
      }
      setSidebarList(newArray);
      console.log("newArray", newArray);
    }
  };

  useLayoutEffect(() => {
    const newSidebarList = initialList.map((item) => {
      if (item.sub_items?.some((subItem) => pathname.includes(subItem.link))) {
        return {
          ...item,
          isOpen: true,
          sub_items: item.sub_items.map((subItem) => ({
            ...subItem,
            isActive: subItem.link === pathname,
          })),
        };
      }
      return item;
    });
    setSidebarList(newSidebarList);
  }, [roleId]);

  return (
    <div
      className={`${isSidebarOpen ? "py-6 px-7" : ""
        } relative h-full overflow-y-auto bg-dbBlack overflow-hidden`}
    >
      <button
        className="flex items-center justify-center absolute top-7 right-0 cursor-pointer w-8 h-8 rounded-l-[3rem] bg-primary text-white"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <ArrowLeftIcon /> : <MdMenu size={20} />}
      </button>
      <div
        className={`${isSidebarOpen
          ? "transition-all duration-[0.7s] delay-[0.1s]"
          : "opacity-0 invisible"
          }`}
      >
        <div className="mb-7">
          <Image
            src="/assets/image/logoWhite.svg"
            alt="logo"
            width={144}
            height={42}
          />
        </div>
        <ul className="space-y-2 font-medium">
          {sidebarList.map((item) => {
            const isActive = pathname.includes(item.link);
            const isOpened = item?.isOpen;
            return (
              <li key={item.name} className="text-white">
                <span
                  onClick={() => handleSidebarItemClick(item)}
                  className={`flex items-center px-4 py-3 font-normal rounded-[1.5rem] group h-12 transition cursor-pointer relative border-r-[2px] border-[transparent] ${isActive ||
                    isOpened ||
                    item?.sub_items?.some((item) => item.link === pathname)
                    ? "bg-[#2e3236] border-r-primary"
                    : ""
                    } ${isActive ? "text-primary" : "pe-11  "}`}
                >
                  <div className="shrink-0 whitespace-nowrap">{item.icon}</div>
                  <span className="ms-4 grow">{item.name}</span>
                  {item.sub_items ? (
                    <span
                      className={`absolute right-5 transition ${item.isOpen ? "rotate-[-180deg]" : "rotate-0"
                        }`}
                    >
                      <ArrowBottomIcon height={20} />
                    </span>
                  ) : null}
                </span>
                {item?.sub_items && item?.isOpen ? (
                  <div className="mt-2 flex flex-col gap-[10px] text-white">
                    {item?.sub_items.map((subItem, j) => (
                      <Link
                        href={subItem.link}
                        key={j}
                        className={`${subItem?.isActive ? "text-primary" : ""
                          } block ps-12 pe-2 py-3 font-400`}
                      >
                        {subItem?.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
