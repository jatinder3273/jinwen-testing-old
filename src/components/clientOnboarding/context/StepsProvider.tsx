import {Step} from "@/components/clientOnboarding/stepper/FormStepper";
import {FormStep} from "@/components/clientOnboarding/stepper/FormStep";
import OfferingSummary from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/OfferingSummary";
import InvestorType from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/InvestorType";
import SubscriptionAmount from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/SubscriptionAmount";
import Personhood from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/U.S.Personhood";
import SubscriberName from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/ SubscriberName";
import SubscriptionType from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/SubscriptionType";
import Address from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/Address";
import DateOfBirth from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/DateOfBirth";
import Citizenship from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/Citizenship";
import SSNTIN from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/SSNTIN";
import PhoneNumber from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/PhoneNumber";
import React from "react";
import {Step7Wrapper} from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/Step7Wrapper";
import FATFCheck from "../clientSubscriptionSteps.tsx/step-2/FATFCheck";
import PolyticalExposureRole from "../clientSubscriptionSteps.tsx/step-2/PolyticalExposureRole";
import PoliticalExposureContext from "../clientSubscriptionSteps.tsx/step-2/PoliticalExposureContext";
import PoliticallyExposedPersonCheck from "../clientSubscriptionSteps.tsx/step-2/PoliticallyExposedPersonCheck";
import BadActorCheck from "../clientSubscriptionSteps.tsx/step-2/BadActorCheck";
import PriorFundInvestment from "../clientSubscriptionSteps.tsx/step-2/PriorFundInvestment";
import RiskConsent from "../clientSubscriptionSteps.tsx/step-2/RiskConsent";
import RelativeInvestmentExperience from "../clientSubscriptionSteps.tsx/step-2/RelativeInvestmentExperience";
import InvestorsOccupation from "../clientSubscriptionSteps.tsx/step-2/InvestorsOccupation";
import PlacementAgentName from "../clientSubscriptionSteps.tsx/step-2/PlacementAgentName";
import PlacementAgent from "../clientSubscriptionSteps.tsx/step-2/PlacementAgent";
import QualifiedPurchaser from "../clientSubscriptionSteps.tsx/step-2/QualifiedPurchaser";
import QualifiedClient from "../clientSubscriptionSteps.tsx/step-2/QualifiedClient";
import AccreditationStatus from "../clientSubscriptionSteps.tsx/step-2/AccreditationStatus";
import FormW9W8 from "../clientSubscriptionSteps.tsx/step-3/FormW9W8";
import ParallelMarkets from "../clientSubscriptionSteps.tsx/step-3/ParallelMarkets";
import ProofOfId from "../clientSubscriptionSteps.tsx/step-3/ProofOfId";
import Review from "../clientSubscriptionSteps.tsx/step-4/Review";

