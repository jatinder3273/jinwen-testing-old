import Radio from "@/components/theme/radio";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import CustomButton from "@/components/theme/customButton";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";
import { useStepData } from "../../stepper/UseStepData";



const BenefitPlanType = () => {
  const {data, setData} = useStepData();


 

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Benefit Plan Type
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        What type of benefit plan investor is the subscribing entity?
      </p>

   
        <div className="bg-[#FCFAFA] p-4  border border-[#DCE1E6]">
          <Radio
          required
            name="benefit_plan_type"
            checked={(+data?.benefit_plan_type) === 1}
            value={1}
            label="IRA, SEP, Keogh or other similar plan"
            onChange={(e) => setData(prevState=> {
              const dataCopy = {...prevState};
              dataCopy["benefit_plan_type"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 mt-4 border border-[#DCE1E6]">
          <Radio
          required
            name="benefit_plan_type"
            checked={(+data?.benefit_plan_type) === 2}
            value={2}
            label="Employee benefit plan (e.g. 401(k))"
            onChange={(e) => setData(prevState=> {
              const dataCopy = {...prevState};
              dataCopy["benefit_plan_type"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>

        <div className="bg-[#FCFAFA] p-4 mt-4 border border-[#DCE1E6]">
          <Radio
          required
            name="benefit_plan_type"
            checked={(+data?.benefit_plan_type) === 3}
            value={3}
            label="Deferred compensation plan (e.g. 457(b)) - this is uncommon"
            onChange={(e) => setData(prevState=> {
              const dataCopy = {...prevState};
              dataCopy["benefit_plan_type"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>

      
    </div>
  );
};

export default BenefitPlanType;


// import Radio from "@/components/theme/radio";
// import React from "react";
// import { useStepData } from "../../stepper/UseStepData";

// const BenefitPlanType = () => {
//   const { data, setData } = useStepData();

//   return (
//     <div className="flex flex-col text-left flex-wrap">
//       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
//         Benefit Plan Type
//       </h2>

//       <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
//         What type of benefit plan investor is the subscribing entity?
//       </p>

//       {[
//         { value: 1, label: "IRA, SEP, Keogh or other similar plan" },
//         { value: 2, label: "Employee benefit plan (e.g. 401(k))" },
//         { value: 3, label: "Deferred compensation plan (e.g. 457(b)) - this is uncommon" },
//       ].map((option) => (
//         <div
//           key={option.value}
//           className={`p-4 mt-4 border bg-[#FCFAFA] ${
//             +data?.benefit_plan_type === option.value
//               ? "border-[#3190E6] bg-[#3190E60F]"
//               : "border-[#DCE1E6]"
//           }`}
//         >
//           <Radio
//             required
//             name="benefit_plan_type"
//             checked={+data?.benefit_plan_type === option.value}
//             value={option.value}
//             label={option.label}
//             onChange={(e) =>
//               setData((prevState) => ({
//                 ...prevState,
//                 benefit_plan_type: parseInt(e.target.value),
//               }))
//             }
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BenefitPlanType;
