



'use client'

import React from "react";
import ModalLayout from "@/components/modalLayout";
import CustomButton from "@/components/theme/customButton";
import { Button } from "react-bootstrap";

export const TwoFacAuthOptionModal = ({
    handleClose,
    show,
    setSteps,
    authMode,
    setAuthMode
}: {
    handleClose: () => void;
    show: boolean;
    setSteps: (step: number) => void;
    authMode: string;
    setAuthMode: (mode: string) => void;
}) => {
    const handleNext = () => {
        if (authMode === "email") {
            setSteps(4);
        } else if (authMode === "text") {
            setSteps(5);
        }
    };

    return (
        <ModalLayout
            title="Two Factor Authentication Mode"
            show={show}
            size={600}
            handleToggle={handleClose}
        >
            <div>
                <h1 className="text-[39px] font-black text-[#494F53] uppercase">
                    Two Factor Authentication Mode
                </h1>
                <p className="text-[16px] font-light text-[#494F53]">
                    Select an authentication method and we will send a confirmation code.
                </p>

            
                <Button
                    className={`cursor-pointer h-[50px] py-1 w-full flex pl-3  justify-start text-[18px] items-center  font-light text-[#494F53] mt-10 ${
                        authMode === "email"
                            ? "!border-[2px] !border-[#FF782C] !rounded-[5px] bg-[#E0E0E0]"
                            : "!border-[0.8px] !border-[#DCE1E6] bg-[#F4F4F4]"
                    }`}
                    onClick={() => setAuthMode("email")}
                >
                    Email Address
                </Button>

             
                <Button
                    className={`cursor-pointer w-full h-[50px] py-1 pl-3 flex justify-start text-[18px] font-light items-center  text-[#494F53] mt-4 ${
                        authMode === "text"
                            ? "!border-[2px] !border-[#FF782C] !rounded-[5px] bg-[#E0E0E0]"
                            : "!border-[0.8px] !border-[#DCE1E6] bg-[#F4F4F4]"
                    }`}
                    onClick={() => setAuthMode("text")}
                >
                    Text Message
                </Button>

                
                <div className="flex justify-between space-x-4 mt-10">
                    <CustomButton
                        className="rounded-none text-[18px] w-[249px] h-[48px] font-bold"
                        onClick={handleNext}
                    >
                        Next
                    </CustomButton>
                    <CustomButton
                        variantColor="black"
                        variantType="outlined"
                        className="rounded-none text-[18px] font-bold w-[249px] h-[48px]"
                        onClick={() => setSteps(2)}
                    >
                        Back
                    </CustomButton>
                </div>
            </div>
        </ModalLayout>
    );
};
