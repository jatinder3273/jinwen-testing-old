import { FormikProps } from "formik";
import React, { Dispatch, useEffect, useState } from "react";
import InputField from "./input";
import country_codes from "@/utils/country_code";

interface IProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  formik?: FormikProps<any>;
  name: string;
  selectedValue: string;
  setSelectedValue: any;
  noRadius?: boolean;
}

const PhoneInputField: React.FC<IProps> = ({
  formik,
  name,
  selectedValue,
  setSelectedValue,
  noRadius,
  ...rest
}) => {
  return (
    <div className="relative">
      <InputField
        formik={formik}
        name={name}
        className="ps-[62px]"
        noRadius={noRadius}
        allowNumberOnly
        {...rest}
      />
      <select
        className="absolute left-3 top-[50%] translate-y-[-50%] bg-adminBg cursor-pointer focus-visible:outline-none appearance-none text-sm"
        onChange={(e) => setSelectedValue(e.target.value)}
        value={selectedValue}
      >
        {country_codes.map((item, index) => (
          <option key={index} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PhoneInputField;
