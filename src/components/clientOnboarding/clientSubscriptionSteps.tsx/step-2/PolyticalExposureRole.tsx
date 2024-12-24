'use-client'
import InputField from '@/components/theme/input';
import React from 'react'
import { useStepData } from '../../stepper/UseStepData';

const PolyticalExposureRole = () => {
    const {data, setData} = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
      Political Exposure Role
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
      What is the position/role held by that such person within that country's government/legislative/military branch?
      </p>

      <InputField
        required
        className=" bg-[#FCFAFA]"
        value={data?.political_exposure_role	}
        onChange={(evt)=> {setData(prevState=> {
          const dataCopy = {...prevState};
          dataCopy["political_exposure_role"] = evt.target.value;
          return dataCopy;
        })}}
        placeholder="e.g. 1,000,000"
      
        name="political_exposure_role"
      
        type="text" 
        inputMode="numeric" 
       
        noRadius
        style={{
          appearance: "none",
        }}
      />

      
    </div>
  )
}

export default PolyticalExposureRole
