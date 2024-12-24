"use client";
import { FormikProps } from "formik";
import React, { useState } from "react";

interface IProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  formik?: FormikProps<any>;
  name: string;
}

const TextAreaField: React.FC<IProps> = ({ formik, name, ...rest }) => {
  const [inputType, setInputType] = useState(rest.type);
  const formikValue = formik?.values[name];
  const formikError = formik?.touched[name] ? formik?.errors[name] : null;
  return (
    <div className="relative">
      <textarea
        className={`bg-[#f4f4f4] border-1 border-[#DCE1E6] h-[50px] focus-visible:outline-none px-[18px] py-3 w-full  text-sm font-medium placeholder:font-light ${
          formikError ? "ring-error" : "ring-borderColor"
        }`}
        value={formikValue}
        onChange={formik?.handleChange}
        {...rest}
        name={name}
      />

      {formikError && typeof formikError === "string" ? (
        <span className="absolute text-error top-[100%] text-xs text-right right-1">
          {formikError}
        </span>
      ) : null}
    </div>
  );
};

export default TextAreaField;
