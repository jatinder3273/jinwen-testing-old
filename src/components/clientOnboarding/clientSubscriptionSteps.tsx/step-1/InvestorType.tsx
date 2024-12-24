import Radio from "@/components/theme/radio";
import React from "react";
import {useStepData} from "@/components/clientOnboarding/stepper/UseStepData";

export const InvestorType = () => {
  const {data, setData} = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">Investor Type</h2>
      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        Is the subscriber (aka investor) an individual or an entity?
      </p>

      <div>
        <div className="bg-[#FCFAFA] p-4  border border-[#DCE1E6]">
          <Radio
            name="investor_type"
            checked={(+data?.investor_type) === 1}
            required
            value={1}
            label="Individual"
            description="Natural persons, individuals investing through an IRA / Keogh / SEP plan, or co-subscribers."
            onChange={(e) => setData(prevState=> {
              const dataCopy = {...prevState};
              dataCopy["investor_type"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 mt-4 border w-full border-[#DCE1E6]">
          <Radio
            name="investor_type"
            required
            checked={(+data?.investor_type) === 2}
            value={2}
            label="Entity"
            description="Trusts, LLCs, partnerships, corporations, benefit plans, funds, etc."
            onChange={(e) => setData(prevData=> {
              const dataCopy = {...prevData};
              dataCopy["investor_type"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>

      </div>

    </div>
  );
};

export default InvestorType;

// import Radio from "@/components/theme/radio";
// import React from "react";
// import {useStepData} from "@/components/clientOnboarding/stepper/UseStepData";

// import {Map} from "immutable";
// import { useValidation } from "@/hooks/useValidation";

// export const InvestorType = () => {
//   const {data, setData} = useStepData();
//   const validationMap = Map<string, Validation[]>(["investor_type", [{validationType: 'MISSING', message: 'Please choose investor type.'}]]);
//   const {errorMessage, handleInvalid} = useValidation(validationMap);

//   return (
//     <div className="flex flex-col text-left flex-wrap">
//       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">Investor Type</h2>
//       <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px]">
//         Is the subscriber (aka investor) an individual or an entity?
//       </p>

//       <div>
//         <div className="bg-[#FCFAFA] p-4  border border-[#DCE1E6]">
//           <Radio
//             name="investor_type"
//             checked={(+data?.investor_type) === 1}
//             required
//             value={1}
//             label="Individual"
//             description="Natural persons, individuals investing through an IRA / Keogh / SEP plan, or co-subscribers."
//             onChange={(e) => setData(prevState=> {
//               const dataCopy = {...prevState};
//               dataCopy["investor_type"] = parseInt(e.target.value);
//               return dataCopy;
//             })}
//             onInvalid={handleInvalid}
//           />
//         </div>
//         <div className="bg-[#FCFAFA] p-4 mt-4 border w-full border-[#DCE1E6]">
//           <Radio
//             name="investor_type"
//             required
//             checked={(+data?.investor_type) === 2}
//             value={2}
//             onInvalid={handleInvalid}
//             label="Entity"
//             description="Trusts, LLCs, partnerships, corporations, benefit plans, funds, etc."
//             onChange={(e) => setData(prevData=> {
//               const dataCopy = {...prevData};
//               dataCopy["investor_type"] = parseInt(e.target.value);
//               return dataCopy;
//             })}
//           />
//         </div>

//       </div>

//         {errorMessage&&<span>{errorMessage}</span>}
//     </div>
//   );
// };

// export default InvestorType;





// import React, { useState } from "react";
// import { Map } from "immutable";
// import Radio from "@/components/theme/radio";
// import { useStepData } from "@/components/clientOnboarding/stepper/UseStepData";

// export interface Validation {
//   validationType: "MISSING" | "TYPE_MISMATCH" | "TOO_SHORT" | "OTHER";
//   message: string;
// }

// // Custom hook for validation
// export const useValidation = (validationMap: Map<string, Validation[]>) => {
//   const [errorMessage, setErrorMessage] = useState<string | undefined>();

//   const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
//     const target = event.target;
//     const validity = target.validity;
//     const validations = validationMap.get(target.name) || [];
//     let validation: Validation | undefined;

//     if (validity.valueMissing) {
//       validation = validations.find((v) => v.validationType === "MISSING");
//     } else if (validity.typeMismatch) {
//       validation = validations.find(
//         (v) => v.validationType === "TYPE_MISMATCH"
//       );
//     } else if (validity.tooShort) {
//       validation = validations.find((v) => v.validationType === "TOO_SHORT");
//     } else {
//       validation = validations.find((v) => v.validationType === "OTHER");
//     }

//     if (validation) {
//       setErrorMessage(validation.message);
//     }
//   };

//   return { errorMessage, handleInvalid };
// };

// export const InvestorType = () => {
//   const { data, setData } = useStepData();

//   const validationMap: Map<string, Validation[]> = Map({
//     investor_type: [
//       {
//         validationType: "MISSING",
//         message: "Please choose an investor type.",
//       },
//     ],
//   });

//   const { errorMessage, handleInvalid } = useValidation(validationMap);

//   return (
//     <div className="flex flex-col text-left flex-wrap">
//       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">
//         Investor Type
//       </h2>
//       <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px]">
//         Is the subscriber (aka investor) an individual or an entity?
//       </p>

//       <div>
//         {/* Individual Option */}
//         <div className="bg-[#FCFAFA] p-4 border border-[#DCE1E6]">
//           <Radio
//             name="investor_type"
//             checked={+data?.investor_type === 1}
//             // required
//             value={1}
//             label="Individual"
//             description="Natural persons, individuals investing through an IRA / Keogh / SEP plan, or co-subscribers."
//             onChange={(e) =>
//               setData((prevState) => ({
//                 ...prevState,
//                 investor_type: parseInt(e.target.value, 10),
//               }))
//             }
//             onInvalid={handleInvalid}
//           />
//         </div>

//         {/* Entity Option */}
//         <div className="bg-[#FCFAFA] p-4 mt-4 border border-[#DCE1E6]">
//           <Radio
//             name="investor_type"
//             // required
//             checked={+data?.investor_type === 2}
//             value={2}
//             label="Entity"
//             description="Trusts, LLCs, partnerships, corporations, benefit plans, funds, etc."
//             onChange={(e) =>
//               setData((prevData) => ({
//                 ...prevData,
//                 investor_type: parseInt(e.target.value, 10),
//               }))
//             }
//             onInvalid={handleInvalid}
//           />
//         </div>
//       </div>

//       {/* Error message */}
//       {errorMessage && (
//         <span className="text-red-600 mt-2">{errorMessage}</span>
//       )}
//     </div>
//   );
// };

// export default InvestorType;
