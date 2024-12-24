

import * as Yup from 'yup';

export const Step1PayloadValidationSchema = Yup.object().shape({
  step: Yup.number().required('Step is required'),
  investor_type: Yup.number().required('Investor type is required'),
  subscription_amount: Yup.number().required('Subscription amount is required'),
  u_s_personhood: Yup.boolean().required('U.S. personhood is required'),
  subscriber_first_name: Yup.string().required('Subscriber first name is required'),
  subscriber_last_name: Yup.string().required('Subscriber last name is required'),
  subscription_type: Yup.number().required('Subscription type is required'),
  benefit_plan_type: Yup.number().required('Benefit plan type is required'),
  subscription_process_notice: Yup.boolean().required('Subscription process notice is required'),
  joint_ownership_type: Yup.number().required('Joint ownership type is required'),
  address_line_1: Yup.string().required('Address line 1 is required'),
  address_line_2: Yup.string().required('Address line 2 is required'),
  city: Yup.string().required('City is required'),
  state: Yup.number().required('State is required'),
  zip_code: Yup.string().required('Zip code is required'),
  country: Yup.string().required('Country code is required'),
  subscriber_phone_no: Yup.string().required('Subscriber phone number is required'),
  subscriber_phone_code: Yup.string().required('Subscriber phone code is required'),
  dob: Yup.string().required('Date of birth is required'),
  pob_country: Yup.string().required('Place of birth is required'),
  citizenship_country: Yup.string().required('Citizenship is required'),
  ssn_tin: Yup.number().required('SSN/TIN is required')
});




export interface StepPayload {
  step: number;
  investor_type: number;
  subscription_amount: number;
  u_s_personhood: boolean;
  subscriber_first_name: string;
  subscriber_last_name: string;
  subscription_type: number;
  benefit_plan_type: number;
  subscription_process_notice: boolean;
  joint_ownership_type: number;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: number;
  zip_code: string;
  country: number;
  subscriber_phone_no: string;
  subscriber_phone_code: string;
  dob: string; // MM/DD/YYYY
  pob_country: number;
  citizenship_country: number;
  ssn_tin: number;
  
  
  accreditation_status: number;
  qualified_client_status: number;
  qualified_purchaser_status: number;
  placement_agent_name: string;
  placement_agent_check: boolean;
  investor_occupation: string;
  is_relative_investment: boolean;
  // relative_investment_amount: number;
  is_risk_consent: boolean;
  is_prior_fund_investment: boolean;
  bad_actor_check: boolean;
  political_exposure_context: number;
  political_exposure_role: string;
  political_exposed_person: number;
  fatf_check: number;

 
  id_proof: string;
  // {
  //   document_type: string; 
  //   document_number: string;
  //   issue_date?: string;
  //   expiry_date?: string; 
  //   issuing_country: number; 
  // };
}
