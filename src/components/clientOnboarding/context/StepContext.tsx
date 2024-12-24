'use client'
import React, {Context, createContext, useState} from "react";

interface StepState {
    currentStepIdx: number,
    setActiveStep?: (idx: number)=> void,
    data: any[],
    setData?: (subStepIdx: number, data: any) => void
}
export const StepContext: Context<StepState> = createContext({currentStepIdx: 0, data: [], });

export const StepProvider = (props: {children: any}) => {
    const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);

    const handleStepData = (subStepIdx: number, data: any) => {
        setData((prevState)=> {
            if (prevState.length >= subStepIdx) {
                prevState[subStepIdx] = data;
            } else {
                prevState.push(data);
            }

            return prevState
        })
    }
    return <StepContext.Provider value={{currentStepIdx: currentStepIdx, setActiveStep: setCurrentStepIdx, data: data, setData: handleStepData}}></StepContext.Provider>
}