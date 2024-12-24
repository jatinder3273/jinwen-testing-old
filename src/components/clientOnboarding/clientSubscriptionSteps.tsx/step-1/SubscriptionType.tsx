


import React, {useContext} from "react";
import Radio from "@/components/theme/radio";

import { useStepData } from "../../stepper/UseStepData";
import {StepperContext} from "@/components/clientOnboarding/context/StepperContext";
export const getSubscriptionTypeDependentStepName = (type: string) => {
    console.log("type: ", type)
    switch (type) {
        case '1':
            return "Benefits and Plans";
        case '2':
            return "Joint Ownership Type";
        case '3':
            return "Subscription Process Notice";
        default:
            return "unknown";
    }
}
export const SubscriptionType = () => {
    const stepperState = useContext(StepperContext)
  const { data, setData } = useStepData();
  return (
    <div className="flex flex-col text-left">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Subscription Type
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        Select the type of subscription you are making.
      </p>

      {[
        {
          value: 1,
          label: "Investing through a benefit plan",
          description:
            "You will invest via (i) a self-directed IRA, SEP, Keogh, or other similar plan; (ii) an employee benefit plan such as a 401(k); or a (iii) deferred compensation plan such as a 457(b).",
        },
        {
          value: 2,
          label: "Joint investment with a spouse",
          description:
            "You will co-subscribe with a legal spouse or spousal equivalent as, for example, tenants in common, joint tenants, community property, etc.",
        },
        {
          value: 3,
          label: "An authorized representative will subscribe for me.",
          description:
            "A legally authorized person or entity such as a lawyer, law firm, or other power-of-attorney holder, will act directly on my behalf. Do not select this option if you have counsel that will merely assist you in completing this subscription.",
        },
        {
          value: 4,
          label: "None of the above - I am investing myself (most common)",
          description:
            "I am investing in my own capacity without utilization of a benefit plan, authorized representative, or joint investment.",
        },
      ].map((option) => (
        <div
          key={option.value}
          className="bg-[#FCFAFA] p-4 mt-4  border border-[#DCE1E6] rounded-md overflow-hidden"
        >
          <Radio
            required
            checked={+data?.subscription_type === option.value}
            name="subscription_type"
            onChange={(e) =>
              {
                  setData((prevData) => ({
                      ...prevData,
                      subscription_type: parseInt(e.target.value ),
                  }));
                  if (e.target.value !== '4')
                    stepperState.updateSubStep(stepperState.currentStepIdx, stepperState.currentSubStepIdx+1, {skip: false, name: getSubscriptionTypeDependentStepName(e.target.value)});
                  else
                    stepperState.updateSubStep(stepperState.currentStepIdx, stepperState.currentSubStepIdx+1, {skip: true, name: getSubscriptionTypeDependentStepName(e.target.value)})
              }
            }
            value={option.value}
            label={option.label}
            description={option.description}
          />
        </div>
      ))}

     
    </div>
  );
};

export default SubscriptionType;

