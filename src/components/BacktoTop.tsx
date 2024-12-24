"use client";
import Image from "next/image";
import React from "react";

const BacktoTop = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="bg-[#494F53] h-[98px] text-[#fff] items-center justify-center py-6 cursor-pointer flex font-[300] leading-[23.5px] text-[20px] "
      onClick={() => goToTop()}
    >
      Back To Top
      <Image
        src="/assets/image/Back.png"
        alt="back"
        height={32}
        width={32}
        className="ml-2 "
      />
    </div>
  );
};

export default BacktoTop;
