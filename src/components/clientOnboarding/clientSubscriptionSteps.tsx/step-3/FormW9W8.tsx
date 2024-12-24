import React from 'react'
import formImage from '../../../../../public/assets/image/formImage.svg'
import Image from 'next/image'

const FormW9W8 = () => {

  return (
    <div className="flex flex-col text-left flex-wrap">
    <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
    Form W-9/W-8
    </h2>

    <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
    Please fill out the following tax form. Some fields are prepopulated from your previous answers. Confirm the information is correct and fill out exemptions if you have any. Sign and date the form before proceeding.
    </p>

   <div className='mt-8  border border-[#DCE1E6] flex justify-center h-[280px] max-h-[310px]'>
    <Image src={formImage} alt={'form'} className='px-12 py-4'/>

   
     
    </div>
  </div>
  )
}

export default FormW9W8
