

"use client";

import Radio from '@/components/theme/radio';
import React from 'react';
import { useStepData } from '../../stepper/UseStepData';

const PlacementAgent = () => {
  const { data, setData } = useStepData();

  const isCheck = data?.placement_agent_check === true || data?.placement_agent_check === "true";

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Placement Agent Check
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        Was the Subscriber referred to the Fund by a placement agent?
      </p>

      <div className="flex justify-between gap-[18px]">
        {/* Yes Option */}
      <div
          className={`p-4 py-2 w-full h-[51px] border ${
            isCheck ? "border-[#3190E6] bg-[#3190E60F]" : "border-[#DCE1E6] bg-[#FCFAFA]"
          }`}
        >
          <Radio
            name="placement_agent_check"
            checked={isCheck}

            value="true"
            required
            label="Yes"
            onChange={() =>
              setData((prevState) => ({
                ...prevState,
                placement_agent_check: true,
              }))
            }
          />
        </div>

        {/* No Option */}
        <div  className={`p-4 py-2 w-full h-[51px] border ${
            !isCheck ? "border-[#3190E6] bg-[#3190E60F]" : "border-[#DCE1E6] bg-[#FCFAFA]"
          }`}>
          <Radio
            name="placement_agent_check"
            checked={!isCheck}

            value="false"
            required
            label="No"
            onChange={() =>
              setData((prevState) => ({
                ...prevState,
                placement_agent_check: false ,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PlacementAgent;
