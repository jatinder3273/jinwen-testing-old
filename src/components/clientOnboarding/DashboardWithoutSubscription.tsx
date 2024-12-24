'use client'
import React, { useState } from 'react'
import CustomButton from '../theme/customButton'
import { GridIcon, InvestMoreIcon, ProgressIcon, RequestWithdrawlIcon, ViewGridIcon } from '@/app/investorOnboarding/icons'
import InvestorDashboardLayout from '../layouts/investorDashboardLayout'
import OfferingDocumentPopUpModal from './OfferingDocumentPopUpModal'

const DashboardWithoutSubscription = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <InvestorDashboardLayout title='Dashboard'>
                <div style={{ fontFamily: '"Public Sans", sans-serif' }}>
                    <div className='border-[0.8px] border-[#DCE1E6] bg-[#FFFFFF] rounded-[10px] p-6 flex gap-5'>
                        <div>
                            <ProgressIcon />
                        </div>
                        <div>
                            <h4 className='text-[22px] font-bold text-[#494F53]'>Finish your subscription</h4>
                            <p className='text-[16px] font-normal text-[#494F53]'>You will not have access to many features in the investor portal until you successfully subscribe to this fund.</p>
                            <div className='flex gap-4 mt-[18px]'>
                                <CustomButton
                                    variantColor='black'
                                    variantType='outlined'
                                    className='!border-[#494F53] rounded-none !text-[14px] !font-medium text-[#1C2024]'
                                >
                                    View Offering Preview Again
                                </CustomButton>
                                <CustomButton
                                    className='rounded-none !text-[14px] !font-medium !border-none'
                                    onClick={handleModalToggle}
                                >
                                    Continue your subscription
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full gap-7 mt-9'>
                        <div className='border-[0.8px] border-[#DCE1E6] bg-[#FFFFFF] rounded-[10px] p-6 flex gap-5 w-1/2'>
                            <span><InvestMoreIcon /></span>
                            <div>
                                <h4 className='text-[22px] font-bold text-[#494F53]'>Invest More</h4>
                                <p className='text-[16px] font-normal text-[#494F53]'>Purchase additional interests in the fund.</p>
                            </div>
                        </div>
                        <div className='border-[0.8px] border-[#DCE1E6] bg-[#FFFFFF] rounded-[10px] p-6 flex gap-5 w-1/2'>
                            <span><RequestWithdrawlIcon /></span>
                            <div>
                                <h4 className='text-[22px] font-bold text-[#494F53]'>Request Withdrawal</h4>
                                <p className='text-[16px] font-normal text-[#494F53]'>Submit a redemption request to the fund.</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-16 flex justify-between'>
                        <div>
                            <h3 className='text-[26px] font-medium text-[#1C2024]'>Performance Overview</h3>
                            <p className='text-[#494F53]'>Net asset value across all capital accounts</p>
                        </div>
                        <div className='flex gap-3 justify-end h-fit'>
                            <div className='flex'>
                                <div className='h-fit border-[#FF782C] border-[1px] rounded-tl-[4px] rounded-bl-[4px] p-4 flex justify-center items-center'>
                                    <ViewGridIcon />
                                </div>
                                <div className='h-fit border-[#494F53] border-[1px] rounded-tr-[4px] rounded-br-[4px] p-4 flex justify-center items-center'>
                                    <GridIcon />
                                </div>
                            </div>
                            <CustomButton
                                variantColor='black'
                                variantType='outlined'
                                className='!border-[#494F53] rounded-none !text-[12px] !font-bold text-[#494F53]'
                            >
                                View details
                            </CustomButton>
                        </div>
                    </div>
                    <hr className='text-[#D2D7DC] mt-6' />
                    <div className='text-center mt-24'>
                        <h3 className='text-[32px] font-medium text-[#1C2024]'>
                            You need to finish your subscription to BullSP Capital LLC
                        </h3>
                        <CustomButton
                            className='rounded-none !text-[14px] !font-medium !border-none mt-10'
                            onClick={handleModalToggle}
                        >
                            Subscribe
                        </CustomButton>
                    </div>
                </div>
            </InvestorDashboardLayout>
            {isModalOpen && (
                <OfferingDocumentPopUpModal
                    show={isModalOpen}
                    handleClose={handleModalToggle}
                />
            )}
        </>
    );
};

export default DashboardWithoutSubscription;
