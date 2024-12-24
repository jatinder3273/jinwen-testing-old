import React, { useEffect, useRef } from 'react'
import { useStepData } from '../../stepper/UseStepData';



const countryOptions = [
  { label: "United States", value: 1, flag: "🇺🇸" },
];

const FATFCheck = () => {
  const { data, setData } = useStepData();
  const countrySelector = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if (countrySelector && countrySelector.current && (!data || !data.fatf_check)) {
            console.log("auto selecting country")
            countrySelector.current.value = '1';
            const event = new Event('change', { bubbles: true });
            countrySelector.current.dispatchEvent(event);
        } else if (data && countrySelector.current) {
            console.log("Country: ", countrySelector?data.fatf_check:"")
        } else {
            console.log(data?"element unavailable":"data unavailable")
        }
    }, [countrySelector, data]);

 
 
  return (
    <div className="flex flex-col text-left flex-wrap">
     <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
      FATF Check
      </h2>
      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
      There may be restrictions or additional information required if the subscriber cannot wire from a Financial Action Task Force ("FATF") member jurisidiction.
      </p>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
      In which country is the bank branch that the subscriber will send wires from? Select below.
      </p>

      <div className="">
        <div className="">
          <label className="text-[16px]  block font-semibold">Country / Territory</label>
        
         <select
                  required
                  ref={countrySelector}
                  value={data?.fatf_check}
                  onChange={(e) =>
                      setData((prevState) => ({
                          ...prevState,
                          fatf_check: e.target.value,
                      }))
                  }
                  data-type={"number"}
                  name="fatf_check"
                  className="h-[51px] w-[453px] border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100 p-2"
              >
                  {countryOptions.map(countryOption => (
                      <option key={countryOption.value} value={countryOption.value}> {countryOption.flag} {countryOption.label}</option>))}
              </select>
        </div>
      </div>
    </div>
  );
}

export default FATFCheck