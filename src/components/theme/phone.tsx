

// import React, { useState, useEffect } from "react";
// import country_codes from "@/dummy/CountryCode";

// interface PhoneInputProps {
//   countryCode: string;
//   phoneNumber: string;
//   onChange: (values: { countryCode: string; phoneNumber: string }) => void;
//   required?: boolean;
//   className?: string;
//   placeholder?: string;
// }

// const PhoneInput: React.FC<PhoneInputProps> = ({
//   countryCode,
//   phoneNumber,
//   onChange,
//   required = false,
//   className = "",
//   placeholder = "",
// }) => {
//   const [selectedCountryCode, setSelectedCountryCode] = useState<string>(countryCode);
//   const [inputPhoneNumber, setInputPhoneNumber] = useState<string>(phoneNumber);


//   useEffect(() => {
//     setSelectedCountryCode(countryCode);
//     setInputPhoneNumber(phoneNumber);
//   }, [countryCode, phoneNumber]);

//   const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newCountryCode = e.target.value;
//     setSelectedCountryCode(newCountryCode);
//     onChange({ countryCode: newCountryCode, phoneNumber: inputPhoneNumber });
//   };

//   const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPhoneNumber = e.target.value.replace(/\D/g, "");
//     setInputPhoneNumber(newPhoneNumber);
//     onChange({ countryCode: selectedCountryCode, phoneNumber: newPhoneNumber });
//   };

//   return (
//     <div className={`flex items-center border border-gray-300 rounded-md w-full ${className}`}>

//       <select
//         name="subscriber_phone_code"
//         value={selectedCountryCode}
//         onChange={handleCountryCodeChange}
//         className="p-2 border-r border-gray-300 bg-transparent focus:outline-none"
//         required={required}
//       >
//         {country_codes.map((item, index) => (
//           <option key={index} value={item.value}>
//             {item.flag} {item.value}
//           </option>
//         ))}
//       </select>

//       <input
//         type="tel"
//         name="subscriber_phone_no"
//         value={inputPhoneNumber}
//         onChange={handlePhoneNumberChange}
//         placeholder={placeholder}
//         className="flex-1 p-2 focus:outline-none bg-transparent"
//         required={required}
//       />
//     </div>
//   );
// };

// export default PhoneInput;





import React, { useState, useEffect } from "react";
import country_codes from "@/dummy/CountryCode";

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onChange: (values: { countryCode: string; phoneNumber: string }) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  ref?: any;
  onBlur?: any;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  phoneNumber,
  onChange,
  required = false,
  className = "",
  placeholder = "",
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(countryCode);
  const [inputPhoneNumber, setInputPhoneNumber] = useState<string>(phoneNumber);


  useEffect(() => {
    setSelectedCountryCode(countryCode);
    setInputPhoneNumber(phoneNumber);
  }, [countryCode, phoneNumber]);

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = e.target.value;
    setSelectedCountryCode(newCountryCode);
    onChange({ countryCode: newCountryCode, phoneNumber: inputPhoneNumber });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, "");
    setInputPhoneNumber(newPhoneNumber);
    onChange({ countryCode: selectedCountryCode, phoneNumber: newPhoneNumber });
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-md w-full ${className}`}>

      <select
        name="subscriber_phone_code"
        value={selectedCountryCode}
        onChange={handleCountryCodeChange}
        className="p-2 border-r border-gray-300 bg-transparent focus:outline-none"
        required={required}
      >
        {country_codes.map((item, index) => (
          <option key={index} value={item.value}>
            {item.flag} {item.value}
          </option>
        ))}
      </select>

      <input
        type="tel"
        name="subscriber_phone_no"
        value={inputPhoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder || "52352653277"}
        className="flex-1 p-2 focus:outline-none bg-transparent"
        required={required}
      />
    </div>
  );
};

export default PhoneInput;










// import React, {useState, useEffect, useImperativeHandle, useRef, forwardRef} from "react";
// import country_codes from "@/dummy/CountryCode";

// interface PhoneInputProps {
//   countryCode: string;
//   phoneNumber: string;
//   onChange: (values: { countryCode: string; phoneNumber: string }) => void;
//   onBlur?: () => void; 
//   required?: boolean;
//   className?: string;
//   placeholder?: string;
// }

// const PhoneInput = forwardRef<HTMLSelectElement, PhoneInputProps>(({
//   countryCode,
//   phoneNumber,
//   onChange,
//   onBlur,
//   required = false,
//   className = "",
//   placeholder = "",
// }: PhoneInputProps, ref) => {
//   // const [selectedCountryCode, setSelectedCountryCode] = useState<string>(countryCode);
//   // const [inputPhoneNumber, setInputPhoneNumber] = useState<string>(phoneNumber);

//   const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newCountryCode = e.target.value;
//     onChange({ countryCode: newCountryCode, phoneNumber: phoneNumber });
//   };

//   const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPhoneNumber = e.target.value.replace(/\D/g, "");
//     onChange({ countryCode: countryCode, phoneNumber: newPhoneNumber });
//   };

//   return (
//     <div className={`flex items-center border border-gray-300 rounded-md w-full ${className}`}>
//       <select
//           ref={ref}
//         name="subscriber_phone_code"
//         value={countryCode}
//         onChange={handleCountryCodeChange}
//         className="p-2 border-r border-gray-300 bg-transparent focus:outline-none"
//         required={required}
//       >
//         {country_codes.map((item, index) => (
//           <option key={index} value={item.value}>
//             {item.flag} {item.value}
//           </option>
//         ))}
//       </select>

//       <input
//         type="tel"
//         name="subscriber_phone_no"
//         value={phoneNumber}
//         onChange={handlePhoneNumberChange}
//         onBlur={onBlur}
//         placeholder={placeholder}
//         className="flex-1 p-2 focus:outline-none bg-transparent"
//         required={required}
//       />
//     </div>
//   );
// });
// PhoneInput.displayName = 'PhoneInput';

// export default PhoneInput;
