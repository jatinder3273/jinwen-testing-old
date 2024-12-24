import React from "react";
import Progress from "./ProgressBars";
// import "react-circular-progressbar/dist/styles.css";

const Aboutus = () => {
  return (
    <>
      <div
        className="black_overlay bg-fixed p-5 bg-cover"
        style={{
          backgroundImage: "url('/assets/image/fixedBackground.jpg",
        }}
        id="about"
      >
        <div className="w-full max-[768px]:w-[100%] p-10 px-20 bg-[#fff] ml-auto max-w-[1100px] max-[500px]:px-8 relative z-[1]">
          <span className="absolute top-50 bg-[#3190E6] left-0 w-[15px] h-1/4"></span>
          <p className="font-public-sans leading-[56.4px] text-[48px]  text-[#494F53] max-[610px]:text-3xl mb-2 font-bold">
            ABOUT US
          </p>
          {/* <p className="font-public-sans font-[700] leading-[30px] text-[20px] text-[#494F53]  tracking-tight ">
            BINGLIN LI, FOUNDER AND MANAGING PARTNER
          </p> */}
          <p className="font-public-sans font-[300] leading-[30px] text-[20px] text-[#494F53] my-4 max-[768px]:text-[16px] max-[768px]:leading-[20px] min-[1415px]:my-8 max-[500px]:text-justify">
            Black Jade Fintec provides services to industry-leading asset management firms.
          </p>

          <div className="flex justify-center max-[500px]:flex-col gap-2">
            <div className="bg-[#F4F4F4] w-[49%] p-7 border border-[#DCE1E6] border-opacity-50 max-[1147px]:justify-center rounded-r-xl flex items-center justify-between flex-wrap max-[500px]:w-full max-[500px]:rounded max-[500px]:my-1 min-[1200px]:justify-center gap-2 max-[500px]:px-2">
              <Progress strokeWidth={18} percentage={75} />
              <div className="w-1/3 max-[1147px]:w-full max-[500px]:w-1/2">
                <p className="font-public-sans   font-[700] leading-[30px] text-[20px] text-[#494F53]  tracking-tight ml-2 max-[1147px]:text-center">
                  {" "}
                  Returning Customers
                </p>
              </div>
            </div>
            <div className="bg-[#F4F4F4] w-[49%] p-7 ml-1 border border-[#DCE1E6] border-opacity-50  max-[1147px]:justify-center  rounded-l-xl flex items-center justify-between flex-wrap max-[500px]:w-full max-[500px]:rounded max-[500px]:ml-0 min-[1200px]:justify-center gap-2 max-[500px]:px-2">
              <Progress strokeWidth={18} percentage={80} />
              <div className="w-1/3 max-[1147px]:w-full max-[500px]:w-1/2">
                <p className="font-public-sans    font-[700] leading-[30px] text-[20px] text-[#494F53]  tracking-tight ml-2 max-[1147px]:text-center">
                  {" "}
                  Client Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
