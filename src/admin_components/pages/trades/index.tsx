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
import SimpleSelectField from "@/components/theme/simpleSelect";
import useFetch from "@/hooks/useFetch";
import { convertTwoDecimalPlaces } from "@/utils/Functions";
import useAuthService from "@/utils/authService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";

interface IProps {
  showAddBtn?: boolean;
}

interface Trade {
  id: number;
  stock_name: string;
  portfolio: { name: string; id: string };
  quantity: number;
  price: number;
  market_value: number;
  cost_basis: number;
  gain_loss: number;
}

const TradePage = ({ showAddBtn }: IProps) => {
  const router = useRouter();
  const { getToken } = useAuthService();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [portfolioList, setPortfolioList] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
  const [importModal, setImportModal] = useState<boolean>(false);
  const [importFile, setImportFile] = useState<FormData | null>(null);
  const [isOpenActionMenu, setIsOpenActionMenu] = useState({
    show: false,
    index: null,
  });
  const [getPortfolioList] = useFetch("/admin/list-portfolio/", {
    method: "POST",
  });
  const itemsOnPage = 50; // Number of items per page

  const tableHeadings = [
    // "Portfolio",
    "Stock Name",
    "Quantity",
    "Price",
    "Market Value",
    "Cost Basis",
    "Gain Loss",
    "Actions",
  ];

  const [getTradeList, { loading, errorMessage }] = useFetch("/admin/trades/", {
    method: "POST",
  });
  const [
    importTradeHistory,
    { loading: importTradeLoading, response: importTradeResponse },
  ] = useFetch("/admin/upload-trade-csv/", {
    method: "POST",
  });

  const [deleteSingleTrade, { loading: deleteLoading }] = useFetch(
    `/admin/delete-trade/${deleteModalId}/`,
    {
      method: "DELETE",
    }
  );
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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

  const handleGetTrades = async (pageNumber?: number) => {
    try {
      const res = await getTradeList({
        start: ((pageNumber ?? currentPage) - 1) * itemsOnPage,
        length: itemsOnPage,
        search: {
          value: searchValue,
        },
        portfolio: portfolioValue,
      });
      if (res.status) {
        setTrades(
          res?.data?.filter((trade: Trade) =>
            trade?.stock_name?.toLowerCase().includes(searchValue.toLowerCase())
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("tradeTable");
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
    pdf.text("Positions", 10, 70);

    // Adjust the font size for the table content
    pdf.setFontSize(12);

    // Initial Y position after the header
    let yPosition = 80;

    // Get the rows of the table and convert to an array
    const rows = Array.from(input.getElementsByTagName("tr"));

    // Extract headers
    const headers = rows[0].getElementsByTagName("th");
    const headersArray = Array.from(headers).map((header) => {
      if (header.innerText === "Gain") {
        return "Gain Loss";
      }
      return header.innerText;
    });

    // Function to add a row to the PDF
    const addRowToPDF = (rowData, y, isHeader = false) => {
      let xPosition = 2; // Initial X position
      if (isHeader) {
        pdf.setFont("helvetica", "bold");
      } else {
        pdf.setFont("helvetica", "normal");
      }
      rowData.forEach((cellData, index) => {
        let text = cellData;
        const maxWidth = index === 0 ? 40 : 25; // Set max width for the first column
        if (pdf.getTextWidth(cellData) > maxWidth) {
          text = pdf.splitTextToSize(cellData, maxWidth);
        }
        pdf.text(text, xPosition, y);
        xPosition += maxWidth + 9; // Adjust based on your column width and padding
      });
    };

    // Add headers to the PDF
    addRowToPDF(headersArray, yPosition, true);
    yPosition += 10;

    // Loop through each row and add it to the PDF
    rows.slice(1).forEach((row) => {
      // Skip the first row (header)
      const cols = Array.from(row.getElementsByTagName("td"));
      const rowData = cols.map((col) => col.innerText);

      addRowToPDF(rowData, yPosition);
      yPosition += 15; // Adjust based on your row height

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
    pdf.save("trades.pdf");
  };
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

  const handleDeleteTrade = async () => {
    const res = await deleteSingleTrade();
    if (res.status) {
      const newList = trades.filter((item) => item.id !== deleteModalId);
      setTrades(newList);
      setDeleteModalId(null);
      setTotalRecords((prev) => prev - 1);
      handleActionClose();
      toast.success(res?.message);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGetTrades();
    }, 300); // Add a debounce to reduce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, currentPage, portfolioValue]);

  const actionOptions = (item: Trade) => [
    {
      text: "Delete",
      icon: <DeleteIcon />,
      onClick: () => setDeleteModalId(item?.id),
    },
    {
      text: "Edit",
      icon: <EditIcon />,
      onClick: () => router.push(`/admin/trades/${item?.id}`),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>Error: {errorMessage}</div>;

  const handlePortfolioChange = (newValue: string) => {
    // console.log("Portfolio changed to:", newValue);
  };

  return (
    <div className="ring-1 ring-borderColor bg-white p-4 md:p-7 pb-[10px] md:pb-[10px] rounded-[10px] min-h-[50vh]">
      <div className="flex xl:justify-between items-center mb-8 justify-normal flex-wrap xl:flex-nowrap">
        <div className=" basis-[60%] flex gap-3 mb-4 xl:mb-0">
          <SearchBar
            value={searchValue}
            onChange={handleSearchInput}
            placeholder="Search by stock name"
          />
          <div className="basis-[60%] xl:basis-[20%] px-[10px] cursor-pointer min-w-[250px]">
            <SimpleSelectField
              // placeholder="Portfolio"
              style={{
                borderRadius: "30px",
                border: "1px solid lightgray",
                boxShadow: "none",
                backgroundColor: "transparent",
                // color: "black",
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
              onClick={() => router.push("/admin/trades/add")}
            >
              Add Positions
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

      <div className="theme-table tradePage">
        <table id="tradeTable">
          <thead className="sticky top-0 z-20">
            <tr>
              {tableHeadings.map((heading) => (
                <th key={heading} scope="col" className="bg-white">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7}>
                  <div className="w-full min-h-[300px] flex items-center justify-center">
                    <PulseLoader color="#ff782c" />
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              trades.map((trade, index) => {
                // console.log(trade, "tradedata");
                return (
                  <tr key={index}>
                    {/* <td>
                      {trade?.portfolio?.name ? trade?.portfolio?.name : "--"}
                    </td> */}
                    <td>{trade.stock_name ? trade.stock_name : "--"}</td>
                    <td>{trade.quantity ? trade.quantity : "--"}</td>
                    <td>
                      {trade.price
                        ? convertTwoDecimalPlaces(trade.price)
                        : "--"}
                    </td>
                    <td>
                      {trade.market_value
                        ? convertTwoDecimalPlaces(trade.market_value)
                        : "--"}
                    </td>
                    <td>
                      {trade.cost_basis
                        ? convertTwoDecimalPlaces(trade.cost_basis)
                        : "--"}
                    </td>
                    <td>
                      {trade.gain_loss
                        ? convertTwoDecimalPlaces(trade.gain_loss)
                        : "--"}
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
                              trades.length - 3 < index
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
                );
              })}
            {!loading && trades.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No trades found.
                </td>
              </tr>
            )}
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
        description="Are you sure you want to Delete this Trade?"
        handleClose={() => setDeleteModalId(null)}
        confirmBtn={
          <CustomButton loading={deleteLoading} onClick={handleDeleteTrade}>
            Yes, Delete
          </CustomButton>
        }
      />
      <ImportCsvModal
        csvFilename="example_trade.csv"
        csvUrl="/assets_admin/csv/example_trade.csv"
        isOpen={importModal}
        title="Import Trade List"
        handleClose={() => setImportModal(false)}
        importListOf="Trades"
        setImportFile={setImportFile}
        importFile={importFile}
        confirmBtn={
          <CustomButton
            loading={importTradeLoading}
            onClick={() => {
              const token = getToken();
              importTradeHistory(importFile, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }).then((res) => {
                if (res?.status == 1) {
                  toast.success(res?.message);
                  handleGetTrades();
                  setImportModal(null);
                } else {
                  toast.error(res?.message);
                }
              });
            }}
          >
            Yes, Import
          </CustomButton>
        }
      />
    </div>
  );
};

export default TradePage;
