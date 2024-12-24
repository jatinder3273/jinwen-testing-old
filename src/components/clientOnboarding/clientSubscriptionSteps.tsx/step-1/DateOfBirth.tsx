


import React, { useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useStepData } from "../../stepper/UseStepData";
import moment from "moment";

const countryOptions = [
  { label: "United States", value: 1, flag: "🇺🇸" },
];

export const DateOfBirth = () => {
  const { data, setData } = useStepData();
  const countrySelector = useRef<HTMLSelectElement>(null);

 
  const maxAllowedDate = moment().subtract(18, "years").format("YYYY-MM-DD");

  useEffect(() => {
    if (countrySelector.current && data && !data.pob_country) {
      countrySelector.current.value = "1"; 
      const event = new Event("change", { bubbles: true });
      countrySelector.current.dispatchEvent(event); 
    }
  }, [data]);

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">
        Date & Place of Birth
      </h2>

      <div className="">
        <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px]">
          What is the subscriber's date of birth?
        </p>

        <div className="mb-4">
          <input
            value={data?.dob ? moment(data.dob).format("YYYY-MM-DD") : ""}
            name="dob"
            type="date"
            required
            max={maxAllowedDate} 
            onChange={(evt) => {
              const selectedDate = evt.target.value;
              if (moment(selectedDate).isAfter(maxAllowedDate)) {
                alert("You must be at least 18 years old.");
                return;
              }
              setData((prevState) => ({ ...prevState, dob: selectedDate }));
            }}
            placeholder="dd/MM/yyyy"
            data-type="date"
            data-format="MM/DD/yyyy"
            className="w-[453px] h-[51px] p-[15px] pr-[20px] gap-[47px] border-[0.8px] rounded-tl-[4px] rounded-tr-none border-transparent mt-2 border-[#DCE1E6] bg-[#FCFAFA]"
          />
        </div>

        <p className="text-[#494F53] leading-[28px] mb-4 text-[16px]">
          Where was the subscriber born?
        </p>

        <label className="mb-4 block">Country / Territory</label>

        <select
          required
          ref={countrySelector}
          value={data?.pob_country}
          onChange={(e) =>
            setData((prevState) => ({
              ...prevState,
              pob_country: parseInt(e.target.value),
            }))
          }
          data-type="number"
          name="pob_country"
          className="h-[51px] w-[453px]  border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100 p-2"
        >
          {countryOptions.map((countryOption) => (
            <option key={countryOption.value} value={countryOption.value}>
              {countryOption.flag} {countryOption.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateOfBirth;
