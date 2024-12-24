

"use client";

import Radio from '@/components/theme/radio';
import React from 'react';
import { useStepData } from '../../stepper/UseStepData';

const RiskConsent = () => {
  const { data, setData } = useStepData();

  const isCheck = data?.is_risk_consent === true || data?.is_risk_consent === "true";

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Risk Consent
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        Is the Subscriber able to bear the economic risk of this investment, including a partial or total loss of capital invested into the Fund?
      </p>

      <div className="flex justify-between gap-[18px]">
        <div
          className={`p-4 text-center w-full h-[51px] py-2 border ${
            isCheck ? 'border-[#3190E6] bg-[#3190E60F]' : 'border-[#DCE1E6] bg-[#FCFAFA] '
          }`}
        >
          <Radio
            name="is_risk_consent"
            checked={isCheck}
            value="true"
            required
            label="Yes"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                is_risk_consent: true,
              }))
            }
          />
        </div>

        <div
          className={`p-4 text-center py-2 w-full h-[51px]  border ${
            !isCheck ? 'border-[#3190E6] bg-[#3190E60F]' : 'border-[#DCE1E6] bg-[#FCFAFA] '
          }`}
        >
          <Radio
            name="is_risk_consent"
            checked={!isCheck}
            value="false"
            required
            label="No"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                is_risk_consent: false,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default RiskConsent;