export const stepsProvider = (onNextStep: (stepIdx: number, subStepIdx: number) => void) => {
    const _steps: Step[] = [
        {
            name: "General Subscription Info",
            label : "STEP 1",
            id: "step_a",
            subSteps: [
                {
                    id: "step_a|1",
                    name: "Offering Summary",
                    element: (
                        <FormStep key={`step_a|1`} stepIdx={0} subStepIdx={0} initialState={{}} onNextStep={onNextStep}>
                            <OfferingSummary />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|2",
                    name: "Investor Type",
                    element: (
                        <FormStep key={`step_a|2`} stepIdx={0} subStepIdx={1} initialState={{}} onNextStep={onNextStep}>
                            <InvestorType />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|3",
                    name: "Subscription Amount",
                    element: (
                        <FormStep key={`step_a|3`} stepIdx={0} subStepIdx={2} onNextStep={onNextStep} initialState={{}}>
                            <SubscriptionAmount />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|4",
                    name: "U.S. Personhood",
                    element: (
                        <FormStep key={`step_a|4`} stepIdx={0} subStepIdx={3} onNextStep={onNextStep} initialState={{}}>
                            <Personhood />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|5",
                    name: "Subscriber Name",
                    element: (
                        <FormStep key={`step_a|5`} stepIdx={0} subStepIdx={4} onNextStep={onNextStep} initialState={{}}>
                            <SubscriberName />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|6",
                    name: "Subscription Type",
                    element: (
                        <FormStep key={`step_a|6`} stepIdx={0} subStepIdx={5} onNextStep={onNextStep} initialState={{}}>
                            <SubscriptionType />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|x",
                    name: "{step_name}",
                    skip: true,
                    element: (
                        <FormStep key={`step_a|x`} stepIdx={0} subStepIdx={6} onNextStep={onNextStep} initialState={{}}>
                            <Step7Wrapper />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|7",
                    name: "Address",
                    element: (
                        <FormStep key={`step_a|7`} stepIdx={0} subStepIdx={7} onNextStep={onNextStep} initialState={{}}>
                            <Address />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|8",
                    name: "Date & Place of Birth",
                    element: (
                        <FormStep key={`step_a|8`} stepIdx={0} subStepIdx={8} onNextStep={onNextStep} initialState={{}}>
                            <DateOfBirth />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|9",
                    name: "Citizenship",
                    element: (
                        <FormStep key={`step_a|9`} stepIdx={0} subStepIdx={9} onNextStep={onNextStep} initialState={{}}>
                            <Citizenship />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|10",
                    name: "SSN/TIN",
                    element: (
                        <FormStep key={`step_a|10`} stepIdx={0} subStepIdx={10} onNextStep={onNextStep} initialState={{}}>
                            <SSNTIN />
                        </FormStep>
                    ),
                },
                {
                    id: "step_a|11",
                    name: "Phone Number",
                    element: (
                        <FormStep key={`step_a|11`} stepIdx={0} subStepIdx={11} onNextStep={onNextStep} initialState={{}}>
                            <PhoneNumber />
                        </FormStep>
                    ),
                }
            ],
        },
        {
            name: "Suitability Questions",
            label : "STEP 2",
            id: "step_b",
            subSteps: [
                {
                    id: "step_b|1",
                    name: "Accreditation Status",
                    element: (
                        <FormStep key={`step_b|1`} stepIdx={1} subStepIdx={0} initialState={{}} onNextStep={onNextStep}>
                            <AccreditationStatus />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|2",
                    name: "Qualified Client",
                    element: (
                        <FormStep key={`step_b|2`} stepIdx={1} subStepIdx={1} initialState={{}} onNextStep={onNextStep}>
                            <QualifiedClient />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|3",
                    name: "Qualified Purchaser",
                    element: (
                        <FormStep key={`step_b|3`} stepIdx={1} subStepIdx={2} initialState={{}} onNextStep={onNextStep}>
                            <QualifiedPurchaser />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|4",
                    name: "Placement Agent Check",
                    element: (
                        <FormStep key={`step_b|4`} stepIdx={1} subStepIdx={3} initialState={{}} onNextStep={onNextStep}>
                            <PlacementAgent />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|5",
                    name: "Placement Agent",
                    element: (
                        <FormStep key={`step_b|5`} stepIdx={1} subStepIdx={4} initialState={{}} onNextStep={onNextStep}>
                            <PlacementAgentName />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|6",
                    name: "Investor's Occupation",
                    element: (
                        <FormStep key={`step_b|6`} stepIdx={1} subStepIdx={5} initialState={{}} onNextStep={onNextStep}>
                            <InvestorsOccupation />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|7",
                    name: "Relative Investment Experience",
                    element: (
                        <FormStep key={`step_b|7`} stepIdx={1} subStepIdx={6} initialState={{}} onNextStep={onNextStep}>
                            <RelativeInvestmentExperience />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|8",
                    name: "Risk Consent",
                    element: (
                        <FormStep key={`step_b|8`} stepIdx={1} subStepIdx={7} initialState={{}} onNextStep={onNextStep}>
                            <RiskConsent />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|9",
                    name: "Prior Fund Investment",
                    element: (
                        <FormStep key={`step_b|9`} stepIdx={1} subStepIdx={8} initialState={{}} onNextStep={onNextStep}>
                            <PriorFundInvestment />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|10",
                    name: "Bad Actor Check",
                    element: (
                        <FormStep key={`step_b|10`} stepIdx={1} subStepIdx={9} initialState={{}} onNextStep={onNextStep}>
                            <BadActorCheck />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|11",
                    name: "Politically Exposed Person Check",
                    element: (
                        <FormStep key={`step_b|11`} stepIdx={1} subStepIdx={10} initialState={{}} onNextStep={onNextStep}>
                            <PoliticallyExposedPersonCheck />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|12",
                    name: "Political Exposure Context",
                    element: (
                        <FormStep key={`step_b|12`} stepIdx={1} subStepIdx={11} initialState={{}} onNextStep={onNextStep}>
                            <PoliticalExposureContext />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|13",
                    name: "Political Exposure Role",
                    element: (
                        <FormStep key={`step_b|13`} stepIdx={1} subStepIdx={12} initialState={{}} onNextStep={onNextStep}>
                            <PolyticalExposureRole />
                        </FormStep>
                    ),
                },
                {
                    id: "step_b|14",
                    name: "FATF Check",
                    element: (
                        <FormStep key={`step_b|14`} stepIdx={1} subStepIdx={13} initialState={{}} onNextStep={onNextStep}>
                            <FATFCheck />
                        </FormStep>
                    ),
                },
            ],
        },
        {
            name: "KYC/AML Collection",
            label : "STEP 3",
            id: "step_c",
            subSteps: [
                {
                    id: "step_c|1",
                    name: "Proof of ID",
                    element: (
                        <FormStep key={`step_c|1`} stepIdx={2} subStepIdx={0} initialState={{}} onNextStep={onNextStep}>
                            <ProofOfId />
                        </FormStep>
                    ),
                },
                {
                    id: "step_c|2",
                    name: "Form W-9/W-8",
                    element: (
                        <FormStep key={`step_c|2`} stepIdx={2} subStepIdx={1} initialState={{}} onNextStep={onNextStep}>
                            <FormW9W8 />
                        </FormStep>
                    ),
                },
                {
                    id: "step_c|3",
                    name: "Parallel Markets",
                    element: (
                        <FormStep key={`step_c|3`} stepIdx={2} subStepIdx={2} initialState={{}} onNextStep={onNextStep}>
                            <ParallelMarkets />
                        </FormStep>
                    ),
                },
            ],
        },
        
        {
            name: "Review and Sign",
            label : "STEP 4",
            id: "step_d",
            subSteps: [
                {
                    id: "step_d|4",
                    name: "Review and Sign",
                    element: (
                        <FormStep key={`step_d|1`} stepIdx={3} subStepIdx={0} initialState={{}} onNextStep={onNextStep}>
                            <Review />
                        </FormStep>
                    ),
                },
            ],
        },
    ];
    return _steps;
}