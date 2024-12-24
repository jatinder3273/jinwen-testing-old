


"use client";
import {StepperContext} from "@/components/clientOnboarding/context/StepperContext";
import React, {useContext, useEffect, useState} from "react";
import {FormStepper,} from "@/components/clientOnboarding/stepper/FormStepper";
import styles from "../../styles/subscription_form.module.scss";
import CustomButton from "@/components/theme/customButton";
import {LogoutIcon} from "@/admin_components/icons";
import ConfirmationModal from "@/admin_components/common/confirmationModal";
import {useRouter} from "next/navigation";
import useAuthService from "@/utils/authService";
import useFetch from "@/hooks/useFetch";
import {toast} from "sonner";
import {format} from "date-fns";
import InvestorSubscriptionSidebar from "@/components/clientOnboarding/sections/sidebar";
import {
  getSubscriptionTypeDependentStepName
} from "@/components/clientOnboarding/clientSubscriptionSteps.tsx/step-1/SubscriptionType";
import { PulseLoader } from "react-spinners";

const Form = () => {
  const [isClient, setIsClient] = useState(false);
  const stepperState = useContext(StepperContext);


  useEffect(() => {
    setIsClient(true);
  }, []);


  const onPreviousStep = (stepIdx: number, subStepIdx: number) => {
    console.log("Step Completed");
    if (subStepIdx == 0) {
      if (stepIdx == 0) {
      } else {
        stepperState.setActiveStep(
          stepIdx - 1,
          stepperState.steps[stepIdx - 1].subSteps.length - 1
        );
      }
    } else {
      stepperState.setActiveStep(stepIdx, subStepIdx - 1);
    }
  };

  const [fetchFormDataApi, { loading: getLoading }] = useFetch(
    `/investor/get-subscription-detail`, 
    {
      method: "GET",
    }
  );


  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const res = await fetchFormDataApi();
        console.log("API Response:", res);
  
        if (res.status) {
          const step1Data = res.data.general_subscription_info;
          const step2Data = res.data.subscriber_suitability_questions;
          const step3Data = res.data.subscriber_kyc_collections;
  
          if (step1Data) {
            if (step1Data.investor_type)
              stepperState.setData(0, 1, {investor_type: step1Data.investor_type});
            if (step1Data.subscription_amount)
              stepperState.setData(0, 2, {subscription_amount: step1Data.subscription_amount});
            if (step1Data.u_s_personhood)
               stepperState.setData(0, 3, {u_s_personhood: step1Data?.u_s_personhood});
            if (step1Data.subscriber_first_name && step1Data.subscriber_last_name)
                stepperState.setData(0, 4, {subscriber_first_name: step1Data.subscriber_first_name , subscriber_last_name: step1Data.subscriber_last_name});
            if (step1Data.subscription_type)
               stepperState.setData(0, 5, { subscription_type: step1Data.subscription_type});
            if (step1Data.address_line_1 && step1Data.address_line_2 && step1Data.city && step1Data.state && step1Data.zip_code && step1Data.country)
               stepperState.setData(0, 7, {address_line_1: step1Data.address_line_1,address_line_2: step1Data.address_line_2, city:step1Data.city, state : step1Data.state , zip_code : step1Data.zip_code ,country : step1Data.country});
            if (step1Data.dob && step1Data.pob_country)
               stepperState.setData(0, 8, {dob: format(new Date(step1Data?.dob), "MM/dd/yyyy") , pob_country: step1Data.pob_country});
            if (step1Data.citizenship_country)
               stepperState.setData(0, 9, {citizenship_country: step1Data?.citizenship_country});
            if (step1Data.ssn_tin)
               stepperState.setData(0, 10, { ssn_tin: step1Data.ssn_tin});
            if (step1Data.subscriber_phone_no || step1Data.subscriber_phone_code) {
              stepperState.setData(0, 11, {subscriber_phone_code: step1Data.subscriber_phone_code , subscriber_phone_no : step1Data.subscriber_phone_no});
              stepperState.setStepCompleted(0);
            } else {
              stepperState.setData(0, 11, {subscriber_phone_code: step1Data.subscriber_phone_code , subscriber_phone_no : step1Data.subscriber_phone_no});
            }
            if (step1Data.joint_ownership_type) {
              stepperState.setData(0, 6, {joint_ownership_type: step1Data?.joint_ownership_type});
            }
            if (step1Data.benefit_plan_type) {
              stepperState.setData(0, 6, { benefit_plan_type: step1Data?.benefit_plan_type});
            }
            if (step1Data.subscription_process_notice) {
              stepperState.setData(0, 6, {subscription_process_notice: step1Data.subscription_process_notice});
            }
            if (step1Data.subscription_type && step1Data.subscription_type != '4') {
              stepperState.updateSubStep(0, 6, {skip: false, name: getSubscriptionTypeDependentStepName(step1Data.subscription_type.toString())})
            }
          }
  
          if (step2Data) {
          
            stepperState.setData(1, 0, {accreditation_status: step2Data.accreditation_status});
            if (step2Data.qualified_client_status)
              stepperState.setData(1, 1, {qualified_client_status: step2Data.qualified_client_status});
            if (step2Data.qualified_purchaser_status)
              stepperState.setData(1, 2, {qualified_purchaser_status: step2Data.qualified_purchaser_status});
            if (step2Data.placement_agent_check)
                stepperState.setData(1, 3, {placement_agent_check: step2Data.placement_agent_check});
            if (step2Data.placement_agent_name)
                stepperState.setData(1, 4, {placement_agent_name: step2Data.placement_agent_name});
            if (step2Data.investor_occupation)
                 stepperState.setData(1, 5, {investor_occupation: step2Data?.investor_occupation});
            if (step2Data.is_relative_investment)
                stepperState.setData(1, 6, {is_relative_investment: step2Data?.is_relative_investment});
            if (step2Data.is_risk_consent)
                stepperState.setData(1, 7, {is_risk_consent: step2Data?.is_risk_consent});
            if (step2Data.is_prior_fund_investment)
                stepperState.setData(1, 8, {is_prior_fund_investment: step2Data?.is_prior_fund_investment});
            if (step2Data.bad_actor_check)
                stepperState.setData(1, 9, {bad_actor_check: step2Data?.bad_actor_check});
            if (step2Data.political_exposed_person)
                stepperState.setData(1, 10, {political_exposed_person: step2Data?.political_exposed_person});
            if (step2Data.political_exposure_context)
                stepperState.setData(1, 11, {political_exposure_context: step2Data?.political_exposure_context});
            if (step2Data.political_exposure_role)
                 stepperState.setData(1, 12, {political_exposure_role: step2Data?.political_exposure_role});
            if (step2Data.fatf_check) {
              stepperState.setData(1, 13, {fatf_check: step2Data.fatf_check});
              stepperState.setStepCompleted(1);
            } else {
              stepperState.setData(1, 13, {});
            }

          }
          if (step3Data) {
          
            stepperState.setData(2, 0, {id_proof: step3Data.id_proof});
            if (step3Data.id_proof) {
              stepperState.setStepCompleted(2);
            }
            // stepperState.setData(1, 1, {qualified_client_status: step3Data.qualified_client_status});
            // stepperState.setData(1, 2, {qualified_purchaser_status: step3Data.qualified_purchaser_status});
           
          }
        } else {
          toast.error(res.message || "Failed to load form data");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("Failed to fetch form data");
      }
    };
  
    fetchFormData();
  }, []);
  


  const [logoutModal, setLogoutModal] = useState(false);
  const { clearToken, getToken, getUserRoleId } = useAuthService();
  const route = useRouter();
  const handleLogout = () => {
    clearToken();
    route.replace("/auth/login");
    setLogoutModal(false);
  };


 




  if (!isClient) return <div className="flex justify-center items-center h-[100vh] w-full">  <PulseLoader color="#ff782c" /></div>;

  return (
    <div
      className={`w-100  h-screen min-h-[100vh] bg-danger position-relative ${styles.subscriptionLayout}`}
    >
      <div className={``}>
        <InvestorSubscriptionSidebar toggleSidebar={() => {}} isSidebarOpen={true} />
      </div>
      <main className="flex-fill">
        <div className="flex justify-between m-4">
          <div> </div>
        <div className="flex gap-4">
          {/* <CustomButton className="rounded-none !text-[14px] !font-medium !border-none">
            Save and Continue Later
          </CustomButton> */}
          <CustomButton
            variantColor="black"
            variantType="outlined"
            onClick={() => setLogoutModal(true)}
            style={{
              border: "1px solid #D2D7DC",
              fontSize: "14px",
              backgroundColor: "#ffffff",
              display: "flex",
              gap: "12px",
            }}
          >
            Log Out <LogoutIcon />
          </CustomButton>
        </div>
        </div>

        <div className={`d-flex  flex-column ${styles.stepperPanel}`}>
          <FormStepper
            steps={stepperState.steps}
            onStepChange={(step, idx) => {
              stepperState.setActiveStep(idx, 0, false);
            }}
          />
          <div className={`${styles.stepLayoutContainer} mt-16`}>
            {
              stepperState.steps[stepperState.currentStepIdx].subSteps[
                stepperState.currentSubStepIdx
              ].element
            }
          </div>
          <div className="button-group flex  gap-6">
            {(stepperState.currentSubStepIdx > 0 ||
              stepperState.currentStepIdx > 0) && (
              <CustomButton
                variantColor={`black`}
                variantType="outlined"
                className="rounded-none !text-[18px] !font-bold  w-[208px] h-[48px] mt-10"
                type="button"
                onClick={() =>
                  onPreviousStep(
                    stepperState.currentStepIdx,
                    stepperState.currentSubStepIdx
                  )
                }
              >
                Back
              </CustomButton>
            )}
            <CustomButton
              className="rounded-none !text-[18px] !font-bold !border-none w-[208px] h-[48px] mt-10"
              type="submit"
              form={`form-step`}
              
              
            >
              Next
            </CustomButton>
          </div>
        </div>
      </main>
      <ConfirmationModal
        isOpen={logoutModal}
        image="/assets_admin/images/logout.png"
        title="LOG OUT"
        description="Are you sure you want to log out this account?"
        handleClose={() => setLogoutModal(false)}
        confirmBtn={
          <CustomButton onClick={() => handleLogout()}>Log Out</CustomButton>
        }
      />
    </div>
  );
};

export default Form;
