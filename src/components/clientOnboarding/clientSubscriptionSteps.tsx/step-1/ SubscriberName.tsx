"use client";

import React from "react";
import * as Yup from "yup";
import InputField from "@/components/theme/input";
import { useStepData } from "../../stepper/UseStepData";

const SubscriberName = () => {
  const { data, setData } = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
      Subscriber Name
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
        Enter the intended subscription amount (USD) relating to this
        subscription.
      </p>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        The name must match the name shown on the subscriber's legal ID.
      </p>

      <div className="">
        <div className="mb-4">
          <label className="text-[16px] font-semibold">First Name</label>
          <InputField
            onChange={(e) =>
              setData((prevState) => {
                const dataCopy = { ...prevState };
                dataCopy["subscriber_first_name"] = e.target.value;
                return dataCopy;
              })
            }
            required
            value={data?.subscriber_first_name}
            name="subscriber_first_name"
            placeholder="e.g. John"
            className="h-[51px] border-[0.8px] mt-2 rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100"
          />
        </div>

        <div className="">
          <label className="text-[16px] font-semibold">Last Name</label>
          <InputField
            value={data?.subscriber_last_name}
            onChange={(e) =>
              setData((prevState) => {
                const dataCopy = { ...prevState };
                dataCopy["subscriber_last_name"] = e.target.value;
                return dataCopy;
              })
            }
            required
            name="subscriber_last_name"
            placeholder="e.g. Koundal"
            className="h-[51px] border-[0.8px] mt-2 rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriberName;
