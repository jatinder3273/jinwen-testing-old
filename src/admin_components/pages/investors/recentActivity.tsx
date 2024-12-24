"use client";
import Pagination from "@/admin_components/common/pagination";
import SearchBar from "@/admin_components/common/searchBar";
import useFetch from "@/hooks/useFetch";
import moment from "moment";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";

const RecentActivity = () => {
  const itemsOnPage = 10;
  const params = useParams();
  const { id: urlId } = params;
  const [activityList, setActivityList] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [getActivityList, { response, loading, errorMessage }] = useFetch(
    `/admin/investor-activity-list/${urlId}/`,
    {
      method: "POST",
    }
  );
  const totalPages = Math.ceil(response?.recordsTotal / itemsOnPage);

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleGetList = async (pageNumber?: number) => {
    const res = await getActivityList({
      start: ((pageNumber ?? currentPage) - 1) * itemsOnPage,
      length: itemsOnPage,
      search: {
        value: searchValue,
      },
    });
    if (res.status) {
      setActivityList(res?.data ?? []);
    } else {
      toast.error(res?.message);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // handleGetList(pageNumber);
  };

  useEffect(() => {
    if (searchValue) {
      const timeoutId = setTimeout(() => {
        handleGetList(1);
      }, 600);
      return () => clearTimeout(timeoutId);
    } else {
      console.log("hi");

      handleGetList();
    }
  }, [searchValue, currentPage]);

  const tableHeadings = ["Event By", "Action", "Date", "Time"];

  return (
    <div className="ring-1 ring-borderColor bg-white p-4 md:p-7 pb-[10px] md:pb-[10px] rounded-[10px] min-h-[50vh]">
      <div className="flex flex-wrap justify-between items-center mb-3">
        <h4 className="text-xl">Recent Activities</h4>
        <SearchBar
          value={searchValue}
          onChange={handleSearchInput}
          placeholder="Search by action"
        />
      </div>
      <div className="theme-table">
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
              activityList?.length ? (
                <>
                  {activityList?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.event_by}</td>
                      <td>{item?.action}</td>
                      <td>{moment(item?.created_at).format("DD/MM/YYYY")}</td>
                      <td>{moment(item?.created_at).format("hh:mm:ss A")}</td>
                    </tr>
                  ))}
                </>
              ) : activityList ? (
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
    </div>
  );
};

export default RecentActivity;
