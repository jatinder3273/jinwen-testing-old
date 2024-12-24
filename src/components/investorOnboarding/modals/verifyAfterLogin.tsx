// "use client";
// import React, { useEffect, useState } from "react";
// import ModalLayout from "@/components/modalLayout";
// import InputField from "@/components/theme/input";
// import CustomButton from "@/components/theme/customButton";
// import { usePathname, useRouter } from "next/navigation";
// import useFetch from "@/hooks/useFetch";
// import { useFormik } from "formik";
// import { toast } from "sonner";
// import { verification2FASchema } from "@/validationSchema";
// import useAuthService from "@/utils/authService";
// import {
//   clearTokenForResendApi,
//   getTokenForResendApi,
// } from "@/utils/Functions";
// import country_codes from "@/utils/country_code";

// interface Iprops {
//   show?: boolean;
//   setSteps?: any;
// }

// interface TwoFactorAuthData {
//     two_factor_type: number;
//     email: string;
//     phone_no?: string;
//     country_code?: string; 
//   }

// const VerifyAfterLoginModal = ({ show, setSteps }: Iprops) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [phoneCode, setPhoneCode] = useState("");
//   const [type2FA, setType2FA] = useState<number>(0);
//   const [errorRes, setErrorRes] = useState<boolean>(true);
  
//   const { storeToken, getToken, clearToken } = useAuthService();
//   const tokenLogin = getToken();
// //   const[token,setToken]= useState(localStorage.getItem('enableToken'));


// //   useEffect(()=>{
// //     if(localStorage.getItem('enableToken')){
// //       console.log('token');
// //         setToken(localStorage.getItem('enableToken'));
// //     }else{
// //       console.log('token2');
// //        setToken(tokenLogin);
// //     }
// //   },[])

//   const [verifyTwoFactorApi, { response, loading, error }] = useFetch(
//     `/auth/verify-twofactor/${tokenLogin}/`,
//     {
//       method: "PUT",
//     },
//     true
//   );

//   const [enableTwoFactorApi] = useFetch(
//     `/auth/enable-twofactor/`,
//     {
//       method: "PUT",
//     },
//     true
//   );

//   useEffect(() => {
//     if (pathname.includes("/login")) {
//       setEmail(localStorage.getItem("emailLogin"));
//       setPhoneCode(localStorage.getItem("phoneCode") || "");
//       setPhone(localStorage.getItem("phone") || "");
//       setType2FA(parseInt(localStorage.getItem("twoFactorType")));
//     } else {
//     //   setEmail(localStorage.getItem("decodedEmail"));
//     //   setPhone(localStorage.getItem("decodedPhone"));
//     //   setPhoneCode(localStorage.getItem("decodedPhoneCode"));
//     //   setType2FA(parseInt(localStorage.getItem("decodedTwoFA")));
//     }
//   }, []);

// //   const handleTwoFactorAuthViaEmail = async () => {
// //     let newValues = {
// //       two_factor_type: type2FA,
// //       email: email,
// //       phone_no: phone,
// //       country_code: phoneCode,
// //     };
// //     const res = await enableTwoFactorApi(newValues);
// //     // storeToken(res?.data, res?.data?.role?.id);
// //     if (res.status) {
// //       toast.success(res.message);
// //     }
// //   };



// const handleTwoFactorAuthViaEmail = async () => {
//     let newValues: TwoFactorAuthData = {
//       two_factor_type: type2FA,
//       email: email,
//     };
  
//     // Conditionally add phone_no and country_code if type2FA is 2
//     if (type2FA === 2) {
//       newValues.phone_no = phone;
//       newValues.country_code = phoneCode;
//     }
  
//     // Call the API
//     const res = await enableTwoFactorApi(newValues);
  
//     // If the response is successful, show a success toast
//     if (res.status) {
//         storeToken(res?.data, res?.data?.role?.id)
//       toast.success(res.message);
//     }
//   };



//   useEffect(() => {
//     if (errorRes) {
//       console.log("err");
//     }
//   }, [errorRes]);

//   const formik = useFormik({
//     initialValues: {
//       verification_code: "",
//     },
//     validationSchema: verification2FASchema,
//     onSubmit: (values) => {
//       handleVerifyTwofactor(values);
//     },
//   });

//   const handleVerifyTwofactor = async (values: any) => {
//     const res = await verifyTwoFactorApi(values);

//     if (res?.status === 0) {
//       toast.error(res.message);
//       return;
//     }

//     if (pathname.includes("/login")) {
//       clearTokenForResendApi();



     
//       setToken(res?.data?.token)
//       if (res?.data?.first_name) {
//         storeToken(res?.data?.token, res?.data?.role?.id);
//         router.push("/clientOnboarding/dashboard");
//       } else {
//         router.push("/clientOnboarding");
//       }
//     } else {
//       if (res?.status === 1) {
//         clearToken();
//         clearTokenForResendApi();
//         setTimeout(() => {
//           router.push("/auth/login");
//         }, 100);
//       }
//     }

//     if (res.status) {
//       toast.success(res.message);
//     } else {
//       toast.error(res.message);
//     }
//   };

//   return (
//     <ModalLayout title="" show={show} handleToggle={() => ""} size={600}>
//       <div>
//         <h1
//           className="text-[39px] font-black text-[#494F53] uppercase"
//           style={{ fontFamily: '"Public Sans", sans-serif' }}
//         >
//           Verify login
//         </h1>
//         <p
//           className="text-[16px] font-light text-[#494F53] mb-4"
//           style={{ fontFamily: '"Public Sans", sans-serif' }}
//         >
//           Please enter the 6 digit code sent to{" "}
//           <strong className="font-bold">
//             {type2FA === 1 ? email : `${phoneCode}${phone}`}{" "}
//           </strong>
//         </p>
//         <div>
//           <InputField
//             className="!rounded-none"
//             formik={formik}
//             name="verification_code"
//             placeholder="Enter Verification Code"
//             required
//           />

