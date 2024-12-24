"use-client";
import Radio from "@/components/theme/radio";
import React from "react";
import { useStepData } from "../../stepper/UseStepData";

const BadActorCheck = () => {
  const { data, setData } = useStepData();

  const isCheck = data?.bad_actor_check === true || data?.bad_actor_check === "true";


  return (
    <div className="flex flex-col text-left flex-wrap">
       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Bad Actor Check
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
        Has the Subscriber (or any person who would beneficially own, through
        the Subscriber, a 20%+ interest in the Fund) experienced any "bad actor"
        disqualifying event, as described in Rule 506(d)(1) of Regulation D,
        within the last 10 years?
      </p>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        <strong className="font-bold">Notice:</strong>  Ensure you select "No" if the Subscriber has not experienced any disqualifying event
        </p>


      <div className="flex justify-between">
        <div className="bg-[#FCFAFA] p-4 py-2 w-full h-[51] border border-[#DCE1E6]">
          <Radio
            name="bad_actor_check"
            // checked={+data?.bad_actor_check === 1}
            checked={isCheck}

            value="true"
            required
            label="Yes"
            onChange={(e) =>
             
                setData((prevState) => ({
                  ...prevState,
                  bad_actor_check: true, 
                }))
              
              
            }
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 py-2  h-[51] w-full ms-2 border border-[#DCE1E6]">
          <Radio
            required
            name="bad_actor_check"
            // checked={+data?.bad_actor_check === 0}
            checked={!isCheck}

            value="false"
            label="No"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                bad_actor_check:false, 
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BadActorCheck;
