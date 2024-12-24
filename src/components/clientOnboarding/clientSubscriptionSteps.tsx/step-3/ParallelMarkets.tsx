import React from "react";
import  parallelMarket from '../../../../../public/assets/image/parallelMarket.svg'
import Image from 'next/image'

const ParallelMarkets = () => {
  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Parallel Markets Verification
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
        Connect to Black Jade Capital LLC third party KYC provider, Parallel
        Markets. You will be prompted to consent to share data with Black Jade
        Capital LLC and provide information about yourself, which is required to
        invest.
      </p>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px]"><span className="font-bold">Note:</span> Once you begin the application with Parallel Markets, you won't be able to return to Black Jade Capital LLC until you have finished.</p>

      <div className="mt-8  border border-[#DCE1E6] w-[830px] ">
      <Image src={parallelMarket} alt={'parallelMarket'} />
      </div>
    </div>
  );
};

export default ParallelMarkets;
