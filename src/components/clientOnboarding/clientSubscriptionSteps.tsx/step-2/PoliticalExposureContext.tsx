
'use-client'
import React, {useEffect, useRef} from "react";
import CustomButton from "@/components/theme/customButton";
import { useStepData } from "../../stepper/UseStepData";
import SelectField from "@/components/theme/select";


const countryOptions = [
  { label: "United States", value: 1, flag: "🇺🇸" },
];

const PoliticalExposureContext = () => {
  const { data, setData } = useStepData();

  const countrySelector = useRef<HTMLSelectElement>(null);

 


  useEffect(() => {
    if (countrySelector.current && (!data || !data.political_exposure_context)) {
        console.log("auto selecting country")
        countrySelector.current.value = '1';
        const event = new Event('change', { bubbles: true });
        countrySelector.current.dispatchEvent(event);
    } else if (data && countrySelector.current) {
        console.log("citizenship: ", countrySelector?data.political_exposure_context:"hah")
    } else {
        console.log(data?"element unavailable":"data unavailable")
    }
}, [countrySelector, data]);

 
  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
      Political Exposure Context
      </h2>
      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
      List the country for which there is PEP exposure
      </p>

      <div className="">
        <div className="">
          <label className="text-[16px]  block font-semibold">Country / Territory</label>
         
         <select
                  required
                  title="select"
                  ref={countrySelector}
                  value={data?.political_exposure_context}
                  onChange={(e) =>
                      setData((prevState) => ({
                          ...prevState,
                          political_exposure_context: parseInt(e.target.value),
                      }))
                  }
                  data-type={"number"}
                  name="political_exposure_context"
                  className="h-[51px] w-[453px] mt-2  border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100 p-2"
              >
                  {countryOptions.map(countryOption => (
                      <option key={countryOption.value} value={countryOption.value}> {countryOption.flag} {countryOption.label}</option>))}
              </select>
         
        </div>
      </div>
    </div>
  );
};

export default PoliticalExposureContext;