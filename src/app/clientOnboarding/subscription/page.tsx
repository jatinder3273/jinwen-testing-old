
import { StepperProvider } from "@/components/clientOnboarding/context/StepperContext";
import Form from "@/components/clientOnboarding/Form";
import { Step } from "@/components/clientOnboarding/stepper/FormStepper";

const Page = () => {
  const handleStepChange = (step: Step, idx: number) => {
    console.log("Current Step:", step.name, "Index:", idx);
  };
  return (
   

    <div><StepperProvider><Form  /></StepperProvider></div>
  );
};

export default Page;
