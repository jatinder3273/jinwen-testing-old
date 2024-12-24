'use client';

import React, { useState } from 'react';
import ModalLayout from '../modalLayout';
import { DownloadIcon, FileIcon } from '@/app/investorOnboarding/icons';
import CustomButton from '../theme/customButton';
import { useRouter } from 'next/navigation';

interface Iprops {
    handleClose: () => void;
    show: boolean;
}

const OfferingDocumentPopUpModal = ({ handleClose, show }: Iprops) => {
    const subscriptionList = ['Subscription Agreement.pdf', 'PPM.pdf', 'LLC Agreement.pdf'];
    const pdfUrl = 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf';
    const [downloadedFiles, setDownloadedFiles] = useState<number[]>([]);
const router = useRouter();
    const handleDownload = async (index: number) => {
        try {
            const response = await fetch(pdfUrl, { mode: 'no-cors' });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = url;
            link.download = subscriptionList[index];
            link.click();
    
            window.URL.revokeObjectURL(url);
            setDownloadedFiles((prev) => [...prev, index]);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    

    const allFilesDownloaded = subscriptionList.length === downloadedFiles.length;

    return (
        <ModalLayout
            show={show}
            size={833}
            handleToggle={() => {
                handleClose();
            }}
        >
            <div className="bg-white rounded-lg">
                <h1
                    className="text-[40px] font-black text-[#494F53] uppercase"
                    style={{ fontFamily: '"Public Sans", sans-serif' }}
                >
                    Download offering documents.
                </h1>
                <p
                    className="text-[16px] font-light text-[#494F53]"
                    style={{ fontFamily: '"Public Sans", sans-serif' }}
                >
                    Carefully read and understand the contents of these offering
                    documents in conjunction with any other materials that have been
                    provided to you (collectively, the "Fund Offering Materials") by the
                    fund, its manager and/or general partner(s), and their respective
                    affiliates, as applicable. Information displayed herein by Black Jade
                    Capital LLC is not a substitute for the information contained within
                    the Offering Materials.
                </p>
                <div className="space-y-4 mt-10">
                    {subscriptionList.map((file, index) => (
                        <div
                            key={index}
                            className="flex justify-between border-[0.8px] border-[#DCE1E6] bg-[#F4F4F4]"
                        >
                            <div className="flex items-center gap-3 pl-5 pt-3 pb-3">
                                {downloadedFiles.includes(index) && (
                                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                        <FileIcon />
                                    </div>
                                )}
                                <span className="text-[#494F53] text-lg font-light">{file}</span>
                            </div>
                            <button
                                onClick={() => handleDownload(index)}
                                className="border-[0.8px] border-[#494F53] flex items-center justify-center "
                            >
                                <DownloadIcon />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex gap-6">
                    <CustomButton
                       className="rounded-none !text-[18px] !font-bold !border-none w-[208px] h-[48px] "
                        onClick={handleClose}
                    >
                        Close
                    </CustomButton>

                   {allFilesDownloaded && <CustomButton
                        variantColor="black"
                        variantType="outlined"
                         className="rounded-none !text-[18px] !font-bold whitespace-nowrap w-[208px] h-[48px] "
                        onClick={() => router.push('/clientOnboarding/subscription')}
                    >
                        Begin Subscription
                    </CustomButton>} 
                </div>
            </div>
        </ModalLayout>
    );
};

export default OfferingDocumentPopUpModal;




