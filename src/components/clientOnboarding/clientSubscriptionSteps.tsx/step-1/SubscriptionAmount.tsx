// "use client";
// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import CustomButton from "@/components/theme/customButton";
// import InputField from "@/components/theme/input";
// import axios from "axios"; // You can use `fetch` if preferred
// import useFetch from "@/hooks/useFetch";
// import { toast } from "sonner";
// import { useStepData } from "../../stepper/UseStepData";
// // import {useStepData} from "@/components/clientOnboarding/stepper/UseStepData";

// export const SubscriptionAmountSchema = Yup.object().shape({
//   amount: Yup.number()
//     .required("Please add amount")
//     .min(1, "Amount must be greater than zero"),
// });

// const SubscriptionAmount = () => {
//   const {data, setData} = useStepData();
//   const [addUpdateSubscriptionDetailApi, { loading, error }] = useFetch(
//     `/investor/add-update-subscription-detail`,
//     {
//       method: "PUT",
//     }
//   );

//   const formik = useFormik({
//     initialValues: {
//       amount: 0,
//     },
//     validationSchema: SubscriptionAmountSchema,
//     onSubmit: async (values) => {
//       await handleSubmit(values);
//     },
//   });

//   const handleSubmit = async (values: { amount: number }) => {
//     try {
//       const payload = { ...values, step: 1 };
//       const res = await addUpdateSubscriptionDetailApi(payload);

//       if (res.status) {
//         toast.success(res.message || "Submitted successfully");
//       } else {
//         toast.error(res.message || "Submission failed");
//       }
//     } catch (err) {
//       toast.error("API call failed");
//     }
//   };

//   return (
//     <div className="flex flex-col text-left flex-wrap">
//       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px]">
//         Subscription Amount
//       </h2>

//       <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px]">
//         Enter the intended subscription amount (USD) relating to this
//         subscription.
//       </p>

//       <InputField
//         required
//         className=" bg-[#FCFAFA]"
//         value={data?.subscription_amount}
//         onChange={(evt)=> {setData(prevState=> {
//           const dataCopy = {...prevState};
//           dataCopy["subscription_amount"] = evt.target.value;
//           return dataCopy;
//         })}}
//         placeholder="e.g. 1,000,000"
//         type="number"
//         name="subscription_amount"
//         noRadius
//       />

//       {formik.errors.amount && formik.touched.amount && (
//         <div className="text-red-500 mt-2">{formik.errors.amount}</div>
//       )}
//     </div>
//   );
// };

// export default SubscriptionAmount;


"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/theme/customButton";
import InputField from "@/components/theme/input";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { useStepData } from "../../stepper/UseStepData";

export const SubscriptionAmountSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Please add amount")
    .min(0, "Amount cannot be negative"),
});

const SubscriptionAmount = () => {
  const { data, setData } = useStepData();
  const [addUpdateSubscriptionDetailApi, { loading, error }] = useFetch(
    `/investor/add-update-subscription-detail`,
    {
      method: "PUT",
    }
  );

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: SubscriptionAmountSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = async (values: { amount: number }) => {
    try {
      const payload = { ...values, step: 1 }; // Include step in the payload
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

  const handleAmountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setData((prevState) => ({
        ...prevState,
        subscription_amount: numericValue,
      }));
    } else if (value === "") {
      setData((prevState) => ({
        ...prevState,
        subscription_amount: "",
      }));
    }
  };

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Subscription Amount
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        Enter the intended subscription amount (USD) relating to this
        subscription.
      </p>

      <InputField
        required
        className=" bg-[#FCFAFA]"
        value={data?.subscription_amount || ""}
        onChange={handleAmountChange}
        placeholder="e.g. 1,000,000"
        type="text"
        name="subscription_amount"
       
        inputMode="numeric" 
       
        noRadius
        style={{
          appearance: "none",
        }}
      />

      {formik.errors.amount && formik.touched.amount && (
        <div className="text-red-500 mt-2">{formik.errors.amount}</div>
      )}
    </div>
  );
};

export default SubscriptionAmount;
