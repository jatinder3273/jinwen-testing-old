


import Radio from "@/components/theme/radio";
import React from "react";
import { useStepData } from "../../stepper/UseStepData";

export const JointOwnershipType = () => {
  const { data, setData } = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Joint Ownership Type
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        What system of asset ownership do you and your co-subscriber employ?
      </p>

      {[
        { value: 1, label: "Joint Tenants with Right of Survivorship" },
        { value: 2, label: "Tenants in Common" },
        { value: 3, label: "Community Property" },
        { value: 4, label: "Tenancy by the Entirety" },
      ].map((option) => (
        <div
          key={option.value}
          className={`p-4 mb-4 border  ${
            +data?.joint_ownership_type === option.value
              ? "border-[#3190E6] bg-[#3190E60F]"
              : "border-[#DCE1E6] bg-[#FCFAFA]"
          }`}
        >
          <Radio
            required
            name="joint_ownership_type"
            value={option.value}
            checked={+data?.joint_ownership_type === option.value}
            label={option.label}
            onChange={(e) => 
              setData((prevState) => ({
                ...prevState,
                joint_ownership_type: parseInt(e.target.value),
              }))
            }
          />
        </div>
      ))}
    </div>
  );
};

export default JointOwnershipType;
