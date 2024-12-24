import Radio from "@/components/theme/radio";

import React from "react";
import { useStepData } from "../../stepper/UseStepData";


export const JointOwnershipType = () => {
  const {data, setData} = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
     <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Joint Ownership Type
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        What system of asset ownership do you and your co-subscriber employ?
      </p>

      <div className="bg-[#FCFAFA] p-4 mb-4 border border-[#DCE1E6]">
        <Radio
          required
          name="joint_ownership_type"
          value={1}
          checked={(+data?.joint_ownership_type) === 1}
          label="Joint Tenants with Right of Survivorship"
          onChange={(e) => setData(prevState=> {
            const dataCopy = {...prevState};
            dataCopy["joint_ownership_type"] = parseInt(e.target.value);
            return dataCopy;
          })}
        />
      </div>
      <div className="bg-[#FCFAFA] p-4 mb-4 border border-[#DCE1E6]">
        <Radio
          required
          name="joint_ownership_type"
          checked={(+data?.joint_ownership_type) === 2}
          value={2}
          label="Tenants in Common"
          onChange={(e) => setData(prevState=> {
            const dataCopy = {...prevState};
            dataCopy["joint_ownership_type"] = parseInt(e.target.value);
            return dataCopy;
          })}
        />
      </div>
      <div className="bg-[#FCFAFA] p-4 mb-4 border border-[#DCE1E6]">
        <Radio
          required
          name="joint_ownership_type"
          checked={(+data?.joint_ownership_type) === 3}
          value={3}
          label="Community Property"
          onChange={(e) => setData(prevState=> {
            const dataCopy = {...prevState};
            dataCopy["joint_ownership_type"] = parseInt(e.target.value);
            return dataCopy;
          })}
        />
      </div>
      <div className="bg-[#FCFAFA] p-4  border border-[#DCE1E6]">
        <Radio
          required
          name="joint_ownership_type"
          checked={(+data?.joint_ownership_type) === 4}
          value={4}
          label="Tenancy by the Entirety"
          onChange={(e) => setData(prevState=> {
            const dataCopy = {...prevState};
            dataCopy["joint_ownership_type"] = parseInt(e.target.value);
            return dataCopy;
          })}
        />
      </div>

     
    </div>
  );
};

export default JointOwnershipType;
