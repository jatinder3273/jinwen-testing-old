// "use client";

// import InvestorDashboardLayout from "@/components/layouts/investorDashboardLayout";
// import { Step, Stepper } from "react-form-stepper";
// import GeneralSubscriberInfo from "./Step1";

// const ClienSubscriptionSteps = () => {
//   return (
//     <InvestorDashboardLayout title=" " isBgExist={false}>
    // <div className="flex flex-wrap w-full pb-6 items-center mx-4">

   
    //   <div className="flex flex-wrap justify-center w-[1120px] h-auto top-[99px] left-[290px] rounded-[10px] border border-[#D2D7DC] bg-white">
     
    //     <div className="w-[930px] h-[110px] flex justify-center py-8">
    //       <Stepper
    //         activeStep={0}
    //         styleConfig={{
    //           activeBgColor: "#007bff",
    //           activeTextColor: "#ffffff",
    //           completedBgColor: "#5f9ea0",
    //           completedTextColor: "#007bff",
    //           inactiveBgColor: "#d3d3d3",
    //           inactiveTextColor: "#808080",
    //           size: "50px",
    //           circleFontSize: "18px",
    //           labelFontSize: "16px",
    //           borderRadius: "50%",
    //           fontWeight: "500",
    //           padding: "0px",
    //           stepClassName:'w-[930px]'
              
    //         }}
    //       >
    //         <Step
    //           label="General Subscriber Info"
    //           className="font-xs text-[16px] leading-[18.8px] text-[#1C2024]"
    //         />
    //         <Step
    //           label="Suitability Questions"
    //           className="font-medium text-[16px] leading-[18.8px] text-[#1C2024]"
    //         />
    //         <Step
    //           label="KYC/AML Collection"
    //           className="font-medium text-[16px] leading-[18.8px] text-[#1C2024]"
    //         />
    //         <Step
    //           label="Review and Sign"
    //           className="font-medium text-[16px] leading-[18.8px] text-[#1C2024]"
    //         />
    //       </Stepper>
    //     </div>

//         <div className="flex justify-center py-8 w-[930px] mt-16 ">
//           <div className="mb-4 flex flex-wrap justify-start w-full">
//             <GeneralSubscriberInfo />
//           </div>
//         </div>
//       </div>
//       </div>
//     </InvestorDashboardLayout>

//   );
// };

// export default ClienSubscriptionSteps;




"use client";
import { Step, Stepper } from "react-form-stepper";
import React, { useEffect } from "react";
import InvestorDashboardLayout from "@/components/layouts/investorDashboardLayout";




const ClientSubscriptionSteps: React.FC = () => {


  return (
    <>
      <InvestorDashboardLayout
        title=" "
        isBgExist={false} 
      ><div className="flex flex-wrap w-full pb-6 items-center mx-4">

   
      <div className="flex flex-wrap justify-center w-[1120px] h-auto top-[99px] left-[290px] rounded-[10px] border border-[#D2D7DC] bg-white">
     
        <div className="w-[930px] h-[110px] flex justify-center py-8">
          <Stepper
            activeStep={0}
            styleConfig={{
              activeBgColor: "#007bff",
              activeTextColor: "#ffffff",
              completedBgColor: "#5f9ea0",
              completedTextColor: "#007bff",
              inactiveBgColor: "#d3d3d3",
              inactiveTextColor: "#808080",
              size: "50px",
              circleFontSize: "18px",
              labelFontSize: "16px",
              borderRadius: "50%",
              fontWeight: "500",
              padding: "0px",
              stepClassName:'w-[930px]'
              
            }}
          >
            <Step
              label="General Subscriber Info"
              className="font-xs text-[16px] leading-[18.8px] text-[#1C2024]"
            />
            <Step
              label="Suitability Questions"
              className="font-medium text-[16px] leading-[18.8px] text-[#1C2024]"
            />
            <Step
              label="KYC/AML Collection"
              className="font-medium text-[16px] leading-[18.8px] text-[#1C2024]"
            />
            <Step
              label="Review and Sign"
              className="font-medium text-[16px] leading-[18.8px] text-[#1C2024]"
            />
          </Stepper>


        </div>
        <div className="flex flex-wrap justify-center mt-36 mb-16">
       
        </div>
         
        </div>
        </div>
      </InvestorDashboardLayout>
      
   </>
  );
};

export default ClientSubscriptionSteps;
