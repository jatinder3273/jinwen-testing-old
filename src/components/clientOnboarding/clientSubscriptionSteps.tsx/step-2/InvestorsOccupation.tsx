'use-client'
import InputField from '@/components/theme/input';
import React from 'react'
import { useStepData } from '../../stepper/UseStepData';

const InvestorsOccupation = () => {
  const { data, setData } = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
      Investor’s Occupation
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
      What is the primary occupation of the subscriber?
      </p>

      <div className="">
        <div className="">
          <InputField
            onChange={(e) =>
              setData((prevState) => {
                const dataCopy = { ...prevState };
                dataCopy["investor_occupation"] = e.target.value;
                return dataCopy;
              })
            }
            required
            value={data?.investor_occupation}
            name="investor_occupation"
            placeholder="Partner, Investment Banking"
            className="h-[51px] border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100"
          />
        </div>
      </div>
    </div>
  );
}

export default InvestorsOccupation
