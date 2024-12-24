

"use client";

import React, {useState, useEffect, useRef} from "react";
import PhoneInput from "@/components/theme/phone";
import { useStepData } from "../../stepper/UseStepData";
import debounce from "lodash.debounce";

const PhoneNumber = () => {
  const { data, setData } = useStepData();
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const countrySelector = useRef<HTMLSelectElement>(null);
  


  useEffect(() => {
    if (countrySelector && countrySelector.current && data && !data.subscriber_phone_code) {
      console.log("auto selecting country")
      countrySelector.current.value = '1';
      const event = new Event('change', { bubbles: true });
      countrySelector.current.dispatchEvent(event);
    } else if (data && countrySelector.current) {
      console.log("Country: ", countrySelector?data.subscriber_phone_code:"")
    } else {
      console.log("element unavailable")
    }
  }, [countrySelector, data]);


 
  const debouncedSetData = debounce((values) => {
    setData((prevState) => {
      const dataCopy = {...prevState, ...values};
      return dataCopy;
    });
  }, 500);

  const handlePhoneChange = (values: {
    countryCode: string;
    phoneNumber: string;
  }) => {
    const { countryCode, phoneNumber } = values;

    console.log("code: ", countryCode, " phone number", phoneNumber)
    // Update data using debounced function
    debouncedSetData({
      subscriber_phone_no: phoneNumber,
      subscriber_phone_code: countryCode,
    });
  };

  const validatePhoneNumber = () => {
    const phoneNumber = data?.subscriber_phone_no || "";
    if (phoneNumber.length < 9 || phoneNumber.length > 15) {
      setPhoneError("Phone number must be between 9 and 15 digits.");
    } else {
      setPhoneError(null);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    validatePhoneNumber();
  };

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">
        Phone Number
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px]">
        Enter the subscriber's desired contact phone number
      </p>

      <PhoneInput
          ref={countrySelector}
        countryCode={data?.subscriber_phone_code}
        phoneNumber={data?.subscriber_phone_no}
        onChange={handlePhoneChange}
        onBlur={handleBlur} 
        className="h-[51px] w-[453px] border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100"
      />

      {isTouched && phoneError && (
        <p className="text-error text-sm mt-1">{phoneError}</p>
      )}
    </div>
  );
};

export default PhoneNumber;
