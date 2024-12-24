
"use client";

import Radio from '@/components/theme/radio';
import React from 'react';
import { useStepData } from '../../stepper/UseStepData';

const PriorFundInvestment = () => {
  const { data, setData } = useStepData();
  const isCheck = data?.is_prior_fund_investment === true || data?.is_prior_fund_investment === "true";

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Prior Fund Investments
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        Has the subscriber previously invested in other private funds, private companies, and/or other non-marketable or restricted securities?
      </p>

      <div className="flex justify-between gap-[18px]">
        <div
          className={`h-[51px] p-4 w-full py-2 border ${
            isCheck ? 'border-[#3190E6] bg-[#3190E60F]' : 'border-[#DCE1E6] bg-[#FCFAFA]'
          }`}
        >
          <Radio
            name="is_prior_fund_investment"
            checked={isCheck}
            value="true"
            required
            label="Yes"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                is_prior_fund_investment: true,
              }))
            }
          />
        </div>

        <div
          className={`h-[51px] p-4 w-full py-2   border ${
            !isCheck ? 'border-[#3190E6] bg-[#3190E60F]' : 'border-[#DCE1E6] bg-[#FCFAFA]'
          }`}
        >
          <Radio
            name="is_prior_fund_investment"
            value="false"
            checked={!isCheck}
            required
            label="No"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                is_prior_fund_investment: false,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PriorFundInvestment;
