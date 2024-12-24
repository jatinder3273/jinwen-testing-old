// import React, { InputHTMLAttributes, useRef } from "react";

// interface IProps extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   description?:string;
// }

// const Radio: React.FC<IProps> = ({ label,description, ...rest }) => {
//   const ref = useRef(null);
//   const handleLabelClick = () => {
//     ref?.current?.click();
//   };
//   return (
//     <div className={`flex items-baseline gap-2 text-dbBlack ${rest.className}`}>
//       <input {...rest} className="" type="radio" ref={ref} />
//       {label ? (
//         <div>
//           <label className="leading-none" onClick={handleLabelClick}>
//             {label}
//           </label>
//           <p className='mt-1'>{description}</p>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Radio;


import React, { InputHTMLAttributes, useRef } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Radio: React.FC<RadioProps> = ({ label, description, className, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`flex items-start gap-2 text-dbBlack ${className || ""}`}>
      <input
        {...rest}
        type="radio"
        ref={inputRef}
        className="form-radio cursor-pointer accent-primary mt-1"
      />
      {label && (
        <div>
          <label
            onClick={handleLabelClick}
            className="cursor-pointer text-base font-bold text-[22px] leading-none"
          >
            {label}
          </label>
          {description && (
            <p className="text-sm text-[#494F53] mt-[7px] text-[16px]">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Radio;
