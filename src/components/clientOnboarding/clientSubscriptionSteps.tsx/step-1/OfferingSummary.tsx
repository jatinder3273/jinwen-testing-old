import React from "react";

export const OfferingSummary = () => {
  return (
      <div className="flex flex-col justify-start flex-wrap">
        <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
          Offering Summary
        </h2>

        <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
          These terms are offered to you by BullSP Capital LLC. In the event of
          conflict between the offering documents and the terms listed below,
          the offering documents shall prevail except for as amended by any side
          letters or other agreements.
        </p>

        <h2 className="text-[24px] md:text-[2rem]  leading-[28.8px] mt-8 mb-8">
          Basic details
        </h2>

        <div className="flex justify-between font-medium  text-[20px] leading-[23.5px] text-center mt-4 border-b text-[#494F53] border-[#D2D7DC]">
          <p className="mb-4">Minimum Investment</p>

          <p className="text-[#1C2024]">$50,000</p>
        </div>
        <div className="flex justify-between font-medium text-[20px] leading-[23.5px] text-center mt-4 border-b text-[#494F53] border-[#D2D7DC]">
          <p className="mb-4">Management Fee</p>
          <div className="text-right">

          <p className="text-[#1C2024]">1.5% Annually</p>
          <p className="text-[16px]">0.125% Collected Monthly</p>
          </div>

        </div>
        <div className="flex justify-between font-medium text-[20px] leading-[23.5px] text-center mt-4 border-b text-[#494F53] border-[#D2D7DC]">
          <p className="mb-4">Performance Fee</p>
          <div className="text-right">
          <p className="text-[#1C2024]">20%</p>
          <p className="text-[16px]">Assessed Annually</p>
          </div>
        </div>
        <div className="flex justify-between font-medium text-[20px] leading-[23.5px] text-center mt-4 border-b text-[#494F53] border-[#D2D7DC]">
          <p className="mb-4">Lockup Period</p>

          <p className="text-[#1C2024]">365 days</p>
        </div>
        <div className="flex justify-between font-medium text-[20px] leading-[23.5px] text-center mt-4 border-b text-[#494F53] border-[#D2D7DC]">
          <p className="mb-4">Hurdle</p>

          <p className="text-[#1C2024]">No Hurdle</p>
        </div>
      </div>
  );
};

export default OfferingSummary;
