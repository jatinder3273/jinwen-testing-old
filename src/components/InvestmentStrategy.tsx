import React from "react";
import Image from "next/image";
import NextImage from "./theme/nextImage";

const InvestmentStrategy = () => {
  return (
    <div className="relative">
      <NextImage
        src="/assets/image/center.png"
        alt="center"
        className="max-[768px]:hidden absolute w-[277px] z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        width={277}
        height={277}
      />

      <div className="flex  justify-between max-w-[1100px] mx-auto mt-20 max-[768px]:flex-col min-[1700px]:max-w-[85%] ">
        <div className="w-[45%] max-[768px]:w-[90%] max-[768px]:mx-auto  max-[768px]:my-4 px-auto bg-[#F4F4F4]  border border-[#DCE1E6] py-10 relative max-[473px]:text-center border-opacity-50">
          <NextImage
            height={85}
            width={85}
            src="/assets/image/no1.png"
            alt="1"
            className="h-[85px] absolute top-[-20px] left-[-1px] max-[868px]:h-[53px] max-[868px]:top-[-12px] max-[868px]:left-[-2px] max-[768px]:h-[78px] max-[768px]:top-[-18px]"
          />

          <div className="w-[60%] max-[643px]:w-[80%] max-[643px]:mr-1 mx-auto">
            <p className="font-public-sans font-[700] leading-[30px] text-[24px]  text-[#494F53] ">
              Technology
            </p>
            <p className="font-public-sans py-3 max-[610px]:px-2 text-[#494F53] font-[300] leading-[30px] text-[20px] max-[768px]:text-[16px] max-[768px]:leading-[20px] ">
              We use technology to develop our algorithms, helping hedge funds calculate the exposure value of their portfolios.
            </p>
          </div>
        </div>

        <div className="w-[45%] max-[768px]:w-[90%] max-[768px]:mx-auto  max-[768px]:my-4 px-auto bg-[#F4F4F4]  border border-[#DCE1E6]  py-10 text-right relative max-[473px]:text-center border-opacity-50">
          <NextImage
            height={85}
            width={85}
            src="/assets/image/no2.png"
            alt="2"
            className="h-[85px] absolute top-[-20px] right-[-1px] max-[868px]:h-[53px] max-[868px]:top-[-12px] max-[868px]:right-[-2px] max-[768px]:h-[78px] max-[768px]:top-[-18px]"
          />
          <div className="w-[60%] mx-auto  max-[643px]:w-[80%] max-[643px]:ml-1 ">
            <p className="font-public-sans font-[700] leading-[30px] text-[24px]  text-[#494F53] ">
              Ease of Use
            </p>
            <p className="font-public-sans py-3 max-[610px]:px-2 text-[#494F53] font-[300] leading-[30px] text-[20px] max-[768px]:text-[16px] max-[768px]:leading-[20px] ">
              Our features provided to investors and administrators are easy to use and clearly displayed on our dashboard. 
            </p>
          </div>
        </div>
      </div>

      <div className="flex  justify-between max-w-[1100px]  mx-auto mt-20 max-[768px]:mt-0 max-[768px]:flex-col min-[1700px]:max-w-[85%] ">
        <div className="w-[45%] max-[768px]:w-[90%] max-[768px]:mx-auto  max-[768px]:my-4 px-auto bg-[#F4F4F4]  border border-[#DCE1E6]  py-10 relative max-[473px]:text-center border-opacity-50">
          <NextImage
            height={85}
            width={85}
            src="/assets/image/no3.png"
            alt="3"
            className="h-[85px] absolute top-[-20px] left-[-1px] max-[868px]:h-[53px] max-[868px]:top-[-12px] max-[868px]:left-[-2px] max-[768px]:h-[78px] max-[768px]:top-[-18px]"
          />
          <div className="w-[60%] mx-auto  max-[643px]:w-[80%] max-[643px]:mr-1">
            <p className="font-public-sans font-[700] leading-[30px] text-[24px]  text-[#494F53] ">
              Compliance
            </p>
            <p className="font-public-sans py-3 max-[610px]:px-2 text-[#494F53] font-[300] leading-[30px] text-[20px] max-[768px]:text-[16px] max-[768px]:leading-[20px]  ">
              We are commmitted to operating with a high ethical and legal focus. 
            </p>
          </div>
        </div>

        <div className="w-[45%] max-[768px]:w-[90%] max-[768px]:mx-auto  max-[768px]:my-4 px-auto bg-[#F4F4F4]  border border-[#DCE1E6] py-10 text-right relative max-[473px]:text-center border-opacity-50">
          <NextImage
            height={85}
            width={85}
            src="/assets/image/no4.png"
            alt="4"
            className="h-[85px] absolute top-[-20px] right-[-1px] max-[868px]:h-[53px] max-[868px]:top-[-12px] max-[868px]:right-[-2px] max-[768px]:h-[78px] max-[768px]:top-[-18px]"
          />
          <div className="w-[60%] mx-auto  max-[643px]:w-[80%] max-[643px]:ml-1">
            <p className="font-public-sans font-[700] leading-[30px] text-[24px]  text-[#494F53] ">
              Transparency
            </p>
            <p className="font-public-sans py-3 max-[610px]:px-2 text-[#494F53] font-[300] leading-[30px] text-[20px] max-[768px]:text-[16px] max-[768px]:leading-[20px]  ">
              Our interactive and easy to use interface lets investors track and manage their investments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentStrategy;
