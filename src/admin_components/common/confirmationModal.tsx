"use client";
import CustomButton from "@/components/theme/customButton";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface IProps {
  isOpen: boolean;
  image?: string | StaticImport;
  title?: string;
  description?: string;
  handleClose: () => void;
  confirmBtn?: ReactNode;
  children?: ReactNode;
}

const ConfirmationModal: React.FC<IProps> = ({
  isOpen,
  image,
  title,
  description,
  handleClose,
  confirmBtn,
  children,
}) => {
  return (
    <>
      {isOpen ? (
        <div className="fixed z-[9999] inset-0 h-full w-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`w-[90%] max-w-[375px] bg-white rounded-md p-5`}
          >
            <div className="flex items-center justify-center border-[1px] border-borderColor bg-adminBg rounded-[10px] aspect-[4.2/3]">
              {/* <div className="flex items-center justify-center w-[140px] aspect-square max-w-[80%] bg-white rounded-md"> */}
              <Image src={image} alt="" height={140} width={140} unoptimized />
              {/* </div> */}
            </div>
            <div className="text-center text-textBlack pt-6 pb-2">
              {title ? (
                <h4 className="text-2xl font-semibold">{title}</h4>
              ) : null}
              {description ? (
                <p className="mt-[10px] mb-5 font-light max-w-[240px] ml-auto mr-auto">
                  {description}
                </p>
              ) : null}
              {children}
              <div className="flex justify-center gap-[10px] mt-5">
                <CustomButton variantType="outlined" onClick={handleClose}>
                  Cancel
                </CustomButton>
                {confirmBtn}
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </>
  );
};

export default ConfirmationModal;
