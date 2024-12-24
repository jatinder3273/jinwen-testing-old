
interface Step {
  name: string;
  isActive: boolean;
  isCompleted: boolean;
  // component: React.ComponentType<any>;  
}

export const Step_1: Step[] = [
  { name: "Offering Summary", isActive: false, isCompleted: false },
  { name: "Investor Type", isActive: false, isCompleted: false },
  { name: "Subscription Amount", isActive: false, isCompleted: false },
  { name: "U.S. Personhood", isActive: false, isCompleted: false },
  { name: "Subscriber Name", isActive: false, isCompleted: false },
  { name: "Subscription Type", isActive: false, isCompleted: false },
  { name: "Address", isActive: false, isCompleted: false },
  { name: "Date & Place of Birth", isActive: false, isCompleted: false },
  { name: "Citizenship", isActive: false, isCompleted: false },
  { name: "SSN/TIN", isActive: false, isCompleted: false},
  { name: "Phone Number", isActive: false, isCompleted: false },
  { name: "Joint Ownership Type", isActive: false, isCompleted: false },
  { name: "Benefit Plan Type", isActive: false, isCompleted: false },
  { name: "Subscription Process Notice", isActive: false, isCompleted: false  },
  

 
];


// export const Step_1: Step[] = [
//   { name: "Offering Summary", isActive: false, isCompleted: false, component: OfferingSummary },
//   { name: "Investor Type", isActive: false, isCompleted: false, component: InvestorType },
//   { name: "Subscription Amount", isActive: false, isCompleted: false, component: SubscriptionAmount },
//   { name: "U.S. Personhood", isActive: false, isCompleted: false ,component :Personhood},
//   { name: "Subscriber Name", isActive: false, isCompleted: false , component : SubscriberName },
//   { name: "Subscription Type", isActive: false, isCompleted: false,component: SubscriptionType  },
//   { name: "Address", isActive: false, isCompleted: false , component :Address },
//   { name: "Date & Place of Birth", isActive: false, isCompleted: false ,component : DateOfBirth},
//   { name: "Citizenship", isActive: false, isCompleted: false , component : Citizenship},
//   { name: "SSN/TIN", isActive: false, isCompleted: false , component : SSNTIN },
//   { name: "Phone Number", isActive: false, isCompleted: false ,component: PhoneNumber},
//   { name: "Joint Ownership Type", isActive: false, isCompleted: false , component : JointOwnershipType },
//   { name: "Benefit Plan Type", isActive: false, isCompleted: false , component : BenefitPlanType },
//   { name: "Subscription Process Notice", isActive: false, isCompleted: false , component : SubscriptionProcessNotice },
  

 
// ];





export const countryOptions = [
  { label: "United States", value: "US", flag: "🇺🇸" },
  { label: "Canada", value: "CA", flag: "🇨🇦" },
  { label: "India", value: "IN", flag: "🇮🇳" },
  // Add more countries as needed
];

  
export const subscriberTypeOptions = [
  {
    value: 1,
    label: 'Investing through a benefit plan',
    description:
      'You will invest via (i) a self-directed IRA, SEP, Keogh, or other similar plan; (ii) an employee benefit plan such as a 401(k); or a (iii) deferred compensation plan such as a 457(b).',
  },
  {
    value: 2,
    label: 'Joint investment with a spouse',
    description:
      'You will co-subscribe with a legal spouse or spousal equivalent as, for example, tenants in common, joint tenants, community property, etc.',
  },
  {
    value: 3,
    label: 'An authorized representative will subscribe for me.',
    description:
      'A legally authorized person or entity such as a lawyer, law firm, or other power-of-attorney holder, will act directly on my behalf. Do not select this option if you have counsel that will merely assist you in completing this subscription.',
  },
  {
    value: 4,
    label: 'None of the above - I am investing myself (most common)',
    description:
      'I am investing in my own capacity without utilization of a benefit plan, authorized representative, or joint investment.',
  },
];

export const benefitPlanTypeOptions = [
  { value: 1, label: "IRA, SEP, Keogh or other similar plan" },
  { value: 2, label: "Employee benefit plan (e.g. 401(k))" },
  { value: 3, label: "Deferred compensation plan (e.g. 457(b)) - this is uncommon" },
];

export const jointOwnershipTypeOptions = [
  { value: 1, label: "Joint Tenants with Right of Survivorship" },
  { value: 2, label: "Tenants in Common" },
  { value: 3, label: "Community Property" },
  { value: 4, label: "Tenancy by the Entirety" },
];

