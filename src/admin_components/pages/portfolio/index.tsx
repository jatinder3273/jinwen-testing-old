"use client";
import ConfirmationModal from "@/admin_components/common/confirmationModal";
import DropdownMenu from "@/admin_components/common/dropdownMenu";
import Pagination from "@/admin_components/common/pagination";
import SearchBar from "@/admin_components/common/searchBar";
import { AddIcon, DeleteIcon, EditIcon } from "@/admin_components/icons";
import ClickAwayListener from "@/admin_components/utils/ClickAwayListener";
import CustomButton from "@/components/theme/customButton";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
interface IProps {
  showAddBtn?: boolean;
}
interface portfolio {
  id: number;
  account_no: string;
  name: string;
}
const tableHeadings = ["Name", "Account Number", "Actions"];

const Portfolio = ({ showAddBtn }: IProps) => {
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
  const router = useRouter();
  const [isOpenActionMenu, setIsOpenActionMenu] = useState({
    show: false,
    index: null,
  });
  const [searchValue, setSearchValue] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 10; // Number of items per page

  const [portfolioList, setPortfolioList] = useState<portfolio[]>([]);

  const [getPortfolioList, { loading, errorMessage }] = useFetch(
    "/admin/list-portfolio/",
    {
      method: "POST",
    }
  );

  const [deleteSinglePortfolio, { loading: deleteLoading }] = useFetch(
    `/admin/delete-portfolio/${deleteModalId}/`,
    {
      method: "DELETE",
    }
  );

  const handleDeleteTrade = async () => {
    const res = await deleteSinglePortfolio();
    if (res.status) {
      const newList = portfolioList.filter((item) => item.id !== deleteModalId);
      setPortfolioList(newList);
      setDeleteModalId(null);
      setTotalRecords((prev) => prev - 1);
      handleActionClose();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleGetPortfolio = async (pageNumber?: number) => {
    try {
      const res = await getPortfolioList({
        start: ((pageNumber ?? currentPage) - 1) * itemsOnPage,
        length: itemsOnPage,
        search: {
          value: searchValue,
        },
      });
      if (res.status) {
        setPortfolioList(
          res?.data?.filter((trade: portfolio) =>
            trade.name.toLowerCase().includes(searchValue.toLowerCase())
          ) ?? []
        );
        setTotalRecords(res?.recordsTotal);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
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

  const actionOptions = (item: portfolio) => [
    {
      text: "Delete",
      icon: <DeleteIcon />,
      onClick: () => setDeleteModalId(item?.id),
    },
    {
      text: "Edit",
      icon: <EditIcon />,
      onClick: () => router.push(`/admin/portfolio/${item?.id}`),
    },
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGetPortfolio();
    }, 300); // Add a debounce to reduce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, currentPage]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="ring-1 ring-borderColor bg-white p-4 md:p-7 pb-[10px] md:pb-[10px] rounded-[10px] min-h-[50vh]">
      <div className="flex flex-wrap-reverse justify-between items-center mb-8 gap-5">
        <div className="basis-[100%] md:basis-[33.33%]">
          <SearchBar
            value={searchValue}
            onChange={handleSearchInput}
            placeholder="Search by name"
          />
        </div>
        {showAddBtn ? (
          <div className="flex gap-[10px]">
            <CustomButton
              className=""
              variantType="outlined"
              leftIcon={<AddIcon />}
              onClick={() => router.push("/admin/portfolio/add")}
            >
              Add Portfolio
            </CustomButton>
          </div>
        ) : null}
      </div>

      <div
        className="theme-table investorPage"
        style={{
          overflow: portfolioList?.length > 4 ? "auto" : "visible",
        }}
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
              portfolioList?.length ? (
                <>
                  {portfolioList?.map((item, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>{item?.id}</td> */}
                        <td className="capitalize">{item?.name}</td>
                        <td className="capitalize">{item?.account_no}</td>

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
                                className={`right-[60%] min-w-[140px] ${
                                  index < 2
                                    ? "top-[-40px]"
                                    : portfolioList.length - 3 > index
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
              ) : portfolioList ? (
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
          totalPages={Math.ceil(totalRecords / itemsOnPage)}
          onPageChange={handlePageChange}
        />
      </div>
      <ConfirmationModal
        isOpen={deleteModalId !== null}
        image="/assets_admin/images/delete.png"
        title="DELETE"
        description="Are you sure you want to Delete this Portfolio?"
        handleClose={() => setDeleteModalId(null)}
        confirmBtn={
          <CustomButton loading={deleteLoading} onClick={handleDeleteTrade}>
            Yes, Delete
          </CustomButton>
        }
      />
    </div>
  );
};

export default Portfolio;
