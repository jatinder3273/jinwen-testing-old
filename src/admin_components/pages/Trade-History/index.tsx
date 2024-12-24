"use client";

import ConfirmationModal from "@/admin_components/common/confirmationModal";
import DropdownMenu from "@/admin_components/common/dropdownMenu";
import ImportCsvModal from "@/admin_components/common/importCsvModal";
import Pagination from "@/admin_components/common/pagination";
import SearchBar from "@/admin_components/common/searchBar";
import {
  AddIcon,
  CloudArrowDownIcon,
  DeleteIcon,
  EditIcon,
} from "@/admin_components/icons";
import ClickAwayListener from "@/admin_components/utils/ClickAwayListener";
import CustomButton from "@/components/theme/customButton";
import useFetch from "@/hooks/useFetch";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import styles from "./TradeHistoryPage.module.css";
import useAuthService from "@/utils/authService";
import SimpleSelectField from "@/components/theme/simpleSelect";
import { convertTwoDecimalPlaces } from "@/utils/Functions";

interface IProps {
  showAddBtn?: boolean;
}

interface TradeHistory {
  portfolio: {
    name: string;
    id: string;
  };
  id: number;
  symbol: string;
  date: string;
  quantity: number;
  t_price: number;
  c_price: number;
  proceeds: number;
  commissions: number;
  basis: number;
  realized_profit_loss: number;
  mtm_profit_loss: number;
}

