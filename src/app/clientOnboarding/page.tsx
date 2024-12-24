

'use client'
import Navbar from '@/components/investorOnboarding/Navbar'
import Image from 'next/image'
import React, { useState } from 'react'
import { HiIcon } from '../investorOnboarding/icons'
import CustomButton from '@/components/theme/customButton'
import ClientName from '@/components/clientOnboarding/ClientName'
import ContactInformation from '@/components/clientOnboarding/ContactInformation'
import ClientSubscribe from '@/components/clientOnboarding/ClientSubscribe'

const ClientOnboarding = () => {
    const [steps, setSteps] = useState(0);
    const [stepData, setStepData] = useState({
        first_name: '',
        last_name: '',
    });

    return (
        <div className='bg-[#f4f4f4] '>
            <Navbar isBgExist={false} />

            {steps === 0 && (
                <div className='flex justify-center m-auto flex-col  w-[755px]'  style={{ height: "calc(100vh - 92px)" }}>
                    <Image
                        src="/assets/image/clientProfile.png"
                        alt="back"
                        height={82}
                        width={82}
                        className='!w-20 !h-20'
                    />
                    <h1 className='text-[40px] font-black text-[#494F53] uppercase' style={{ fontFamily: '"Public Sans", sans-serif' }}>
                        Welcome <span style={{ display: 'inline-block', verticalAlign: "baseline" }}>{<HiIcon />}</span> let's get your <br /> investor profile set up first.
                    </h1>
                    <p className='text-[16px]  mt-3 font-light text-[#494F53]' style={{ fontFamily: '"Public Sans", sans-serif' }}>
                        We just need to ask a couple quick questions before we take you to your subscription <br /> application. This shouldn't take long!
                    </p>
                    <CustomButton 
                         className="rounded-none !text-[18px] !font-bold !border-none w-[208px] h-[48px] mt-10"
                        onClick={() => setSteps(1)}
                    >
                        Continue
                    </CustomButton>
                </div>
            )}

            {steps === 1 && (
                <ClientName 
                    setSteps={setSteps} 
                    setStepData={setStepData} 
                    stepData={stepData} 
                />
            )}
            {steps === 2 && (
                <ContactInformation setSteps={setSteps} steps={steps} />
            )}
            {steps === 3 && (
                <ClientSubscribe setSteps={setSteps} />
            )}
        </div>
    );
}

export default ClientOnboarding;
