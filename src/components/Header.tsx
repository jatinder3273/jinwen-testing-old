"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoMenuOutline, IoClose } from "react-icons/io5";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white border-b border-gray-200 shadow-md py-2"
          : "bg-white py-3"
      }`}
    >
      <nav className="flex justify-between items-center px-3 md:px-6">
        <div
          className={`transition-all duration-500 ${
            isScrolled ? "w-[120px] md:w-[160px]" : "w-[140px] md:w-[180px]"
          }`}
        >
          <Image
            src="/assets/image/logo.png"
            alt="logo"
            width={180}
            height={52}
            className="w-full h-auto transition-transform duration-500"
          />
        </div>
        <div
          className={`flex items-center gap-2 transition-all duration-500 ${
            isScrolled ? "text-sm" : "text-base"
          }`}
        >
          <div
            className={`navLinks duration-500 absolute md:static md:w-auto w-full md:h-auto flex md:items-center gap-1 top-[100%] bg-white ${
              isMobileMenuOpen ? "left-0" : "left-[-100%]"
            } px-5 md:py-0 py-4`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-6 gap-4 text-[#494F53]">
              {[
                { name: "Home", href: "#" },
                { name: "Strategy", href: "#Strategy" },
                { name: "About", href: "#about" },
                { name: "Features", href: "#feature" },
                { name: "Testimonial", href: "#testimonial" },
                { name: "Contact", href: "#Contact" },
              ].map((item) => (
                <li
                  key={item.name}
                  className="relative max-w-fit pr-2 md:pr-0 py-1 after:bg-gradient-to-r from-[#ff7534] to-[#0066af] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  <a
                    className={`font-[700] leading-[22px] ${
                      isScrolled ? "text-[16px]" : "text-[18px]"
                    } text-black cursor-pointer`}
                    href={item.href}
                    onClick={() =>
                      handleScrollToSection(item.href.replace("#", ""))
                    }
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-[#3190E6] to-[#FF782C] text-white font-bold px-4 py-2 md:px-6 md:py-2.5 mr-2 rounded-lg shadow-md transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-[#ff7534] hover:to-[#0066af] focus:outline-none bg-[length:200%] bg-right hover:bg-left"
            onClick={() => router.push("/auth/login")}
          >
            Client Login
          </button>
          <button
            type="button"
            className="text-[28px] cursor-pointer md:hidden"
            onClick={handleToggleMenu}
          >
            {isMobileMenuOpen ? <IoClose /> : <IoMenuOutline />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
