import Navbar from "@/components/investorOnboarding/Navbar";
import Image from "next/image";
import React, { useState } from "react";

import CustomButton from "@/components/theme/customButton";
import InputField from "../theme/input";
import { useRouter } from "next/navigation";
import OfferingDocumentPopUpModal from "./OfferingDocumentPopUpModal";

interface Iprops {
  setSteps: any;
}

const ClientSubscribe = ({ setSteps }: Iprops) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center  m-auto flex-col  w-[755px]"  style={{ height: "calc(100vh - 92px)" }}>
      <Image
        src="/assets/image/subscribe.png"
        alt="logo"
        width={144}
        height={42}
        className="!w-20 !h-20"
      />
      <h1
        className="text-[40px] font-black text-[#494F53] uppercase"
        style={{ fontFamily: '"Public Sans", sans-serif' }}
      >
        Subscribe to BullSP Capital LLC
      </h1>
      <p
        className="text-[16px] mt-3 font-light text-[#494F53]"
        style={{ fontFamily: '"Public Sans", sans-serif' }}
      >
        You can exit and resume your subscription at any time by returning to
        blackjadefintec.com
      </p>
      <div className="mt-10 flex gap-6">
        <CustomButton
           className="rounded-none !text-[18px] whitespace-nowrap !font-bold !border-none w-[208px] h-[48px]"
          onClick={handleOpenModal}
        >
          Start Subscription{" "}
        </CustomButton>
        <CustomButton
          variantColor="black"
          variantType="outlined"
            className="rounded-none !text-[18px] !font-bold  w-[208px] h-[48px] "
          onClick={() => router.push("/clientOnboarding/dashboard")}
        >
          Finish Later
        </CustomButton>
      </div>
      <OfferingDocumentPopUpModal
        show={showModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default ClientSubscribe;
