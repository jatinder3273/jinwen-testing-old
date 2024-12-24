import React from "react";

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (number: number) => void;
}

const Pagination: React.FC<IProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;
  return (
    <ul className="flex items-center gap-3 justify-center">
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => onPageChange(number)}
          className={`h-[31px] w-[33px] shrink-0 rounded-[6px] border-[2px] flex items-center justify-center text-sm text-dbBlack cursor-pointer ${
            number === currentPage
              ? "border-borderColor bg-adminBg"
              : "border-[#fff]"
          } hover:bg-[#f5f5f5] hover:border-[#f5f5f5]`}
        >
          {String(number).padStart(2, "0")}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
