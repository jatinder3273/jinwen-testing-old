import { InfoIcon } from '@/app/investorOnboarding/icons'
import React from 'react'

const About = () => {
    return (

        <div className="w-[60%] p-10 bg-[#ffffff]">
            <h4 className="text-[24px] font-bold text-[#1C2024] mb-4">About</h4>

            <div className='flex gap-5 mb-5'>
                <span className='bg-[#3190E61A] py-[11px] px-[20px] text-[14px] font-medium text-[#000000]'>Hedge Fund</span>
                <span className='bg-[#3190E61A] py-[11px] px-[20px] text-[14px] font-medium text-[#000000]'>3(c)(1) Fund</span>
                <span className='bg-[#3190E61A] py-[11px] px-[20px] text-[14px] font-medium text-[#000000]'>506(c) Offering</span>
            </div>
            <p className='font-normal text-[16px] text-[#494F53] mb-7'>
                JinWen, a New York limited liability company (the "Fund"), is a New York-based private fund managed by Black Jade Capital LLC, a Delaware limited liability company (the "Manager").
            </p>
            <h4 className="text-[24px] font-bold text-[#1C2024] mb-9">
                Investment Objective
            </h4>
            <h4 className="text-[24px] font-bold text-[#1C2024] mb-8">Basic Details</h4>

            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#D2D7DC] pb-3">
                    <span className="font-medium text-[#494F53] text-[20px]">Minimum Investment</span>
                    <span className="text-[#1C2024] font-medium text-[20px]">$50,000</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#D2D7DC] pb-3">
                    <div>
                        <span className="font-medium text-[#494F53] text-[20px]">Management Fee</span>
                    </div>
                    <div className='text-right'>
                        <span className="text-[#1C2024] font-medium text-[20px]">1.5% Annually</span>
                        <p className="text-sm text-[#494F53]">0.125% Collected Monthly</p>
                    </div>
                </div>

                <div className="flex justify-between items-center border-b border-[#D2D7DC] pb-3">
                    <div>
                        <span className="font-medium text-[#494F53] text-[20px]">Performance Fee</span>
                    </div>
                    <div className='text-right'>

                        <span className="text-[#1C2024] font-medium text-[20px]">20%</span>
                        <p className="text-sm text-[#494F53]">Assessed Annually</p>
                    </div>
                </div>

                <div className="flex justify-between items-center border-b border-[#D2D7DC] pb-3">
                    <span className="font-medium text-[#494F53] text-[20px]">Lockup Period</span>
                    <span className="text-[#1C2024] font-medium text-[20px]">365 Days</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#D2D7DC] pb-3">
                    <span className="font-medium text-[#494F53] text-[20px]">Hurdle</span>
                    <span className="text-[#1C2024] font-medium text-[20px]">No Hurdle</span>
                </div>

                <div className="!mt-[45px] p-4 border border-[#DCE1E6] bg-[#FFFCFC] rounded-lg flex items-start gap-4">
                    <InfoIcon />
                    <p className="text-[16px] text-[#494F53] font-normal">
                        The information above is not a comprehensive description of the Fund's offering terms. Carefully review the Fund's <span className="text-[#1C2024] text-[16px] font-medium underline">offering documents</span> for further information prior to making an investment.
                    </p>
                </div>
            </div>
        </div>



    )
}

export default About
