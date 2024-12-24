"use client";
import {
  EyePasswordCloseIcon,
  EyePasswordIcon,
} from "@/admin_components/icons";
import { numberRegex } from "@/utils/constants";
import { FormikProps } from "formik";
import React, { useState } from "react";

interface IProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  formik?: FormikProps<any>;
  name: string;
  noRadius?: boolean;
  allowNumberOnly?: boolean;
  className?:string;
}

const InputField: React.FC<IProps> = ({
  formik,
  name,
  noRadius,
  allowNumberOnly,
  ...rest
}) => {
  const [inputType, setInputType] = useState(rest.type ?? "text");
  const formikValue = formik?.values[name];
  const formikError = formik?.touched[name] ? formik?.errors[name] : null;

  return (
    <div className="relative">
      <input
        value={formikValue}
        onChange={(e) => {
          if (allowNumberOnly && e.target.value) {
            if (numberRegex.test(e.target.value)) {
              formik?.setFieldValue(name, e.target.value.trimStart());
            }
          } else {
            formik?.setFieldValue(name, e.target.value.trimStart());
          }
        }}
        {...rest}
        // className={`bg-adminBg border-none h-[50px] focus-visible:outline-none px-[18px] py-3 w-full ring-1 text-sm font-medium placeholder:font-light ${
        //   formikError ? "ring-error" : "ring-borderColor"
        // } ${noRadius ? "" : "rounded-[10px]"} ${
        //   rest.type === "password" ? "pr-12" : ""
        // } ${rest.className ?? ""}`}
        className={`${
          rest.className?.includes("bg-") ? "" : "bg-adminBg"
        } border-none h-[50px] focus-visible:outline-none px-[18px] py-3 w-full ring-1 text-sm font-medium placeholder:font-light ${
          formikError ? "ring-error" : "ring-borderColor"
        } ${noRadius ? "" : "rounded-[10px]"} ${
          rest.type === "password" ? "pr-12" : ""
        } ${rest.className ?? ""}`}
        
        onBlur={() =>
          rest.type !== "password"
            ? formik?.setFieldValue(name, formikValue?.trimEnd())
            : {}
        }
        name={name}
        type={inputType}
      />
      {rest.type === "password" ? (
        <div
          className="absolute right-[20px] top-[50%] translate-y-[-50%]"
          onClick={() =>
            setInputType((prev) => (prev === "password" ? "text" : "password"))
          }
        >
          {inputType === "password" ? (
            <EyePasswordCloseIcon />
          ) : (
            <EyePasswordIcon />
          )}
        </div>
      ) : null}

      {formikError && typeof formikError === "string" ? (
        <span className="absolute text-error top-[100%] text-xs text-left left-1">
          {formikError}
        </span>
      ) : null}
    </div>
  );
};

export default InputField;
