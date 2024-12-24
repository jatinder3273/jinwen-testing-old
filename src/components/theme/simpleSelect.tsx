"use client";
import { FormikProps } from "formik";
import React from "react";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  formik?: FormikProps<any>;
  name: string;
  options: { label: string | number; value?: string | number }[];
  placeholder?: string;
  noRadius?: boolean;
  onchange: any;
}

const SimpleSelectField: React.FC<IProps> = ({
  value,
  name,
  options,
  placeholder,
  noRadius,
  onchange,
  ...rest
}) => {
  return (
    <div className="relative arrowDown">
      <select
        name={name}
        className={`bg-adminBg border-none h-[50px] focus-visible:outline-none px-[18px] pr-[22px] py-3 w-full ring-1 text-sm font-medium placeholder:font-light appearance-none  ${
          noRadius ? "" : "rounded-[10px]"
        } ${rest.className}`}
        value={value ?? null}
        onChange={onchange}
        {...rest}
      >
        <option value={""} style={{ color: "grey" }}>
          Select Portfolio
        </option>
        {options.map((item, index) => (
          <option key={index} value={item.value} disabled={item.value === ""}>
            {item.label}
          </option>
        ))}
      </select>
      {placeholder && !value ? (
        <span className="absolute left-0 px-[18px] top-[50%] translate-y-[-50%] text-sm font-light text-[rgba(0,0,0,0.4)]">
          {placeholder}
        </span>
      ) : null}
    </div>
  );
};

export default SimpleSelectField;
