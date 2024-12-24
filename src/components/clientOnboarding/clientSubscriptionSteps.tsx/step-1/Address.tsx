

import React, {useEffect, useRef, useState} from "react";
import { toast } from "sonner";
import InputField from "@/components/theme/input";
import { useStepData } from "../../stepper/UseStepData";
import useFetch from "@/hooks/useFetch";
import SelectField from "@/components/theme/select";

const countryOptions = [{ label: "United States", value: 1, flag: "🇺🇸" }];

const Address = () => {
  const [states, setStates] = useState([]);
  const { data, setData } = useStepData();
  const countrySelector = useRef<HTMLSelectElement>(null);

  const [getStateApi] = useFetch("/admin/state-list/", {
    method: "POST",
  });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getStateApi();
        if (res.status) {
          const stateOptions = res.data.map((state) => ({
            id: state.id,
            name: state.name,
          }));
          setStates(stateOptions);
        } else {
          toast.error(res.message || "Failed to fetch states");
        }
      } catch (err) {
        toast.error("API call failed");
      }
    };
    fetchStates();
  }, []);

    useEffect(() => {
        if (countrySelector.current && data && !data.country) {
            console.log("auto selecting country")
            countrySelector.current.value = '1';
            const event = new Event('change', { bubbles: true });
            countrySelector.current.dispatchEvent(event);
        } else if (data && countrySelector.current) {
            console.log("Country: ", countrySelector?data.country:"hah")
        }
    }, [countrySelector, data]);

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">Address</h2>
      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        What is the primary address of the subscriber?
      </p>

      <div className="">
        <div className="mb-4">
          <label className="text-[16px] font-semibold">Address line 1</label>
          <InputField
            required
            value={data?.address_line_1}
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                address_line_1: e.target.value,
              }))
            }
            name="address_line_1"
            placeholder="e.g. 123 Main St"
            className="h-[51px] w-full mt-2 border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100 p-2"
          />
        </div>

        <div className="mb-4">
          <label className="text-[16px] font-semibold">Address line 2</label>
          <InputField
            value={data?.address_line_2}
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                address_line_2: e.target.value,
              }))
            }
            name="address_line_2"
            placeholder="e.g. Apt 4B"
            className="h-[51px] w-full mt-2 border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100 p-2"
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="mb-4 w-full">
            <label className="text-[16px] font-semibold">City</label>
            <InputField
              required
              value={data?.city}
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  city: e.target.value,
                }))
              }
              name="city"
              placeholder="e.g. New York"
              className="h-[51px] w-full mt-2  border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100 p-2"
            />
          </div>
          <div className="mb-4 w-full gap-[10px]">
            <label className="text-[16px] font-semibold">State/Province / Region</label>
            <select
              required
              name="state"
              value={data?.state || ""}
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  state: parseInt(e.target.value),
                }))
              }
              className="h-[51px] w-full mt-2  border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100 p-2"
              disabled={!states.length}
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="mb-4 w-full">
            <label className="text-[16px] font-semibold">Postal / ZIP Code</label>
            <InputField
              required
              value={data?.zip_code}
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  zip_code: e.target.value,
                }))
              }
              name="zip_code"
              placeholder="e.g. 10001"
              type="text" 
        inputMode="numeric" 
       
        noRadius
        style={{
          appearance: "none",
        }}
              className="h-[51px] mt-2 border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="text-[16px] font-semibold">Country</label>

            <select
              required
              ref={countrySelector}
              value={data?.country}
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  country: parseInt(e.target.value),
                }))
              }
              data-type={"number"}
              name="country"
              className="h-[51px] w-full mt-2 border-[0.8px] rounded-none border-[#DCE1E6] bg-[#FCFAFA] opacity-100 p-2"
            >
                {countryOptions.map(countryOption=> (<option key={countryOption.value} value={countryOption.value}> {countryOption.flag} {countryOption.label}</option>))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;