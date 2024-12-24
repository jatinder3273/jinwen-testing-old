"use client";
import Aboutus from "@/components/Aboutus";
import InvestmentStrategy from "@/components/InvestmentStrategy";
import InvestmentStripe from "@/components/InvestmentStripe";
import Layout from "@/components/Layout";

import React, { useState } from "react";
import Features from "./Features";
import Contact from "./Contact";
import BacktoTop from "./BacktoTop";
import Footer from "./Footer";
import Testimonial from "./Testimonial";
import NextImage from "./theme/nextImage";

const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <Layout>
      <div className=" relative bg-[#494F53] h-[662px] min-[1415px]:h-[900px] max-[610px]:h-[428px]  overflow-hidden  ">
        <div className="relative bg-[url('/assets/image/groupBanner.png')] mr-5 max-[909px]:mr-0 max-[909px]:bg-right-bottom overflow-hidden  max-[610px]:bg-[url('/assets/image/groupBanner.png')] bg-no-repeat bg-cover bg-center h-[724px] pt-[180px] pl-[150px] max-[610px]:h-[500px]  max-[610px]:pt-[50px] max-[610px]:pl-[30px] max-[610px]:pr-3  max-[768px]:pt-[90px] max-[768px]:pl-[90px] min-[1415px]:h-[982px]">
          <div>
            <p className="font-public-sans  max-[610px]:text-4xl text-white font-bold leading-[85px] text-[58px] ">
              Revolutionizing Fund
            </p>
            <p className="font-public-sans font-bold leading-[85px] text-[58px] text-white max-[610px]:text-4xl">
              Management and
            </p>
            <p className="font-public-sans   max-[610px]:text-4xl text-white font-bold leading-[75.2px] text-[58px] my-4 ">
              Stock Market <span className="text-white">Performance</span>
            </p>
            <p className="font-public-sans font-bold leading-[23.5px] text-[20px] text-white my-4 ">
              Our features and interface make tracking investments simpler.
            </p>

            <button
              onClick={() => {
                setShow(true);
                window.open("https://www.blackjadecapitalllc.com", "_blank");
              }}
              className="max-w-[180px]"
            >
              <img
                src="/assets/image/watchVideo.png"
                alt="video"
                width={180}
                className="w-full"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="max-[715px]:px-3">
        <InvestmentStripe />
      </div>
      <div className="my-20 px-3" id="Strategy">
        <p className="font-public-sans font-[900] leading-[56.4px] text-[48px]   text-[#494F53] max-[610px]:text-3xl text-center ">
          OUR STRATEGY
        </p>
        <p className="font-public-sans text-center  font-[300] leading-[30px] text-[20px] text-[#494F53] my-4 max-w-[968px] mx-auto max-[768px]:text-[16px] max-[768px]:leading-[20px] ">
          Our strategy is to provide industry-leading services to hedge funds.
          We pride ourselves on transparency and ease of use. Additionally, we
          provide technological features that make it easier for investors to
          track their investments and administrators to track investment data.
          Our notable features include an algorithm that calculates a
          portfolio's exposure value and user-friendly interfaces.
        </p>
        <InvestmentStrategy />
      </div>

      <Aboutus />
      <div className="pt-20 px-3">
        <Features />
      </div>

      <Testimonial />
      <div className="pt-20 ">
        <Contact />
      </div>
      <BacktoTop />

      <Footer />
    </Layout>
  );
};

export default Home;
