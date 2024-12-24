import CustomButton from '@/components/theme/customButton'
import React, { useState } from 'react'
import SignUpModal from '../modals/SignUpModal';

const OfferingDocs = () => {

    const [show,setShow] = useState(false);
    return (

        <div className='text-center w-[40%] bg-[#FBF9F9] p-14 border-l border-[#D2D7DC]'>
            <h4 className="text-[24px] font-bold text-[#1C2024] mb-4">Begin Subscription or View Offering Docs</h4>
            <p className='text-[16px] font-normal text-[#494F53] mb-9'>Prospective investors are invited to download the fund's offering<br /> documents and/or subscribe below.</p>
            <div className='flex flex-col gap-4 mb-5'>

                <CustomButton variantColor='black' variantType='outlined' className='rounded-none !text-[18px] !font-bold'>Download Offering Documents</CustomButton>
                <CustomButton className='rounded-none !text-[18px] !font-bold !border-none' variantColor='secondary' onClick={() => setShow(true)}>Subscribe to fund</CustomButton>
            </div>

            <div className='text-left'>
                <p className='text-[16px] text-[#494F53] font-light mb-11' >
                    This page and its contents are provided for informational and educational purposes only. BlackFintech and its affiliates do not provide investment advice to investors, and nothing on this page should be construed as investment advice or a recommendation of any kind.<br /><br />Investments in pooled investment vehicles carry significant risks, including partial or total loss of capital, and are only suitable for sophisticated investors. Information provided on this page is neither vetted nor endorsed by BlackFintech and is qualified in its entirety by the Fund's offering documents. Prior to submitting a subscription request, prospective investors should review the Fund's offering documents and make their own determination of whether an investment in the offering is consistent with their investment objectives, financial situation, and risk tolerance.<br /><br />By using this website, you accept and agree to BlackFintech Terms of Use and Privacy Policy.
                </p>
            </div>
            <span className='text-[16px] font-bold text-[#000000] '>© 2024 blackjadefintec.com</span>


       {
        show && <SignUpModal show={show} setSteps={1} handleClose={()=>setShow(false)}/>
       }
        </div>

    )
}

export default OfferingDocs