import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const handleAboutClick = () => {
    // Scroll to the about section
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="max-w-[1100px] mx-auto py-20 max-[990px]:px-10 max-[627px]:py-5 min-[1700px]:max-w-[85%]">
        <div className="flex justify-between item-center flex-wrap max-[500px]:gap-5 ">
          <div className="w-1/5 max-[926px]:w-1/2  px-2 max-[926px]:mt-2 max-[627px]:w-full">
            <Image
              src="/assets/image/footer-logo.png"
              alt="logo"
              width={210}
              height={61.05}
              className="max-w-[210px]"
            />
            <p className="font-public-sans text-[#494F53] text-left my-4 font-[300] leading-[24px] text-[16px]">
            </p>
            <div className="flex text-[#3190E6] cursor-pointer text-[23px]">
              <FaFacebook />
              <FaInstagram className="mx-3 max-[500px]:mx-6" />
              <IoLogoTwitter />
            </div>
          </div>

          <div className="w-1/8 max-[926px]:w-1/2 px-2 max-[926px]:mt-2 max-[627px]:w-[47%] ">
            <p className="font-public-sans text-[#494F53] text-left mb-4 font-[300] leading-[32px] text-[24px]">
              References
            </p>
            <ul>
              <li className="font-public-sans  text-[#494F53] text-left  my-1 font-[300] leading-[24px] text-[16px] ">
                <a href="#">Home</a>
              </li>
              <li className="font-public-sans font-[300] leading-[24px] text-[16px] text-[#494F53] text-left  my-1">
                <a href="#Strategy" onClick={handleAboutClick}>
                  Strategy
                </a>
              </li>
              <li className="font-public-sans font-[300] leading-[24px] text-[16px] text-[#494F53] text-left my-1">
                <a href="#about" onClick={handleAboutClick}>
                  About
                </a>
              </li>
              <li className="font-public-sans font-[300] leading-[24px] text-[16px] text-[#494F53] text-left  my-1">
                <a href="#feature" onClick={handleAboutClick}>
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div className="w-1/8 px-2 max-[926px]:mt-2 max-[627px]:w-[47%] max-[926px]:w-1/2  ">
            <p className="font-public-sans font-[300] leading-[32px] text-[24px] text-[#494F53] text-left mb-4">
              References
            </p>
            <ul>
              <li className="font-public-sans font-[300] leading-[24px] text-[16px] text-[#494F53] text-left  my-1">
                <a href="#testimonial" onClick={handleAboutClick}>
                  Testimonial
                </a>
              </li>
              <li className="font-public-sans font-[300] leading-[24px] text-[16px] text-[#494F53] text-left my-1">
                <a href="#Contact" onClick={handleAboutClick}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="w-[40%]px-2 max-[926px]:mt-2 max-[627px]:w-full max-[926px]:w-1/2 ">
            <p className="font-public-sans font-[300] leading-[32px] text-[24px] text-[#494F53] text-left mb-4">
              Contact Our Team
            </p>
            <ul>
              <li className=" my-1 mb-2 bg-[#F4F4F4] p-5 border border-[#DCE1E6] border-opacity-50">
                <p className="font-public-sans font-[600] leading-[24px] text-[18px] text-[#494F53] text-left">
                  Email
                </p>
                <Link href="mailto:Jzhang_3@yahoo.com">
                  <p className="font-public-sans mt-3 font-[300] leading-[16.5px] text-[14px] text-[#494F53] text-left break-all cursor-pointer">
                    daniel.zhang@blackjadefintec.com
                  </p>
                </Link>
              </li>
              <li className=" my-1 bg-[#F4F4F4] p-5 border border-[#DCE1E6] border-opacity-50">
                <p className="font-public-sans  font-[600] leading-[24px] text-[18px]  text-[#494F53] text-left">
                  Phone
                </p>
                <Link href="tel:2015439548">
                  <p className="font-public-sans font-[300] mt-3 leading-[16.5px] text-[14px]  text-[#494F53] text-left cursor-pointer">
                    201-543-9548
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#FAFAFA] text-[#494F53] text-center py-6 font-[300] leading-[24px] text-[14px]  ">
        @Black Jade Fintec 2024. All Right Reserved.
      </div>
    </>
  );
};

export default Footer;
