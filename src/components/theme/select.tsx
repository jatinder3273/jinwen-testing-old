// "use client";
// import { FormikProps } from "formik";
// import React from "react";

// interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
//   formik?: FormikProps<any>;
//   name: string;
//   options: { label: string | number; value?: string | number }[];
//   placeholder?: string;
//   noRadius?: boolean;
// }

// const SelectField: React.FC<IProps> = ({
//   formik,
//   name,
//   options,
//   placeholder,
//   noRadius,
//   ...rest
// }) => {
//   const formikValue = formik?.values[name];
//   const formikError = formik?.touched[name] ? formik?.errors[name] : null;

//   return (
//     <div className="relative">
//       <select
//         name={name}
//         className={`bg-adminBg border-none h-[50px] focus-visible:outline-none px-[18px] pr-[22px] py-3 w-full ring-1 text-sm font-medium placeholder:font-light appearance-none ${
//           formikError ? "ring-error" : "ring-borderColor"
//         } ${noRadius ? "" : "rounded-[10px]"} ${rest.className}`}
//         value={formikValue}
//         onChange={formik?.handleChange}
//         {...rest}
//       >
//         <option value="" disabled />
//         {options.map((item, index) => (
//           <option key={index} value={item.value} disabled={item.value === ""}>
//             {item.label}
//           </option>
//         ))}
//       </select>
//       {placeholder && !formikValue ? (
//         <span className="absolute left-0 px-[18px] top-[50%] translate-y-[-50%] text-sm font-light text-[rgba(0,0,0,0.4)]">
//           {placeholder}
//         </span>
//       ) : null}

//       {formikError && typeof formikError === "string" ? (
//         <span className="absolute text-error top-[100%] text-xs text-right right-1">
//           {formikError}
//         </span>
//       ) : null}
//     </div>
//   );
// };

// export default SelectField;



"use client";
import { FormikProps } from "formik";
import React, {RefObject} from "react";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  formik?: FormikProps<any>;
  name: string;
  options: { label: string | number; value?: string | number }[];
  placeholder?: string;
  noRadius?: boolean;
  ref?: RefObject<HTMLSelectElement>;
}

const SelectField: React.FC<IProps> = ({
  formik,
  name,
  options,
  placeholder,
  noRadius,
    ref,
  ...rest
}) => {
  const formikValue = formik?.values[name];
  const formikError = formik?.touched[name] ? formik?.errors[name] : null;

  return (
    <div className="relative">
      <select
          ref={ref}
        name={name}
        className={`bg-adminBg border-none h-[50px] focus-visible:outline-none px-[18px] pr-[22px] py-3 w-full ring-1 text-sm font-medium placeholder:font-light appearance-none ${
          formikError ? "ring-error" : "ring-borderColor"
        } ${noRadius ? "" : "rounded-[10px]"} ${rest.className}`}
        value={formikValue}
        onChange={formik?.handleChange}
        {...rest}
      >
        <option value="" disabled />
        {options.map((item, index) => (
          <option key={index} value={item.value} disabled={item.value === ""}>
            {item.label}
          </option>
        ))}
      </select>
      {placeholder && !formikValue ? (
        <span className="absolute left-0 px-[18px] top-[50%] translate-y-[-50%] text-sm font-light text-[rgba(0,0,0,0.4)]">
          {placeholder}
        </span>
      ) : null}

      {formikError && typeof formikError === "string" ? (
        <span className="absolute text-error top-[100%] text-xs text-right right-1">
          {formikError}
        </span>
      ) : null}
    </div>
  );
};

export default SelectField;
