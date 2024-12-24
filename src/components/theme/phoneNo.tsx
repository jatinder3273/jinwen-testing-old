import country_codes from "@/dummy/CountryCode";
import React, { useState } from "react";


interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
//   onChange: (value: string) => void;
  onChange: (values: { countryCode: string; phoneNumber: string }) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  phoneNumber,
  onChange,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCode);
  const [inputPhoneNumber, setInputPhoneNumber] = useState(phoneNumber);

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = e.target.value;
    setSelectedCountryCode(newCountryCode);
    onChange({ countryCode: newCountryCode, phoneNumber: inputPhoneNumber });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setInputPhoneNumber(newPhoneNumber);
    onChange({ countryCode: selectedCountryCode, phoneNumber: newPhoneNumber });
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
      <select
        value={selectedCountryCode}
        onChange={handleCountryCodeChange}
        className="p-2 border-r border-gray-300 bg-transparent focus:outline-none"
      >
        {country_codes.map((item, index) => (
          <option key={index} value={item.value}>
            {item?.flag} {item.value}
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={inputPhoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter phone number"
        className="flex-1 p-2 focus:outline-none"
      />
    </div>
  );
};

export default PhoneInput;
