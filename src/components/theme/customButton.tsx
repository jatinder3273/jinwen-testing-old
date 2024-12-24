"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { PulseLoader } from "react-spinners";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  variantColor?: "primary" | "secondary" | "black";
  variantType?: "outlined" | "filled";
  noRadius?: boolean;
}

const CustomButton: React.FC<IProps> = ({
  leftIcon,
  rightIcon,
  loading,
  variantColor = "secondary",
  variantType = "filled",
  noRadius,
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
      className={`relative shrink-0 border-[1.5px] font-semibold min-w-[90px] inline-flex items-center justify-center ${
        variantColor === "primary" && variantType === "outlined"
          ? "border-primary text-primary"
          : variantColor === "secondary" && variantType === "outlined"
          ? "border-secondary text-secondary"
          : variantColor === "black" && variantType === "outlined"
          ? "border-textBlack text-textBlack"
          : ""
      } ${
        variantColor === "secondary" && variantType === "filled"
          ? "bg-secondary border-transparent text-white"
          : variantColor === "primary" && variantType === "filled"
          ? "bg-primary border-transparent text-white"
          : variantColor === "black" && variantType === "filled"
          ? "bg-textBlack border-transparent text-white"
          : ""
      } ${
        noRadius
          ? "px-[30px] min-h-[40px] md:min-h-[48px] font-[600] text-lg"
          : "rounded-[4rem] px-[18px] min-h-[2.5rem] md:min-h-[2.625rem] text-sm"
      } ${rest.className}`}
    >
      {/* {!loading ? <PulseLoader color='white' size={14} /> : null} */}
      <span
        className={`absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] ${
          !loading ? "opacity-0 invisible" : ""
        }`}
      >
        <PulseLoader color="white" size={10} />
      </span>
      <span
        className={`flex items-center gap-[8px] ${
          loading ? "opacity-0 invisible" : ""
        }`}
      >
        {leftIcon}
        {rest.children}
        {rightIcon}
      </span>
    </button>
  );
};

export default CustomButton;
