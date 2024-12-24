"use client";

import ConfirmationModal from "@/admin_components/common/confirmationModal";
import CustomButton from "@/components/theme/customButton";
import DropdownMenu from "@/admin_components/common/dropdownMenu";
import Pagination from "@/admin_components/common/pagination";
import SearchBar from "@/admin_components/common/searchBar";
import {
  ActiveIcon,
  AddIcon,
  CloudArrowDownIcon,
  DeleteIcon,
  EditIcon,
  EyeViewIcon,
  InactiveIcon,
  RecentActivityIcon,
  RestoreIcon,
} from "@/admin_components/icons";
import * as yup from "yup";
import ClickAwayListener from "@/admin_components/utils/ClickAwayListener";
import { convertToExcel } from "@/admin_components/utils/functions";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PuffLoader, PulseLoader } from "react-spinners";
import { toast } from "sonner";
import InputField from "@/components/theme/input";
import { useFormik } from "formik";

interface IProps {
  showAddBtn?: boolean;
  list_type: "approved" | "pending" | "archive";
}

const Investor = ({ showAddBtn, list_type }: IProps) => {
  const itemsOnPage = 10;
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [investorList, setInvestorList] = useState(null);
  // const [excelData, setExcelData] = useState([]);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [approveRequestId, setApproveRequestId] = useState(null);
  const [rejectRequestId, setRejectRequestId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeadings = ["Type", "Name", "Email", "Phone", "Status", "Actions"];

  const formik = useFormik({
    initialValues: {
      reject_reason: "",
    },
    validationSchema: yup.object().shape({
      reject_reason: yup
        .string()
        .trim()
        .required("Reason is required")
        .max(225, "Max 225 characters allowed"),
    }),
    onSubmit: (values) => {
      handleSubmitReject();
    },
  });

  const [activeInactiveModal, setActiveInactiveModal] = useState({
    active: null,
    id: null,
  });

  const [isOpenActionMenu, setIsOpenActionMenu] = useState({
    show: false,
    index: null,
  });

  const [getInvestorsList, { response, loading, errorMessage }] = useFetch(
    "/admin/investor-list/",
    {
      method: "POST",
    }
  );
  const [approveRejectPending, { loading: approveRejectLoading }] = useFetch(
    "/admin/approve-reject-investor/",
    {
      method: "PUT",
    }
  );
  const [restoreInvestor, { }] = useFetch("admin/restore-investor/", {
    method: "PUT",
  });
  const [getExcelListCall, { loading: excelDataLoading }] = useFetch(
    "/admin/investor-list/",
    {
      method: "POST",
    }
  );
  const [deleteSingleInvestor, { loading: deleteLoading }] = useFetch(
    `/admin/delete-investor/${deleteModalId}/`,
    {
      method: "DELETE",
    }
  );
  const [activeInactiveInvestor, { loading: activeInactiveLoading }] = useFetch(
    `/admin/active-inactive-investor/${activeInactiveModal?.id}/`,
    {
      method: "PUT",
    }
  );
  const totalPages = Math.ceil(totalRecords / itemsOnPage);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleActionToggle = (index?: number) => {
    setIsOpenActionMenu((prev) => ({
      show: !prev.show,
      index: index ?? null,
    }));
  };
  const handleActionClose = () => {
    setIsOpenActionMenu({
      show: false,
      index: null,
    });
  };

  const handleDeleteInvestor = async () => {
    const res = await deleteSingleInvestor();
    if (res.status) {
      const newList = investorList?.filter((item) => item.id !== deleteModalId);
      setInvestorList(newList);
      setDeleteModalId(null);
      setTotalRecords((prev) => prev - 1);
      handleActionClose();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  const handleActiveInactive = async () => {
    const res = await activeInactiveInvestor();
    if (res.status) {
      const newList = [...investorList];
      const foundIndex = investorList?.findIndex(
        (item) => item.id === activeInactiveModal.id
      );
      if (foundIndex >= 0) {
        newList[foundIndex].status = newList[foundIndex].status === 1 ? 2 : 1;
        setInvestorList(newList);
      }
      setActiveInactiveModal({ active: null, id: null });
      handleActionClose();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  const handleGetInvestor = async (pageNumber?: number) => {
    const res = await getInvestorsList({
      start: ((pageNumber ?? currentPage) - 1) * itemsOnPage,
      length: itemsOnPage,
      type: list_type,
      search: {
        value: searchValue,
      },
    });
    if (res.status) {
      setInvestorList(res?.data ?? []);
      setTotalRecords(res?.recordsTotal);
    } else {
      toast.error(res?.message);
    }
  };

  const handleExportExcelData = async () => {
    const res = await getExcelListCall({
      start: 0,
      length: 0,
      search: {
        value: "",
      },
    });
    if (res.status) {
      const headings = [...tableHeadings];
      headings.pop();
      const csvData = res?.data?.map((item) => [
        item?.investor_type?.name,
        item?.first_name + " " + item?.last_name,
        item?.email,
        `${item?.country_code ? `(${item.country_code}) ` : ""}${item?.phone_no
        }`,
        item?.status === 1 ? "Active" : "Inactive",
      ]);
      const tableData = [headings, ...csvData];
      convertToExcel(tableData);
    } else {
      toast.error(res?.message);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    handleActionClose();
    setCurrentPage(pageNumber);
    // handleGetInvestor(pageNumber);
  };

  const handleApproveReject = async (status: number) => {
    const id = status === 1 ? approveRequestId : rejectRequestId;
    const payload =
      status === 1
        ? { status: Number(status) }
        : {
          status: Number(status),
          reject_reason: formik.values.reject_reason,
        };
    const res = await approveRejectPending(payload, {
      endUrl: `${status === 1 ? approveRequestId : rejectRequestId}/`,
    });
    if (res?.status) {
      if (status === 1) {
        const newList = investorList?.filter((item) => item?.id !== id);
        setInvestorList(newList);
        setTotalRecords((prev) => prev - 1);
        setApproveRequestId(null);
      } else if (status === 4) {
        const newList = [...investorList];
        const itemIndex = newList?.findIndex((item) => item?.id === id);
        setRejectRequestId(null);
        if (itemIndex >= 0) {
          newList[itemIndex] = { ...newList[itemIndex], status: 4 };
          setInvestorList(newList);
        }
      }
      handleActionClose();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  const handleSubmitReject = () => {
    handleApproveReject(4);
  };

  const handleRestore = async (id: string | number) => {
    const res = await restoreInvestor(
      {},
      {
        endUrl: `${id}/`,
      }
    );
    if (res?.status) {
      const newList = investorList?.filter((item) => item?.id !== id);
      setInvestorList(newList);
      setTotalRecords((prev) => prev - 1);
      handleActionClose();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    if (searchValue) {
      const timeoutId = setTimeout(() => {
        handleGetInvestor(1);
      }, 600);
      return () => clearTimeout(timeoutId);
    } else {
      handleGetInvestor();
    }
  }, [searchValue, currentPage]);

  useEffect(() => { }, []);

  const actionOptions = (item) => {
    const viewOption = {
      text: "View",
      icon: <EyeViewIcon />,
      onClick: () => router.push(`/admin/investors/view/${item?.id}`),
    };
    const restoreOption = {
      text: "Restore",
      icon: <RestoreIcon />,
      onClick: () => handleRestore(item?.id),
    };
    const archiveOption = {
      text: "Archive",
      icon: <DeleteIcon />,
      onClick: () => setDeleteModalId(item?.id),
    };
    const recentActivityOption = {
      text: "Recent Activity",
      icon: <RecentActivityIcon />,
      onClick: () =>
        router.push(`/admin/investors/${item?.id}/recent-activity`),
    };
    const editOption = {
      text: "Edit",
      icon: <EditIcon />,
      onClick: () => router.push(`/admin/investors/${item?.id}`),
    };
    const pendingOptions =
      item?.status === 3
        ? [
          {
            text: "Reject",
            icon: <InactiveIcon />,
            onClick: () => setRejectRequestId(item?.id),
          },
          {
            text: "Approve",
            icon: <ActiveIcon />,
            onClick: () => setApproveRequestId(item?.id),
          },
        ]
        : [];
    const approveOptions = [
      {
        text: item?.status === 1 ? "Inactive" : "Active",
        icon: item?.status === 1 ? <InactiveIcon /> : <ActiveIcon />,
        onClick: () =>
          setActiveInactiveModal({
            active: item?.status === 1,
            id: item?.id,
          }),
      },
    ];
    if (list_type === "approved") {
      return [
        viewOption,
        ...approveOptions,
        editOption,
        archiveOption,
        recentActivityOption,
      ];
    } else if (list_type === "pending") {
      return [
        viewOption,
        ...pendingOptions,
        editOption,
        archiveOption,
        recentActivityOption,
      ];
    } else if (list_type === "archive") {
      return [viewOption, restoreOption];
    } else {
      return [];
    }
  };

  return (
    <div className="ring-1 ring-borderColor bg-white p-4 md:p-7 pb-[10px] md:pb-[10px] rounded-[10px] min-h-[50vh]">
      <div className="flex flex-wrap-reverse justify-between items-center mb-8 gap-5">
        <div className="basis-[100%] md:basis-[33.33%]">
          <SearchBar
            value={searchValue}
            onChange={handleSearchInput}
            placeholder="Search by name or email"
          />
        </div>
        {showAddBtn ? (
          // <div className="flex gap-[10px]">
          //   <CustomButton
          //     className=""
          //     variantType="outlined"
          //     leftIcon={<AddIcon />}
          //     onClick={() => router.push("/admin/investors/add")}
          //   >
          //     Add Investor
          //   </CustomButton>
          <div className="flex gap-[10px]">
            <CustomButton
              className=""
              variantType="outlined"
              leftIcon={<AddIcon />}
              onClick={() => router.push("/admin/investors/invite")}
            >
              Invite Investor
            </CustomButton>

            <CustomButton
              variantType="filled"
              rightIcon={<CloudArrowDownIcon />}
              onClick={handleExportExcelData}
              loading={excelDataLoading}
            >
              Export
            </CustomButton>
          </div>
        ) : null}
      </div>

      <div
        className="theme-table investorPage"
      // style={{
      //   overflow: investorList?.length > 4 ? "auto" : "visible",
      // }}
      >
        <table>
          <thead className="sticky top-0 z-20">
            <tr>
              {tableHeadings.map((item) => (
                <th key={item} scope="col" className="bg-white">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={100}>
                  <div className="w-full min-h-[300px] flex items-center justify-center">
                    <PulseLoader color="#ff782c" />
                  </div>
                </td>
              </tr>
            )}
            {!loading && !errorMessage ? (
              investorList?.length ? (
                <>
                  {investorList?.map((item, index) => {
                    const isActive = item?.status === 1 || item?.status === 3;
                    return (
                      <tr key={index}>
                        <td>{item?.investor_type?.name}</td>
                        <td>{item?.first_name + " " + item?.last_name}</td>
                        <td>{item?.email}</td>
                        <td>
                          {item?.country_code ? `(${item?.country_code})` : ""}{" "}
                          {item?.phone_no}
                        </td>
                        <td>
                          <span
                            className={
                              list_type === "archive"
                                ? ""
                                : isActive
                                  ? "text-primary"
                                  : "text-secondary"
                            }
                          >
                            <span className="text-[16px]">~ </span>
                            {list_type === "approved"
                              ? item?.status === 1
                                ? "Active"
                                : "Inactive"
                              : list_type === "pending"
                                ? item?.status === 3
                                  ? "Pending"
                                  : "Rejected"
                                : "Archived"}
                          </span>
                        </td>
                        <td className="relative">
                          <ClickAwayListener onClickAway={handleActionClose}>
                            <button
                              type="button"
                              onClick={() => handleActionToggle(index)}
                            >
                              <BsThreeDotsVertical size={18} />
                            </button>
                            {isOpenActionMenu?.show &&
                              index === isOpenActionMenu.index ? (
                              <DropdownMenu
                                className={`right-[60%] min-w-[140px] ${index < 2
                                  ? "top-[-40px]"
                                  : investorList.length - 3 > index
                                    ? "top-[50%] translate-y-[-50%]"
                                    : "top-auto bottom-[10%]"
                                  }`}
                                options={actionOptions(item)}
                              />
                            ) : null}
                          </ClickAwayListener>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : investorList ? (
                <tr>
                  <td colSpan={100}>
                    <div className="w-full min-h-[300px] flex items-center justify-center text-lg text-textBlack">
                      No data found
                    </div>
                  </td>
                </tr>
              ) : null
            ) : null}
            {!loading && errorMessage ? (
              <tr>
                <td colSpan={100}>
                  <div className="w-full min-h-[300px] flex items-center justify-center text-lg text-textBlack">
                    {errorMessage}
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="pt-[10px]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <ConfirmationModal
        isOpen={deleteModalId}
        image="/assets_admin/images/delete.png"
        title="ARCHIVE"
        description="Are you sure you want to Archive this investor?"
        handleClose={() => setDeleteModalId(null)}
        confirmBtn={
          <CustomButton loading={deleteLoading} onClick={handleDeleteInvestor}>
            Yes, Archive
          </CustomButton>
        }
      />
      <ConfirmationModal
        isOpen={approveRequestId}
        image="/assets_admin/images/activate.png"
        title="APPROVE REQUEST"
        description="Are you sure you want to approve this investor?"
        handleClose={() => setApproveRequestId(null)}
        confirmBtn={
          <CustomButton
            loading={approveRejectLoading}
            onClick={() => handleApproveReject(1)}
          >
            Approve
          </CustomButton>
        }
      />
      <ConfirmationModal
        isOpen={rejectRequestId}
        image="/assets_admin/images/activate.png"
        title="REJECT REQUEST"
        description="Are you sure you want to approve this investor?"
        handleClose={() => setRejectRequestId(null)}
        confirmBtn={
          <CustomButton
            loading={approveRejectLoading}
            onClick={() => formik.handleSubmit()}
          >
            Reject
          </CustomButton>
        }
      >
        <InputField
          formik={formik}
          name="reject_reason"
          placeholder="Reason of rejection"
        />
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={activeInactiveModal?.id && !activeInactiveModal?.active}
        image="/assets_admin/images/activate.png"
        title="ACTIVATE"
        description="Are you sure you want to activate this investor?"
        handleClose={() => setActiveInactiveModal({ active: false, id: null })}
        confirmBtn={
          <CustomButton
            loading={activeInactiveLoading}
            onClick={handleActiveInactive}
          >
            Activate
          </CustomButton>
        }
      />
      <ConfirmationModal
        isOpen={activeInactiveModal?.id && activeInactiveModal?.active}
        image="/assets_admin/images/deactivate.png"
        title="DEACTIVATE"
        description="Are you sure you want to deactivate this investor?"
        handleClose={() => setActiveInactiveModal({ active: false, id: null })}
        confirmBtn={
          <CustomButton
            loading={activeInactiveLoading}
            onClick={handleActiveInactive}
          >
            Deactivate
          </CustomButton>
        }
      />
    </div>
  );
};

export default Investor;
