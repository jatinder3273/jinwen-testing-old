"use client";
import React, { Fragment, useRef, useState } from "react";
import { TabData } from "../dummy/TabData";
import Image from "next/image";
import NextImage from "./theme/nextImage";

const Features = () => {
  const [tab, setTab] = useState(0);
  const featuresSectionRef = useRef<HTMLDivElement>(null);

  const handleAboutClick = (index) => {
    // Scroll to the about section
    setTab(index);
    if (featuresSectionRef.current) {
      featuresSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="max-w-[1100px] mx-auto min-[1700px]:max-w-[85%]"
      id="feature"
    >
      <p className="font-public-sans  max-[767px]:text-center  uppercase text-[#494F53] max-[610px]:text-3xl font-[900] leading-[66px] text-[48px]">
        <span className="text-[#3190E6]">features</span> that track
      </p>
      <p className="font-public-sans  max-[767px]:text-center   uppercase text-[#494F53] max-[610px]:text-3xl  font-[900] leading-[66px] text-[48px]">
        real-time investments 
      </p>
      <p className="font-public-sans text-[#494F53] font-[300] leading-[30px] text-[20px] my-4 max-w-[780px] max-[767px]:text-center max-[767px]:max-w-[556px] max-[767px]:mx-auto max-[768px]:text-[16px] max-[768px]:leading-[20px] ">
        Using technology, data, and financial algorithms, we have made it easier for you to track and monitor your investments.
      </p>
      <div className="flex items-center justify-center  ">
        <div className="container h-full flex justify-between items-stretch max-[767px]:flex-col ">
          <div
            className="flex-grow w-1/2 max-[767px]:w-9/12 max-[767px]:mx-auto"
            id="features"
            ref={featuresSectionRef}
          >
            {TabData.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`px-6 py-8 mb-2 ${
                    tab === index ? "bg-fff" : "hidden"
                  }`}
                >
                  <NextImage
                    src={item.details}
                    alt={`tab ${index}`}
                    width={600}
                    height={600}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col w-1/2  max-[767px]:w-full max-[767px]:mx-auto py-8">
            {TabData.map((item, index) => {
              return (
                <Fragment key={index}>
                  <button
                    onClick={() => {
                      handleAboutClick(index);
                    }}
                    className={`py-6 px-6  leading-none relative mb-8 rounded-sm border ${
                      tab === index
                        ? "bg-white border-t-8  border-[#494F53] shadow-lg border-b-0 border-l-0 border-r-0 border-opacity-100 "
                        : " bg-opacity-50 hover:bg-gray-100 focus:outline-none focus:shadow-outline border-[#DCE1E6] border-opacity-50 "
                    }`}
                    style={
                      tab !== index
                        ? {
                            backgroundImage:
                              "linear-gradient(45deg, #fff 0%, rgba(220,225,230,0.2) 100%)",
                          }
                        : null // If tab === index, no additional styles
                    }
                  >
                    <div className="flex justify-between ">
                      <div className="w-2/6 max-[1023px]:w-1/2">
                        <NextImage
                          src={item.icon}
                          alt="icon"
                          className="w-10"
                          height={40}
                          width={40}
                        />
                      </div>
                      <div>
                        <p className="font-public-sans font-[700] leading-[30px] text-[24px] text-[#494F53] text-left ">
                          {item.Title}
                        </p>
                        <p className="font-public-sans font-[300] leading-[30px] text-[20px] text-[#494F53] text-left my-4 max-[768px]:text-[16px] max-[768px]:leading-[20px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {tab !== index && (
                      <span className="absolute top-0 bg-[#DAE0E7] left-0 h-[7px] w-1/5"></span>
                    )}
                  </button>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