//           <div className="flex justify-between space-x-4 mt-10">
//             <CustomButton
//               className="rounded-none !text-[18px]  !font-bold !border-none w-[249px] h-[48px]"
//               onClick={() => formik.handleSubmit()}
//               loading={loading}
//               disabled={loading}
//             >
//               Submit
//             </CustomButton>
//             <CustomButton
//               variantColor="black"
//               variantType="outlined"
//               className="rounded-none !text-[18px] !font-bold w-[249px] h-[48px]"
//               onClick={handleTwoFactorAuthViaEmail}
//             >
//               Resend Code
//             </CustomButton>
//           </div>
//         </div>
//       </div>
//     </ModalLayout>
//   );
// };

// export default VerifyAfterLoginModal;



"use client";
import React, { useEffect, useState } from "react";
import ModalLayout from "@/components/modalLayout";
import InputField from "@/components/theme/input";
import CustomButton from "@/components/theme/customButton";
import { usePathname, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { useFormik } from "formik";
import { toast } from "sonner";
import { verification2FASchema } from "@/validationSchema";
import useAuthService from "@/utils/authService";
import {
  clearTokenForResendApi,
  getTokenForResendApi,
} from "@/utils/Functions";
import country_codes from "@/utils/country_code";

interface Iprops {
  show?: boolean;
  setSteps?: any;
}

interface TwoFactorAuthData {
  two_factor_type: number;
  email: string;
  phone_no?: string;
  country_code?: string;
}

const VerifyAfterLoginModal = ({ show, setSteps }: Iprops) => {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [type2FA, setType2FA] = useState<number>(0);
  const [errorRes, setErrorRes] = useState<boolean>(true);

  const { storeToken, getToken, clearToken } = useAuthService();
 

  const[token,setToken]=useState(localStorage.getItem('tokenAfterLogin'))


  const [enableTwoFactorApi] = useFetch(
    `/auth/enable-twofactor/`,
    {
      method: "PUT",
    },
    true
  );

  useEffect(() => {
    if (pathname.includes("/login")) {
      setEmail(localStorage.getItem("emailLogin"));
      setPhoneCode(localStorage.getItem("phoneCode") || "");
      setPhone(localStorage.getItem("phone") || "");
      setType2FA(parseInt(localStorage.getItem("twoFactorType")));
    }
  }, [pathname]);

  // Handle Resend Code and Update Token
  const handleTwoFactorAuthViaEmail = async () => {
    let newValues: TwoFactorAuthData = {
      two_factor_type: type2FA,
      email: email,
    };

    // Conditionally add phone_no and country_code if type2FA is 2
    if (type2FA === 2) {
      newValues.phone_no = phone;
      newValues.country_code = phoneCode;
    }

    // Call the API to resend the code
    const res = await enableTwoFactorApi(newValues);

    if (res.status) {
      // Update token after receiving it from the API response
      setToken(res?.data);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const [verifyTwoFactorApi, { response, loading, error }] = useFetch(
    `/auth/verify-twofactor/${token}/`,
    {
      method: "PUT",
    },
    true
  );

  // Handle Verification after Resend Code
  const handleVerifyTwofactor = async (values: any) => {
    const updatedToken = getToken(); // Assuming getToken fetches the most recent token

    const res = await verifyTwoFactorApi({ ...values, token: updatedToken });

    if (res?.status === 0) {
      toast.error(res.message);
      return;
    }

    if (pathname.includes("/login")) {
      clearTokenForResendApi();
    //   setToken(res?.data?.token);
    storeToken(res?.data?.token, res?.data?.role?.id);
      if (res?.data?.first_name) {
       
        router.push("/clientOnboarding/dashboard");
      } else {
        router.push("/clientOnboarding");
      }
    } else {
      if (res?.status === 1) {
        // debugger
        clearToken();
        clearTokenForResendApi();
        console.log("hdfhdf",res?.data.token)

        storeToken(res?.data?.token, res?.data?.role?.id);
        // setTimeout(() => {
        //   router.push("/auth/login");
        // }, 100);
      }
    }

    if (res.status) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      verification_code: "",
    },
    validationSchema: verification2FASchema,
    onSubmit: (values) => {
      handleVerifyTwofactor(values);
    },
  });

  return (
    <ModalLayout title="" show={show} handleToggle={() => ""} size={600}>
      <div>
        <h1
          className="text-[39px] font-black text-[#494F53] uppercase"
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          Verify login
        </h1>
        <p
          className="text-[16px] font-light text-[#494F53] mb-4"
          style={{ fontFamily: '"Public Sans", sans-serif' }}
        >
          Please enter the 6 digit code sent to{" "}
          <strong className="font-bold">
            {type2FA === 1 ? email : `${phoneCode}${phone}`}{" "}
          </strong>
        </p>
        <div>
          <InputField
            className="!rounded-none"
            formik={formik}
            name="verification_code"
            placeholder="Enter Verification Code"
            required
          />

          <div className="flex justify-between space-x-4 mt-10">
            <CustomButton
              className="rounded-none !text-[18px]  !font-bold !border-none w-[249px] h-[48px]"
              onClick={() => formik.handleSubmit()}
              loading={loading}
              disabled={loading}
            >
              Submit
            </CustomButton>
            <CustomButton
              variantColor="black"
              variantType="outlined"
              className="rounded-none !text-[18px] !font-bold w-[249px] h-[48px]"
              onClick={handleTwoFactorAuthViaEmail}
            >
              Resend Code
            </CustomButton>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default VerifyAfterLoginModal;
