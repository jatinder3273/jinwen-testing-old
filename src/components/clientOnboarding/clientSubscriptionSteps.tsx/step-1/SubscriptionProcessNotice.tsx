import React from "react";
import { useStepData } from "../../stepper/UseStepData";

export const SubscriptionProcessNotice = () => {
  const { data, setData } = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Subscription Process Notice
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        CAREFULLY READ THE FOLLOWING BEFORE PROCEEDING:
      </p>

      <div className="bg-[#FCFAFA] p-4  border border-[#DCE1E6] rounded-md">
        <span>
          You have selected that an authorized representative will act on your
          behalf. Joint Tenants with Right of Survivorship On the following
          step, input the name and email of your authorized representative
          contact to invite them to join this subscription. If you have not yet
          contacted your authorized representative, save and exit and contact
          your custodian before continuing. Tenants in Common Each subscription
          question can be completed/edited by either you or your authorized
          representative Both parties must digitally sign this subscription
          once it is filled out in order to subscribe. Please coordinate with
          your authorized representative to understand which questions you
          should complete versus what they will complete. The most common
          workflow is for them to complete questions on your behalf and for you
          to review; however, you should coordinate with your authorized
          representative.
        </span>

        <div className="mt-3 flex items-start gap-2">
          <input
            id="subscription_process_notice"
            name="subscription_process_notice"
            type="checkbox"
            required
            className="form-checkbox cursor-pointer mt-1"
            checked={data?.subscription_process_notice || false} // Ensuring default value if not set
            onChange={(e) =>
              setData((prevState) => {
                const dataCopy = { ...prevState };
                dataCopy.subscription_process_notice = e.target.checked; // Use e.target.checked to get the checkbox state
                return dataCopy;
              })
            }
          />
          <label
            htmlFor="subscription_process_notice"
            className="text-[#494F53] text-[14px] cursor-pointer mt-0"
          >
            I have read and understood these instructions.
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionProcessNotice;
