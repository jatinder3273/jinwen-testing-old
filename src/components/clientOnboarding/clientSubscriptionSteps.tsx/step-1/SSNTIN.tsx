


// 'use client'
// import React from 'react'
// import Radio from "@/components/theme/radio";
// import { Formik, useFormik } from "formik";
// import * as Yup from "yup";
// import CustomButton from "@/components/theme/customButton";
// import InputField from '@/components/theme/input';
// import { toast } from 'sonner';
// import useFetch from '@/hooks/useFetch';
// import { useStepData } from '../../stepper/UseStepData';


// export const SSNTIN = () => {
//   const {data, setData} = useStepData();


 

//   return (
//     <div className="flex flex-col text-left flex-wrap">
//       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">
//       SSN/TIN
//       </h2>

//       <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px]">
//       What is the subscriber's SSN or Tax ID?
//       </p>

   
//       <InputField className=' bg-[#FCFAFA]'
//           value={data?.ssn_tin}
//           onChange={(evt)=> {setData(prevState=> {
//             const dataCopy = {...prevState};
//             dataCopy["ssn_tin"] = evt.target.value;
//             return dataCopy;
//           })}}
//           placeholder="e.g. 1,000,000"
//           type="number"
//           name="ssn_tin"
//           noRadius
//         />

       

        
    
//     </div>
//   )
// }

// export default SSNTIN



'use client'
import React from 'react'
import InputField from '@/components/theme/input';
import { useStepData } from '../../stepper/UseStepData';

const SSNTIN = () => {
  const { data, setData } = useStepData();

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setData((prevState) => ({
        ...prevState,
        ssn_tin: numericValue,
      }));
    } else if (value === "") {
      setData((prevState) => ({
        ...prevState,
        ssn_tin: "",
      }));
    }
  };

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        SSN/TIN
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        What is the subscriber's SSN or Tax ID?
      </p>

      <InputField
        className="bg-[#FCFAFA]"
        value={data?.ssn_tin || ""}
        onChange={handleInputChange}
        placeholder="e.g. 123456789"
        type="text" 
        inputMode="numeric" 
        name="ssn_tin"
        required
        noRadius
        style={{
          appearance: "none",
        }}
      />
    </div>
  );
};

export default SSNTIN;
