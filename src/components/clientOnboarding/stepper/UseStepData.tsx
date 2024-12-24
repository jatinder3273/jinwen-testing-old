// import {useContext, useEffect, useState} from "react";
// import {StepperContext} from "@/components/clientOnboarding/context/StepperContext";

// export const useStepData = () => {
//     const stepperState = useContext(StepperContext);
//     const [data, setData] = useState<any>();
//     useEffect(() => {
//         const stepData = stepperState.data.get(stepperState.currentStepIdx)[stepperState.currentSubStepIdx];
//         console.log("step changed: ", stepperState.currentStepIdx, stepperState.currentSubStepIdx, stepData)
//         if (stepData) {
//             setData(stepData)
//         }
//     }, [stepperState.currentStepIdx, stepperState.currentSubStepIdx]);

//     return {data, setData};
// }

import { useContext, useEffect, useState } from "react";
import { StepperContext } from "@/components/clientOnboarding/context/StepperContext";

export const useStepData = () => {
  const stepperState = useContext(StepperContext);
  const [data, setData] = useState<any>(null); 

  useEffect(() => {
    if (!stepperState?.data) {
      console.warn("StepperContext data is undefined or null");
      return;
    }

    const stepData = stepperState.data.get(stepperState.currentStepIdx)?.[stepperState.currentSubStepIdx];

    console.log(
      "Step changed: ",
      stepperState.currentStepIdx,
      stepperState.currentSubStepIdx,
      stepData
    );

    if (stepData) {
      setData(stepData);
    } else {
      setData(null); 
    }
  }, [stepperState?.currentStepIdx, stepperState?.currentSubStepIdx]);

  return { data, setData };
};
