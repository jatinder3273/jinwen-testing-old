"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";
import { StepPayload } from "../../objects/StepPayload";
import {
  accreditationOptions,
  benefitPlanTypeOptions,
  jointOwnershipTypeOptions,
  politicallyExposedPersonOptions,
  qualifiedClientOptions,
  qualifiedPurchaserOptions,
  subscriberTypeOptions,
} from "../../objects/objects";

const Review = () => {
  const [data, setData] = useState<any>({});

  const [data1, setData1] = useState<any>({});
  const [data2, setData2] = useState<any>({});

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

        setData(res?.data.general_subscription_info || {});
        setData1(res?.data.subscriber_suitability_questions || {});
        setData2(res?.data.subscriber_kyc_collections || {});
      } catch (error) {
        console.error("Error fetching form data:", error);
        toast.error("Failed to fetch form data");
      }
    };

    fetchFormData();
  }, []);

  const subscriberType = subscriberTypeOptions.find(
    (type) => type.value === data.subscription_type
  );

  const benefitPlanType = benefitPlanTypeOptions.find(
    (type) => type.value === data.benefit_plan_type
  );

  const jointOwnershipType = jointOwnershipTypeOptions.find(
    (type) => type.value === data.joint_ownership_type
  );



  const accreditationOptionsType = accreditationOptions.find(
    (type) => type.value === data1.accreditation_status
  );

  


  const qualifiedClientOptionsType = qualifiedClientOptions.find(
    (type) => type.value === data1.qualified_client_status
  );


  

  const qualifiedPurchaserOptionsType = qualifiedPurchaserOptions.find(
    (type) => type.value === data1?.qualified_purchaser_status
  );


  

  const politicallyExposedPersonOptionsType = politicallyExposedPersonOptions.find(
    (type) => type.value === data1?.political_exposed_person
  );

  return (
    <div className="flex flex-col text-left flex-wrap h-full">
      <div className="flex-1 overflow-y-auto max-h-[400px] lg:px-3 md:px-2 mb-2">
        <div className="bg-[#FCFAFA]  mt-4 border w-full border-[#DCE1E6] p-8 px-24">
          <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">
            General Subscriber Info
          </h2>
          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Investor Type</span>
              <span className="font-medium">
                {data.investor_type === 1 ? "Individual" : "Entity"}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subscription Amount</span>
              <span>{data?.subscription_amount}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">U.S. Personhood</span>
              <span>{data?.u_s_personhood === true ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subscriber Name</span>
              <span>
                {data?.subscriber_first_name} {data?.subscriber_last_name}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subscriber Type</span>
              <span>
                {/* {data?.subscription_type}  */}
                {subscriberType ? subscriberType.label : "Unknown Type"}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Benefit Plan Type</span>
              <span>{benefitPlanType ? benefitPlanType?.label : ""}</span>
            </div>
            {data?.joint_ownership_type  && (
              <div className="flex justify-between mb-4">
                <span className="font-medium">Joint Ownership Type</span>
                <span>
                  {jointOwnershipType ? jointOwnershipType?.label : ""}
                </span>
              </div>
            )}

           {data?.subscription_process_notice &&
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subscription Process Notice</span>
              <span>{data?.subscription_process_notice ? 'I understand' : ''}</span>
            </div>
             }
            <div className="flex justify-between mb-4">
              <span className="font-medium">Address</span>
              <span>{data?.address_line_1}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">City</span>
              <span>{data?.city}</span>
            </div>
            {/* <div className="flex justify-between mb-4">
              <span className="font-medium">State/Province / Region</span>
              <span>{data?.state}</span>
            </div> */}
            <div className="flex justify-between mb-4">
              <span className="font-medium">Postal / ZIP Code</span>
              <span>{data?.zip_code}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Date & Place of Birth</span>
              <span>{data?.dob}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Citizenship</span>
              <span>{data?.citizenship_country === 1 ? 'USA' : ''}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">SSN/TIN</span>
              <span>{data?.ssn_tin}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Phone Number</span>
              <span>{data?.phone_no ? data?.phone_no  : 'NA' }</span>
            </div>
          </div>
        </div>
        <div className="bg-[#FCFAFA] p-8 px-24 mt-4 border w-full border-[#DCE1E6]">
          <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">
            Suitability Questions
          </h2>
          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Accreditation Status</span>
              {/* <span>{data1?.accreditation_status}</span> */}
              <span>
                  {accreditationOptionsType ? accreditationOptionsType?.label : ""}
                </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Qualified Client Status</span>
              {/* <span>{data1?.qualified_client_status}</span> */}
              
              <span>
                  {qualifiedClientOptionsType ? qualifiedClientOptionsType?.label : ""}
                </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Qualified Purchaser Status</span>
              {/* <span>{data1?.qualified_purchaser_status}</span> */}
              
              <span>
                  {qualifiedPurchaserOptionsType ? qualifiedPurchaserOptionsType?.label : ""}
                </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Placement Agent Check</span>
              <span>{data1?.placement_agent_check === true ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Placement Agent Name</span>
              <span>{data1?.placement_agent_name}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Investor’s Occupation</span>
              <span>{data?.investor_occupation ? data?.investor_occupation : 'NA'}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Relative Investment Amount</span>
              <span>{data1?.is_relative_investment === true ? "Yes" : 'No'}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Risk Consent</span>
              <span>{data1?.is_risk_consent === true ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Prior Fund Investments</span>
              <span>{data1?.is_prior_fund_investment === true ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Bad Actor Check</span>
              <span>{data1?.bad_actor_check === true  ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Politically Exposed Person</span>
              {/* <span>{data1?.political_exposed_person}</span> */}

              
              <span>
                  {politicallyExposedPersonOptionsType ? politicallyExposedPersonOptionsType?.label : ""}
                </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Political Exposure Context</span>
              <span>{data1?.political_exposure_context === 1 ? 'USA' : ''}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Political Exposure Role</span>
              <span>{data1?.political_exposure_role}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FCFAFA] p-8 px-24 mt-4 border w-full border-[#DCE1E6]">
          <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">
            KYC/AML Collection
          </h2>
          <div className="mt-6">
           
            <div className="flex justify-between mb-4">
              <span className="font-medium">Proof of ID</span>
              <span>Form W-9/W-8</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Signature</span>
              <span>Save signature</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Parallel Markets Verification</span>
              <span>Start KYC/AML Verification</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Email Address Confirmation</span>
              <span>johndoe@gmail.com</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Verification Code</span>
              <span>234567</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Choose Investor Entity</span>
              <span>Myself as an individual (John Doe)</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Information Authorization</span>
              <span>Authorize</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
