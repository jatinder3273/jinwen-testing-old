


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

      <div className="flex justify-between gap-[18px]">
     
        <div
          className={`h-[51px] p-4 py-2 w-full border ${
            isUSPerson ? "border-[#3190E6] bg-[#3190E60F]" : "border-[#DCE1E6] bg-[#FCFAFA]"
          }`}
        >
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

        <div
          className={`bg-[#FCFAFA] h-[51px] p-4 py-2 w-full  border ${
            !isUSPerson ? "border-[#3190E6] bg-[#3190E60F]" : "border-[#DCE1E6]"
          }`}
        >
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
