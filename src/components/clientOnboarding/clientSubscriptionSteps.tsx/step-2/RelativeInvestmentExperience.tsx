

"use client";

import Radio from '@/components/theme/radio';
import React from 'react';
import { useStepData } from '../../stepper/UseStepData';

const RelativeInvestmentExperience = () => {
  const { data, setData } = useStepData();

  const isCheck = data?.is_relative_investment === true || data?.is_relative_investment === "true";
  
  

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Relative Investment Amount
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        Is the intended subscription amount less than 10% of the Subscriber's net worth?
      </p>

      <div className="flex justify-between">
       
        <div className="bg-[#FCFAFA] p-4  h-[51] w-full py-2 border border-[#DCE1E6]">
          <Radio
            name="is_relative_investment"
      
            checked={isCheck}

      
            value="true" 
            required
            label="Yes"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                is_relative_investment: true, 
              }))
            }
          />
        </div>

     
        <div className="bg-[#FCFAFA] p-4 py-2  h-[51] w-full ms-2 border border-[#DCE1E6]">
          <Radio
            name="is_relative_investment"
         
             
            checked={!isCheck}

         
            value="false" 
            required
            label="No"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                is_relative_investment:false, 
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default RelativeInvestmentExperience;
