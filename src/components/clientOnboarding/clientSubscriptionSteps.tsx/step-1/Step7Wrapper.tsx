import {useContext} from "react";
import {StepperContext} from "@/components/clientOnboarding/context/StepperContext";
import BenefitPlanType from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/BenefitPlanType";
import JointOwnershipType from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/JointOwnershipType";
import SubscriptionProcessNotice
    from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/SubscriptionProcessNotice";
import Address from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/Address";

export const Step7Wrapper = (props: {}) => {
    const stepperState = useContext(StepperContext);

    const renderStep = (subscriptionType: string) => {
        switch (subscriptionType.toString()) {
            case '1':
                return <BenefitPlanType />
            case '2':
                return <JointOwnershipType />
            case '3':
                return <SubscriptionProcessNotice />
            case '4':
            default:
                return <Address />

        }
    }
    return renderStep(stepperState.data.get(0)[stepperState.currentSubStepIdx-1].subscription_type);
}