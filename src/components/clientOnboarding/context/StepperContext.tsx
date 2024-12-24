'use client';
import React, {Context, createContext, useState} from "react";
import {Step, SubStep} from "@/components/clientOnboarding/stepper/FormStepper";

import {bool} from "yup";
import { stepsProvider } from "./StepsProvider";

interface StepperState {
    currentStepIdx: number;
    currentSubStepIdx: number;
    setActiveStep?: (stepIdx: number, subStepIdx: number, goingForward?: boolean) => void;
    data: Map<number, any[]>;
    stepsCompleted: Set<number>;
    steps: Step[];
    setData?: (stepIdx: number, subStepIdx: number, data: any) => void;
    setStepCompleted?: (stepIdx: number) => void;
    updateSubStep?: (stepIdx: number, subStepIdx: number, data: any)=> void
}

export const StepperContext: Context<StepperState> = createContext<StepperState>({
    currentStepIdx: 0,
    currentSubStepIdx: 0,
    data: new Map(),
    stepsCompleted: new Set<number>(),
    steps: []
});

export const StepperProvider = ({ children }: { children: React.ReactNode }) => {
    const onNextStep = (stepIdx: number, subStepIdx: number) => {
        console.log("Step Completed");
        if (subStepIdx >= steps[stepIdx].subSteps.length - 1) {
            if (stepIdx >= steps.length - 1) {
            } else {
                onSetStep(stepIdx + 1, 0, true);
                setStepCompleted(stepIdx);
            }
        } else {
            onSetStep(stepIdx, subStepIdx + 1, true);
        }
    };


    const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
    const [currentSubStepIdx, setCurrentSubStepIdx] = useState<number>(0);
    const [data, setDataState] = useState<Map<number, any[]>>(new Map());
    const [steps, setSteps] = useState<Step[]>(stepsProvider(onNextStep));
    const [stepsCompleted, setStepsCompleted] = useState<Set<number>>(new Set());


    const handleStepData = (stepIdx: number, subStepIdx: number, data: any) => {
        setDataState((prevState) => {
            const newState = new Map(prevState); 
            if (!newState.has(stepIdx)) {
                newState.set(stepIdx, []);
            }
            const stepData = [...(newState.get(stepIdx)||[])];
            if (subStepIdx < stepData.length) {
                stepData[subStepIdx] = {...stepData[subStepIdx], ...data}
            } else
                stepData[subStepIdx] = data;
            newState.set(stepIdx, stepData);
            return newState;
        });
    };

    const onSetStep = (stepIdx: number, subStepIdx: number, goingForward?: boolean) => {
        console.log("changing step", stepIdx, subStepIdx);
        const subStep = steps[stepIdx].subSteps[subStepIdx];
        setCurrentStepIdx(stepIdx);
        setCurrentSubStepIdx(subStep.skip?subStepIdx+(goingForward?1:-1):subStepIdx);
    };

    const updateSubStep = (stepIdx: number, subStepIdx: number, data: SubStep) => {
        console.log("Updating step: ", stepIdx, "|", subStepIdx)
        setSteps(prevState=> {
            let steps = [...prevState];
            steps[stepIdx].subSteps[subStepIdx] = {...steps[stepIdx].subSteps[subStepIdx], ...data};
            return steps;
        })
    }

    const setStepCompleted = (idx: number) => {
        setStepsCompleted((prevState)=> {
            const _completedSteps = new Set<number>(prevState);
            _completedSteps.add(idx);
            return _completedSteps;
        })
    }

    return (
        <StepperContext.Provider
            value={{
                currentStepIdx,
                currentSubStepIdx,
                stepsCompleted: stepsCompleted,
                setActiveStep: onSetStep,
                steps: steps,
                data: data,
                updateSubStep: updateSubStep,
                setStepCompleted: setStepCompleted,
                setData: handleStepData,
            }}
        >
            {children}
        </StepperContext.Provider>
    );
};


