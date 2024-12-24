import React, {ReactElement, useState, ChangeEvent, FormEvent, useContext} from "react";
import {StepperContext} from "@/components/clientOnboarding/context/StepperContext";
import useFetch from "@/hooks/useFetch";
import {toast} from "sonner";
import {StepPayload} from "@/components/clientOnboarding/objects/StepPayload";
import moment from "moment";

interface FormStepProps {
    stepIdx: number;
    subStepIdx: number;
    initialState: any;
    children: ReactElement;
    onNextStep: (stepIdx: number, subStepIdx: number) => void;
    onPreviousStep?: (stepIdx: number, subStepIdx: number) => void;
}

export const FormStep: React.FC<FormStepProps> = ({
                                                      stepIdx,
                                                      subStepIdx,
                                                      initialState,
                                                      children,
                                                      onNextStep,
                                                      onPreviousStep,
                                                  }) => {
    const [formData, setFormData] = useState<any>(initialState);
    const stepperState = useContext(StepperContext);


   
    const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
        const {name, value, dataset} = e.target;
        const isNumber = dataset.isNumber;
        console.log("change ", name, "  is number: ", dataset)
        setFormData((prevData) => ({
            ...prevData,
            [name]: formatInput(dataset, value),
        }));
    };

    const formatInput = (dataset: any, value: any) => {
        switch (dataset.type) {
            case "number":
                return +value;
            case "date":
                if (dataset.format) {
                    const format = dataset.format;
                    return moment(value).format(format);
                }
                return value;
            case "file":
                return dataset.fileUrl;
            default:
                return value;
        }
    }


    const [addUpdateSubscriptionDetailApi, { loading, error }] = useFetch(
        `/investor/add-update-subscription-detail`,
        {
            method: "POST",
        }
    );

    const addUpdate = async (values: StepPayload) => {
        try {
            const payload = { ...values, step: stepIdx+1 };
            console.log("submitting: ", values)
            const res = await addUpdateSubscriptionDetailApi(payload);

            if (res.status) {
                toast.success(res.message || "Submitted successfully");
            } else {
                toast.error(res.message || "Submission failed");
            }
        } catch (err) {
            toast.error("API call failed");
        }
    };

    const existingData = () => {
        const stepData = stepperState.data.get(stepIdx);
        return stepData?stepData[subStepIdx]:undefined;
    };

 
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData && Object.keys(formData).length > 0) {
            submitData()
        } else if (!existingData()) {
            submitData()
        }
        onNextStep(stepIdx, subStepIdx);
    };

    const submitData = () => {
        stepperState.setData(stepIdx, subStepIdx, formData)
        console.log("Form Data:", formData);
      
        addUpdate(formData);
    }

    return (
        <div className="">
            <form id={`form-step`} onSubmit={handleSubmit} onChange={handleFormChange}>
                {children}
            </form>
        </div>
    );
}
