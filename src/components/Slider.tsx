"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonial } from "../dummy/Testimonials";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import NextImage from "./theme/nextImage";

export default function Slider() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
      // autoplay={{
      //   //add
      //   delay: 0, //add
      // }}
      // speed={3000}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          // spaceBetween: 5,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {testimonial.map((testimonial, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              className="bg-white  py-5 px-14 border border-[#DCE1E6] border-opacity-50 abc"
              key={index}
            >
              <div className="mx-auto flex flex-col items-center justify-center">
                <NextImage
                  height={96}
                  width={96}
                  src={testimonial.user}
                  alt="user"
                  className="h-[96px] "
                />
                <h3 className="font-public-sans text-center font-[300] leading-[20px] text-[16px] text-[#494F53] my-4  mx-auto">
                  {testimonial.content}
                </h3>
                <NextImage
                  height={24}
                  width={140}
                  src={testimonial.stars}
                  alt="stars"
                  className="h-6 w-[140px]"
                />
                <h3 className="font-public-sans text-center font-[700] leading-[32px] text-[24px] text-[#494F53] mt-1 mx-auto">
                  {testimonial.name}
                </h3>
                <h3 className="font-public-sans text-center font-[300] leading-[20px] text-[16px] text-[#494F53]   mx-auto">
                  {testimonial.profile}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
