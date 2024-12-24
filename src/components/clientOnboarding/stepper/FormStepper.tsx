import React, {ReactElement, useContext} from "react";
import { StepItem } from "./StepItem";
import styles from  "../../../styles/form_stepper.module.scss";
import {StepperContext} from "@/components/clientOnboarding/context/StepperContext";


export interface Step {
    id: string,
    name: string,
    icon?: string,
    label?:string,
    subSteps: SubStep[]
}
export interface SubStep {
    id: string,
    name: string,
    skip?: boolean,
    element: ReactElement
}


interface FormStepperProps {
    steps: Step[],
    onStepChange: (step: Step, idx: number)=> void
}
export const FormStepper = (props: FormStepperProps) => {

    const stepperState = useContext(StepperContext)





    const hasData = (stepIdx: number) => {
        const stepData = stepperState.data.get(stepIdx);
        if (stepData) {
            return stepData.length >= 0;
        } else {
            return false
        }
    }
    const handleStepClick = (step: Step, idx: number) => {

       console.log('dhvfdf',step,idx)
        props.onStepChange(step, idx);
      };

    return <div className={styles.stepper}>
        {props.steps.map((step, idx) => <StepItem step={step}    onClick={() => {if (stepperState.data.get(idx) && idx !== stepperState.currentStepIdx) { handleStepClick(step, idx) }}}  key={step.id} active={idx === stepperState.currentStepIdx} completed={stepperState.stepsCompleted.has(idx)}
                                                  hasData={hasData(idx)} className={`${styles.step} ${stepperState.currentStepIdx === idx ? styles.active : stepperState.stepsCompleted.has(idx) ? styles.completed : stepperState.data.has(idx)?styles.active:''}`}
        notLast={idx < props.steps.length - 1}/>)}



    </div>
}



