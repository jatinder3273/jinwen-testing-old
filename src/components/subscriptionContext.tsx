// 'use client'

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Step_1 } from "./clientOnboarding/objects/objects";

// interface Step {
//   name: string;
//   isActive: boolean;
//   isCompleted: boolean;
//   component: React.ComponentType<any>;
// }

// interface SubscriptionContextType {
//   steps: Step[];
//   currentStepIndex: number;
//   setActiveStep: (index: number) => void;
//   markStepCompleted: (index: number) => void;
//   goToNextStep: () => void;
//   goToPreviousStep: () => void;
// }

// const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [steps, setSteps] = useState<Step[]>(Step_1);


//   const { currentStepIndex } = useSubscription();

// useEffect(() => {
//   console.log("Current step index: ", currentStepIndex);
// }, [currentStepIndex]); // Run this whenever `currentStepIndex` changes

//   const setActiveStep = (index: number) => {
   
//     setSteps((prevSteps) =>
//       prevSteps.map((step, i) => ({
//         ...step,
//         isActive: i === index,
//       }))
//     );
//   };

//   const markStepCompleted = (index: number) => {
//     setSteps((prevSteps) =>
//       prevSteps.map((step, i) => ({
//         ...step,
//         isCompleted: i === index ? true : step.isCompleted,
//       }))
//     );
//   };

//   const goToNextStep = () => {
//     if (currentStepIndex < steps.length - 1) {
//       setActiveStep(currentStepIndex + 1);
//     }
//   };

//   const goToPreviousStep = () => {
//     if (currentStepIndex > 0) {
//       setActiveStep(currentStepIndex - 1);
//     }
//   };

 
//   useEffect(() => {
//     console.log("Active step:", steps[currentStepIndex].name); // Log the active step name
//   }, [currentStepIndex, steps]); // Runs every time currentStepIndex changes

//   return (
//     <SubscriptionContext.Provider value={{
//       steps,
//       currentStepIndex,
//       setActiveStep,
//       markStepCompleted,
//       goToNextStep,
//       goToPreviousStep
//     }}>
//       {children}
//     </SubscriptionContext.Provider>
//   );
// };

// export const useSubscription = () => {
//   const context = useContext(SubscriptionContext);
//   if (!context) {
//     throw new Error("useSubscription must be used within a SubscriptionProvider");
//   }
//   return context;
// };
