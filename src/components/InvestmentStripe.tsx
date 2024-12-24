"use client";
import React from "react";
import { InvestmentData } from "@/dummy/InvestmentData";
import { motion } from "framer-motion";
import NextImage from "./theme/nextImage";

const InvestmentStripe = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex justify-between items-center max-[1048px]:justify-center max-[1048px]:gap-4 max-[715px]:gap-2 gap-0 flex-wrap w-full">
      {InvestmentData?.map((item, index) => {
        return (
          <motion.div
            key={index}
            className="bg-[#494F53] py-[50px] max-[715px]:min-w-full min-w-[367px] mb-5 relative max-[715px]:py-[10px] flex-grow"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <p className="font-public-sans text-center font-[800] leading-[75.2px] text-[64px] text-[#ffffff] max-[768px]:text-[32px] max-[768px]:leading-[45.2px]">
              {item.price}+
            </p>
            <p className="font-public-sans text-center font-[300] leading-[23.5px] text-[20px] text-[#ffffff]">
              {item.description}
            </p>
            {index !== InvestmentData.length - 1 && (
              <NextImage
                src="/assets/image/Vector3.png"
                className="absolute z-40 bottom-0 max-[1048px]:hidden right-[-39px] max-[1049px]:right-[0px] top-[-8px] h-[217px]"
                height={200}
                alt="vector"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default InvestmentStripe;