const TradeHistoryPage = ({ showAddBtn }: IProps) => {
  const router = useRouter();
  const { getToken } = useAuthService();
  const [tradeHistories, setTradeHistories] = useState<TradeHistory[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [portfolioList, setPortfolioList] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsOnPage = 50; // Number of items per page
  const [isOpenActionMenu, setIsOpenActionMenu] = useState({
    show: false,
    index: null,
  });
  const [importFile, setImportFile] = useState<FormData | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
  const [importModal, setImportModal] = useState<boolean>(false);
  const tableHeadings = [
    // "Portfolio",
    "Symbol",
    "Date",
    "Quantity",
    "T. Price",
    "C. Price",
    "Proceeds",
    "Commissions",
    "Basis",
    "Realized P/L",
    "MTM P/L",
    "Actions",
  ];

  const [getPortfolioList] = useFetch("/admin/list-portfolio/", {
    method: "POST",
  });

  const [getTradeHistoryList, { loading, errorMessage }] = useFetch(
    "/admin/trade-history/",
    {
      method: "POST",
    }
  );

  const [deleteSingleTradeHistory, { loading: deleteLoading }] = useFetch(
    `/admin/delete-trade-history/${deleteModalId}/`,
    {
      method: "DELETE",
    }
  );

  const [
    importTradeHistory,
    {
      loading: importTradeHistoryLoading,
      response: importTradeHistoryResponse,
    },
  ] = useFetch("/admin/upload-trade-history-csv/", {
    method: "POST",
  });

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleGetPortfolio = async (pageNumber?: number) => {
    try {
      const res = await getPortfolioList({
        start: 0,
        length: 0,
        search: {
          value: "",
        },
      });
      if (res.status) {
        setPortfolioList(res?.data ?? []);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    // const delayDebounceFn = setTimeout(() => {
    handleGetPortfolio();
    // }, 300); // Add a debounce to reduce API calls

    // return () => clearTimeout(delayDebounceFn);
  }, []);

  useEffect(() => {
    // Set the initial portfolio value when portfolioList is available
    if (portfolioList.length > 0 && !portfolioValue) {
      setPortfolioValue(portfolioList[0].id);
    }
  }, [portfolioList]);

  const handleGetTradeHistories = async (pageNumber?: number) => {
    try {
      const res = await getTradeHistoryList({
        start: ((pageNumber ?? currentPage) - 1) * itemsOnPage,
        length: itemsOnPage,
        search: {
          value: searchValue,
        },
        portfolio: portfolioValue,
      });
      if (res.status === 1) {
        setTradeHistories(res?.data ?? []); // Replace current state with fetched data
        setTotalRecords(res?.recordsTotal ?? 0);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("tradeHistoryTable");
    if (!input) return;

    const pdf = new jsPDF("p", "mm", "a4");

    // Load the logo image
    const logo = "/assets/image/logo.png"; // Adjust the path to where the logo is stored
    const imgWidth = 50;
    const imgHeight = 50;
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Add the logo image centered at the top
    const xPositionLogo = (pageWidth - imgWidth) / 2;
    pdf.addImage(logo, "PNG", xPositionLogo, 10, imgWidth, imgHeight);

    // Add header text below the logo
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Trade History", 10, 70);

    // Adjust the font size for the table content
    pdf.setFontSize(8);

    // Initial Y position after the header
    let yPosition = 80;

    // Get the rows of the table and convert to an array
    const rows = Array.from(input.getElementsByTagName("tr"));

    // Extract headers
    const headers = rows[0].getElementsByTagName("th");
    const headersArray = Array.from(headers).map((header) =>
      header.innerText.replace(/^\uFEFF/, "")
    );

    // Define column widths for each column (adjust values as needed)
    const columnWidths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

    // Function to add a row to the PDF
    const addRowToPDF = (rowData, y, isHeader = false) => {
      let xPosition = 10; // Initial X position
      if (isHeader) {
        pdf.setFont("helvetica", "bold");
      } else {
        pdf.setFont("helvetica", "normal");
      }
      rowData.forEach((cellData, index) => {
        let text = cellData.replace(/^\uFEFF/, ""); // Remove BOM if present
        const maxWidth = columnWidths[index];
        if (pdf.getTextWidth(cellData) > maxWidth) {
          text = pdf.splitTextToSize(cellData, maxWidth);
        }
        pdf.text(text, xPosition, y);
        xPosition += maxWidth; // Adjust based on your column width and padding
      });
    };

    // Add headers to the PDF
    addRowToPDF(headersArray, yPosition, true);
    yPosition += 10;

    // Loop through each row and add it to the PDF
    rows.slice(1).forEach((row) => {
      // Skip the first row (header)
      const cols = Array.from(row.getElementsByTagName("td"));
      const rowData = cols.map((col) => col.innerText.replace(/^\uFEFF/, ""));

      addRowToPDF(rowData, yPosition);
      yPosition += 10; // Adjust based on your row height

      // Add a new page if the yPosition exceeds page height
      if (yPosition > 280) {
        pdf.addPage();
        yPosition = 10; // Reset yPosition for new page

        // Add headers to the new page
        addRowToPDF(headersArray, yPosition, true);
        yPosition += 10;
      }
    });

    // Save the PDF
    pdf.save("trade_history.pdf");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGetTradeHistories();
    }, 300); // Add a debounce to reduce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, currentPage, portfolioValue]);

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>Error: {errorMessage}</div>;

  const handleActionClose = () => {
    setIsOpenActionMenu({
      show: false,
      index: null,
    });
  };
  const handleActionToggle = (index?: number) => {
    setIsOpenActionMenu((prev) => ({
      show: !prev.show,
      index: index ?? null,
    }));
  };

  const actionOptions = (item: TradeHistory) => [
    {
      text: "Delete",
      icon: <DeleteIcon />,
      onClick: () => setDeleteModalId(item?.id),
    },
    {
      text: "Edit",
      icon: <EditIcon />,
      onClick: () => router.push(`/admin/Trade-History/${item?.id}`),
    },
  ];

  const handleDeleteTradeHistory = async () => {
    const res = await deleteSingleTradeHistory();
    if (res.status) {
      const newList = tradeHistories.filter(
        (item) => item.id !== deleteModalId
      );
      setTradeHistories(newList);
      setDeleteModalId(null);
      setTotalRecords((prev) => prev - 1);
      handleActionClose();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  const handlePortfolioChange = (newValue: string) => {
    // console.log("Portfolio changed to:", newValue);
  };
  return (
    <div className="ring-1 ring-borderColor bg-white p-4 md:p-7 pb-[10px] md:pb-[10px] rounded-[10px] min-h-[50vh]">
      <div className="flex xl:justify-between items-center mb-8 justify-normal flex-wrap xl:flex-nowrap">
        <div className=" basis-[50%] flex gap-1 mb-4 xl:mb-0">
          <SearchBar
            value={searchValue}
            onChange={handleSearchInput}
            placeholder="Search by stock name"
          />
          <div className="basis-[50%] xl:basis-[20%] px-[10px] cursor-pointer min-w-[250px]">
            <SimpleSelectField
              // placeholder="Portfolio"
              style={{
                borderRadius: "30px",
                border: "1px solid lightgray",
                boxShadow: "none",
                backgroundColor: "transparent",
                // color: "grey",
                cursor: "pointer",
              }}
              name="portfolio_name"
              value={portfolioValue}
              options={portfolioList?.map((item) => ({
                label: item?.name ?? "",
                value: item?.id ?? "",
              }))}
              onchange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const newValue = e.target?.value;
                setPortfolioValue(newValue);
                handlePortfolioChange(newValue);
              }}
            />
          </div>
        </div>
        {showAddBtn ? (
          <div className="flex gap-[10px]">
            <CustomButton
              className=""
              variantType="outlined"
              leftIcon={<AddIcon />}
              onClick={() => router.push("/admin/Trade-History/add")}
            >
              Add Trade History
            </CustomButton>
            <CustomButton
              variantType="filled"
              rightIcon={<CloudArrowDownIcon />}
              onClick={() => setImportModal(true)}
              // loading={excelDataLoading}
            >
              Import
            </CustomButton>
            <CustomButton
              variantType="filled"
              rightIcon={<CloudArrowDownIcon />}
              onClick={handleDownloadPDF}
            >
              Download as PDF
            </CustomButton>
          </div>
        ) : null}
      </div>

      <div
        className={`theme-table tradeHistoryPage ${styles.tradeHistoryTable}`}
      >
        <table id="tradeHistoryTable">
          <thead className="sticky top-0 z-20">
            <tr>
              {tableHeadings.map((heading, index) => (
                <th key={index} scope="col" className="bg-white">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={10}>
                  <div className="w-full min-h-[300px] flex items-center justify-center">
                    <PulseLoader color="#ff782c" />
                  </div>
                </td>
              </tr>
            )}
            {!loading && tradeHistories.length === 0 && (
              <tr>
                <td colSpan={12} className="text-center py-4">
                  No trade histories found.
                </td>
              </tr>
            )}
            {!loading &&
              tradeHistories.map((trade, index) => (
                <tr key={index}>
                  {/* <td>
                    {trade.portfolio?.name ? trade.portfolio?.name : "--"}
                  </td> */}
                  <td>{trade.symbol ? trade.symbol : "--"}</td>
                  <td>{trade.date ?? "--"}</td>
                  <td>{trade.quantity ?? "--"}</td>
                  <td>{convertTwoDecimalPlaces(trade.t_price) ?? "--"}</td>
                  <td>{convertTwoDecimalPlaces(trade.c_price) ?? "--"}</td>
                  <td>{convertTwoDecimalPlaces(trade.proceeds) ?? "--"}</td>
                  <td>{convertTwoDecimalPlaces(trade.commissions) ?? "--"}</td>
                  <td>{convertTwoDecimalPlaces(trade.basis) ?? "--"}</td>
                  <td>
                    {convertTwoDecimalPlaces(trade.realized_profit_loss) ??
                      "--"}
                  </td>
                  <td>
                    {convertTwoDecimalPlaces(trade.mtm_profit_loss) ?? "--"}
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
                          className={`absolute right-0 min-w-[140px] ${
                            tradeHistories.length - 3 < index
                              ? "top-auto bottom-[20%]"
                              : index > 0
                              ? "top-[50%] translate-y-[-50%]"
                              : "top-0"
                          }`}
                          options={actionOptions(trade)}
                        />
                      ) : null}
                    </ClickAwayListener>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
        description="Are you sure you want to Delete this Trade History?"
        handleClose={() => setDeleteModalId(null)}
        confirmBtn={
          <CustomButton
            loading={deleteLoading}
            onClick={handleDeleteTradeHistory}
          >
            Yes, Delete
          </CustomButton>
        }
      />
      <ImportCsvModal
        csvFilename="example_trade_history.csv"
        csvUrl="/assets_admin/csv/example_trade_history.csv"
        isOpen={importModal}
        title="Import Trade History List"
        handleClose={() => setImportModal(null)}
        importListOf="Trades History"
        setImportFile={setImportFile}
        importFile={importFile}
        confirmBtn={
          <CustomButton
            loading={importTradeHistoryLoading}
            onClick={() => {
              if (importFile != null) {
                const token = getToken();
                importTradeHistory(importFile, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                }).then((res) => {
                  if (res?.status == 1) {
                    toast.success(res?.message);
                    handleGetTradeHistories();
                    setImportModal(null);
                  } else {
                    toast.error(res?.message);
                  }
                });
              }
            }}
          >
            Yes, Import
          </CustomButton>
        }
      />
    </div>
  );
};

export default TradeHistoryPage;
