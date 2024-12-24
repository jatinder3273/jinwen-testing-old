import InputField from "@/components/theme/input";
import React from "react";
import { useStepData } from "../../stepper/UseStepData";

const PlacementAgentName = () => {
  const { data, setData } = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Placement Agent Name
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
        Provide the name of the referring placement agent:
      </p>

      <div className="mt-8">
        <div className="mb-2">
          <InputField
            onChange={(e) =>
              setData((prevState) => {
                const dataCopy = { ...prevState };
                dataCopy["placement_agent_name"] = e.target.value;
                return dataCopy;
              })
            }
            required
            value={data?.placement_agent_name}
            name="placement_agent_name"
            placeholder="e.g. name"
            className="h-[51px] border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PlacementAgentName;
