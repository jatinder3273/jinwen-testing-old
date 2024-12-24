"use client";
import React, { ChangeEvent } from "react";
import { SearchIcon } from "../icons";

interface IProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {}

const SearchBar: React.FC<IProps> = ({ ...rest }) => {
  return (
    <div className="relative flex items-center text-dbBlack h-12">
      <span className="absolute left-5">
        <SearchIcon />
      </span>
      <input
        type="text"
        className="border-none h-full focus-visible:outline-none ps-14 pe-5 min-w-[250px]   w-full ring-1 ring-borderColor rounded-[4rem] text-[14px]"
        {...rest}
      />
    </div>
  );
};

export default SearchBar;