export const accreditationOptions = [
  {
    value: 1,
    label: 'Net Worth Threshold',
    description: 'The Subscriber\'s individual net worth (or combined net worth with Subscriber\'s spouse or spousal equivalent), as of the date hereof, exceeds $1,000,000.',
  },
  {
    value: 2,
    label: 'Income Threshold',
    description: 'The Subscriber had individual income of more than $200,000 (or combined income with Subscriber\'s spouse or spousal equivalent of more than $300,000, if co-subscribing) in each of the past two years, and reasonably expects to reach the same income level in the current year.',
  },
  {
    value: 3,
    label: 'Eligible FINRA License Holder',
    description: 'The Subscriber holds and maintains, in good standing, one of the following certifications/designations administered by the Financial Industry Regulatory Authority.',
  },
  {
    value: 4,
    label: 'Knowledgeable Employee',
    description: 'The Subscriber is a knowledgeable employee within the meaning of Rule 3c-5(a) of the Investment Company Act, and is either (i) a director, executive officer, or general partner of the Fund, or a director, executive officer, or a managing member of a manager or general partner of a general partner of the Fund, each as described in Regulation D, or (ii) an employee or Affiliated Management Person of the Fund who, in connection with the employee\'s regular functions or duties, participates in the investment activities of the Fund, provided that the employee has been performing such functions and duties for or on behalf of the investment adviser, or substantially similar functions or duties for or on behalf of another company for at least 12 months.',
  },
  {
    value: 5,
    label: 'None of the above (subscriber is not accredited)',
    description: 'The Subscriber cannot make any of the preceding representations listed and is not an accredited investor.',
  },
];


export const qualifiedClientOptions = [
  {
    value: 1,
    label: 'Net Worth Threshold',
    description: "The Subscriber's individual net worth (or combined net worth with Subscriber's spouse or spousal equivalent), as of the date hereof, exceeds $1,000,000.",
  },
  {
    value: 2,
    label: 'Interest Values Threshold',
    description: 'The Subscriber, immediately after subscribing for Interests in this Fund, will have at least $1,100,000 under advisement by the Manager.',
  },
  {
    value: 3,
    label: 'Qualified Purchaser',
    description: 'The Subscriber is an individual that owns at least $5,000,000 in investments or otherwise qualifies as a qualified purchaser.',
  },
  {
    value: 4,
    label: 'Knowledgeable Employee',
    description: "The Subscriber is a knowledgeable employee within the meaning of Rule 3c-5(a) of the Investment Company Act, and is either (i) a director, executive officer, or general partner of the Fund, or a director, executive officer, or a managing member of a manager or general partner of a general partner of the Fund, each as described in Regulation D, or (ii) an employee or Affiliated Management Person of the Fund who, in connection with the employee's regular functions or duties, participates in the investment activities of the Fund, provided that the employee has been performing such functions and duties for or on behalf of the investment adviser, or substantially similar functions or duties for or on behalf of another company for at least 12 months.",
  },
];

export const qualifiedPurchaserOptions = [
  {
    value: 1,
    label: 'Investments Value Threshold',
    description: "The Subscriber is an individual who (alone, or together with their spouse, if co-subscribing), as of the date hereof, owns at least $5,000,000 in investments.",
  },
  {
    value: 2,
    label: 'Knowledgeable Employee',
    description: 'The Subscriber is a knowledgeable employee within the meaning of Rule 3c-5(a) of the Investment Company Act, and is either (i) a director, executive officer, or general partner of the Fund, or a director, executive officer, or a managing member of a manager or general partner of a general partner of the Fund, each as described in Regulation D, or (ii) an employee or Affiliated Management Person of the Fund who, in connection with the employee\'s regular functions or duties, participates in the investment activities of the Fund, provided that the employee has been performing such functions and duties for or on behalf of the investment adviser, or substantially similar functions or duties for or on behalf of another company for at least 12 months.',
  },
  {
    value: 3,
    label: 'None of the above (subscriber is not a qualified purchaser)',
    description: 'The Subscriber cannot make any of the preceding representations listed and is not a qualified purchaser.',
  },
];

export const politicallyExposedPersonOptions = [
  {
    value: 1,
    label: 'The investor itself is a PEP',
  },
  {
    value: 2,
    label: 'A person(s) controlling or controlled by the investor is a PEP',
  },
  {
    value: 3,
    label: 'A person(s) with beneficial interests in the investor is a PEP',
  },
  {
    value: 4,
    label: 'A person(s) for whom the investor is acting as agent or nominee for relating to this investment in the fund is a PEP',
  },
  {
    value: 5,
    label: 'None of the above',
  },
];

