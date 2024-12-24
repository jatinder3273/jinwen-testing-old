// "use client";

// import { useState } from "react";
// import CustomButton from "@/components/theme/customButton";
// import useFetch from "@/hooks/useFetch";
// import { useFormik } from "formik";
// import { ByPhoneNoModalSchem } from "@/validationSchema";
// import { toast } from "sonner";
// import PhoneInput from "../theme/phoneNo";

// interface IProps {
//   steps: any;
//   setSteps: any;
// }

// const ContactInformation = ({ setSteps, steps }: IProps) => {
//   const [updateProfileApi, { response, loading, error }] = useFetch(
//     `/auth/update-profile/`,
//     {
//       method: "PUT",
//     }
//   );

//   const formik = useFormik({
//     initialValues: {
//       country_code: "+1",
//       phone_no: "",
//     },
//     validationSchema: ByPhoneNoModalSchem,
//     onSubmit: (values) => {
//       updateProfile(values);
//     },
//   });

//   const updateProfile = async (values: any) => {
//     const res = await updateProfileApi(values);
//     if (res.status) {
//       toast.success(res.message);
//       setSteps(3);
//     } else {
//       toast.error(res.message);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-[90vh] w-[55%] m-auto">
//       <h1 className="text-[40px] font-black text-[#494F53] uppercase mt-7">
//         Enter your contact information.
//       </h1>
//       <p className="text-[16px] font-light text-[#494F53] mt-3">
//         This should be the phone number of the account holder.
//       </p>
//       <div className="flex w-full justify-center mt-10">
//         <div className="w-full">
//           <PhoneInput
//             countryCode={formik.values.country_code}
//             phoneNumber={formik.values.phone_no}
//             onChange={(fullPhoneNumber) => {
//               const [_, countryCode, phoneNo] =
//                 fullPhoneNumber.match(/(\+\d+)(.*)/) || [];
//               formik.setFieldValue("country_code", countryCode || "+1");
//               formik.setFieldValue("phone_no", phoneNo || "");
//             }}
//           />
//         </div>
//       </div>
//       <div className="mt-10 flex gap-6">
//         <CustomButton
//           className="rounded-md !text-[20px] !font-bold !border-none w-[200px]"
//           onClick={() => formik.handleSubmit()}
//         >
//           Next
//         </CustomButton>
//         <CustomButton
//           variantColor="black"
//           variantType="outlined"
//           className="rounded-md !text-[20px] !font-bold w-[200px]"
//           onClick={() => setSteps(2)}
//         >
//           Back
//         </CustomButton>
//       </div>
//     </div>
//   );
// };

// export default ContactInformation;

import React from "react";
import { useFormik } from "formik";
import CustomButton from "@/components/theme/customButton";
import useFetch from "@/hooks/useFetch";
import { ByPhoneNoModalSchem } from "@/validationSchema";
import { toast } from "sonner";
import PhoneInput from "../theme/phone";

interface IProps {
  steps: any;
  setSteps: any;
}

const ContactInformation = ({ setSteps, steps }: IProps) => {
  const [updateProfileApi, { response, loading, error }] = useFetch(
    `/auth/update-profile/`,
    {
      method: "PUT",
    }
  );

  const formik = useFormik({
    initialValues: {
      country_code: "+1",
      phone_no: "",
    },
    validationSchema: ByPhoneNoModalSchem,
    onSubmit: async (values) => {
      const res = await updateProfileApi(values);
      if (res.status) {
        toast.success(res.message);
        setSteps(3);
      } else {
        toast.error(res.message);
      }
    },
  });

  // const handleBlur = () => {
  //   setIsTouched(true);
  //   validatePhoneNumber();
  // };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex justify-center  m-auto flex-col   w-[788px]"
      style={{ height: "calc(100vh - 92px)" }}
    >
      <h1
        className="text-[40px] font-black  text-[#494F53] uppercase mt-7"
        style={{ fontFamily: '"Public Sans", sans-serif' }}
      >
        Enter your contact information.
      </h1>
      <p
        className="text-[16px] font-light text-[#494F53] mt-3"
        style={{ fontFamily: '"Public Sans", sans-serif' }}
      >
        This should be the phone number of the account holder.
      </p>
      <div className="flex w-full justify-center mt-10">
        <div className="w-full">
          <PhoneInput
            className="w-full border-[0.8px] border-[#DCE1E6] bg-white h-[50px] rounded-none placeholder:!text-[#494F53] placeholder:text-[18px]"
            countryCode={formik.values.country_code}
            phoneNumber={formik.values.phone_no}
            onChange={({ countryCode, phoneNumber }) => {
              formik.setFieldValue("country_code", countryCode || "+1");
              formik.setFieldValue("phone_no", phoneNumber || "");
            }}
          />
        </div>
      </div>
      <div className="mt-10 flex gap-6">
        <CustomButton
          className="rounded-none !text-[18px] !font-bold !border-none w-[208px] h-[48px]"
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Next
        </CustomButton>
        <CustomButton
          variantColor="black"
          variantType="outlined"
          className="rounded-none !text-[18px] !font-bold  w-[208px] h-[48px] "
          onClick={() => setSteps(1)}
        >
          Back
        </CustomButton>
      </div>
    </form>
  );
};

export default ContactInformation;
