import React from "react";
import Sliders from "./Slider";

const Testimonial = () => {
  return (
    <>
      <div
        className="bg-gradient-to-r from-[#DCE1E6] to-[#F4F4F4] pt-20 px-3 "
        id="testimonial"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(244, 244, 244, 0.65) 48.81%, rgba(244, 244, 244, 0) 96.12%)",
        }}
      >
        <p className="font-public-sans text-center  uppercase text-[#494F53] max-[610px]:text-3xl  font-[900] leading-[57px] text-[48px]">
          Client Testimonials
        </p>

        <p className="font-public-sans text-[#494F53] my-4  max-w-[500px] text-center max-[767px]:max-w-[500px] mx-auto font-[300] leading-[30px] text-[20px] max-[768px]:text-[16px] max-[768px]:leading-[20px] ">
          Black Jade Fintec provides services for investors and administrators that make their investing experiences easy and transparent. 
          See what our clients have to say!
        </p>
        <Sliders />
      </div>
    </>
  );
};

export default Testimonial;
