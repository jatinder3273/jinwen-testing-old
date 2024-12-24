


// import React from "react";
// import Radio from "@/components/theme/radio";
// import { useStepData } from "../../stepper/UseStepData";

// const Personhood = () => {
//   const { data, setData } = useStepData();

//   return (
//     <div className="flex flex-col text-left flex-wrap">
//       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
//         U.S. Personhood
//       </h2>

//       <p className="text-[#494F53] leading-[28px] mt-2  text-[16px] font-normal">
//         Is the subscriber a "U.S. person"? A U.S. person, for individuals, means
//         any:
//       </p>

//       <p className="text-[#494F53] leading-[28px] mt-2 text-[16px]">
//         (a) U.S. citizen (regardless of whether residing in the U.S. or not); or
//       </p>
//       <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px]">
//         (b) U.S. resident alien (e.g., a green card holder or individual with
//         "substantial presence").
//       </p>

//       <div className="flex justify-between">
     
//         <div className="bg-[#FCFAFA] p-4 py-2 w-full  border border-[#DCE1E6]">
//           <Radio
//             name="u_s_personhood"
        
//             checked={data?.u_s_personhood === true || data?.u_s_personhood === "true"}

          
//             value="true" 
//             required
//             label="Yes"
          
//             onChange={(e) =>
//               setData((prevState) => ({
//                 ...prevState,
//                 u_s_personhood: e.target.value === "true" || true, 
//               }))
//             }
//           />
//         </div>

    
//         <div className="bg-[#FCFAFA] p-4 py-2 w-full ms-2 border border-[#DCE1E6]">
//           <Radio
//             name="u_s_personhood"
        
//             checked={data?.u_s_personhood === false || data?.u_s_personhood === "false"}
//             value="false" 
          
//             required
//             label="No"
           
//             onChange={(e) =>
//               setData((prevState) => ({
//                 ...prevState,
//                 u_s_personhood: e.target.value === "false" || false, 
//               }))
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Personhood;




import React from "react";
import Radio from "@/components/theme/radio";
import { useStepData } from "../../stepper/UseStepData";

const Personhood = () => {
  const { data, setData } = useStepData();

 
  const isUSPerson = data?.u_s_personhood === true || data?.u_s_personhood === "true";

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        U.S. Personhood
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
        Is the subscriber a "U.S. person"? A U.S. person, for individuals, means
        any:
      </p>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px]">
        (a) U.S. citizen (regardless of whether residing in the U.S. or not); or
      </p>
      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px]">
        (b) U.S. resident alien (e.g., a green card holder or individual with
        "substantial presence").
      </p>

      <div className="flex justify-between">
       
        <div className="bg-[#FCFAFA] h-[51] p-4 py-2 w-full border border-[#DCE1E6]">
          <Radio
            name="u_s_personhood"
            checked={isUSPerson} 
            value="true"
            required
            label="Yes"
            onChange={() =>
              setData((prevState) => ({
                ...prevState,
                u_s_personhood: true,
              }))
            }
          />
        </div>

        {/* No Option */}
        <div className="bg-[#FCFAFA] h-[51] p-4 py-2 w-full ms-2 border border-[#DCE1E6]">
          <Radio
            name="u_s_personhood"
            checked={!isUSPerson} 
            value="false"
            required
            label="No"
            onChange={() =>
              setData((prevState) => ({
                ...prevState,
                u_s_personhood: false,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Personhood;
