"use client";
import CustomButton from "@/components/theme/customButton";
import SelectField from "@/components/theme/select";
import SimpleSelectField from "@/components/theme/simpleSelect";
import useFetch from "@/hooks/useFetch";
import { motion } from "framer-motion";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface IProps {
  isOpen: boolean;
  title?: string;
  handleClose: () => void;
  confirmBtn?: ReactNode;
  children?: ReactNode;
  importListOf: string;
  setImportFile: Dispatch<SetStateAction<FormData | null>>;
  importFile: FormData | null;
  csvUrl: string;
  csvFilename: string;
}

const ImportCsvModal: React.FC<IProps> = ({
  isOpen,
  title,
  handleClose,
  confirmBtn,
  children,
  importListOf,
  setImportFile,
  csvUrl,
  csvFilename,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [portfolioList, setPortfolioList] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState("");
  const [getPortfolioList, { errorMessage }] = useFetch(
    "/admin/list-portfolio/",
    {
      method: "POST",
    }
  );
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
    const delayDebounceFn = setTimeout(() => {
      handleGetPortfolio();
    }, 300); // Add a debounce to reduce API calls

    return () => clearTimeout(delayDebounceFn);
  }, []);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  useEffect(() => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("portfolio", portfolioValue);
      setImportFile(formData);
    }
  }, [uploadedFile, portfolioValue]);

  useEffect(() => {
    setPortfolioValue(null);
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className="fixed z-[9999] inset-0 h-full w-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`w-[90%] max-w-[600px] bg-white rounded-md text-textLight p-5 space-y-4 font-sans `}
          >
            {title ? <h4 className="text-2xl font-semibold">{title}</h4> : null}
            <p className="text-base font-sans ">
              <a
                href={csvUrl}
                download={csvFilename}
                className="underline font-semibold mr-1"
              >
                Click here
              </a>
              to download the spreadsheet template for importing {importListOf}
            </p>
            <div className="basis-[100%] xl:basis-[50%] px-[10px]">
              <SimpleSelectField
                // placeholder="Portfolio"
                name="portfolio_name"
                value={portfolioValue}
                options={portfolioList?.map((item) => ({
                  label: item?.name ?? "",
                  value: item?.id ?? "",
                }))}
                onchange={(e) => setPortfolioValue(e.target?.value)}
              />
            </div>
            <div
              className="flex items-center justify-center border-[1px] border-borderColor bg-adminBg rounded-[10px] aspect-[4.2/1.5] cursor-pointer"
              onClick={handleBoxClick}
            >
              <input
                type="file"
                name="csv"
                id={title}
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <h5 className="text-md text-center font-light">
                <span className="text-primary underline">
                  Upload or Drag & Drop
                </span>
                <span className="text-textBlack block max-w-[70%] m-auto">
                  Click here to select the file from your computer, or simply
                  drag it here
                </span>
              </h5>
            </div>
            {uploadedFile && (
              <p className="text-center mt-2 text-sm text-green-500">
                File selected: {uploadedFile.name}
              </p>
            )}
            <div className="text-center text-textBlack pt-6 pb-2">
              {children}
              <div className="flex justify-center gap-[10px] mt-5">
                <CustomButton
                  variantType="outlined"
                  onClick={() => {
                    handleClose();
                    setUploadedFile(null);
                    setPortfolioValue(null);
                  }}
                >
                  Cancel
                </CustomButton>
                {confirmBtn}
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
};

export default ImportCsvModal;
