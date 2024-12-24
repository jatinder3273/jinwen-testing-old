'use client';
import React, { ReactNode } from 'react';

interface IProps {
  options: { icon: ReactNode; text: string; onClick?: () => void }[];
  className?: string;
}

const DropdownMenu: React.FC<IProps> = ({ options, className }) => {
  return (
    <div
      className={`absolute z-[99] mt-2 min-w-50 origin-top-right rounded-[12px] bg-white ring-1 ring-borderColor focus:ring-borderColor focus:outline-none transition-all duration-200 shadow-[0_14px_40px_0px_rgba(0,0,0,0.1)] overflow-hidden ${className}`}
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='menu-button'
    >
      <div className='font-normal' role='none'>
        {options.map((item, index) => (
          <button
            key={index}
            className='flex items-center gap-3 px-4 py-[10px] text-dbBlack text-sm hover:bg-adminBg hover:text-secondary transition-all w-full border-b-[1px] border-b-borderColor last:border-b-0'
            role='menuitem'
            id='menu-item-0'
            onClick={item.onClick}
          >
            <span className='shrink-0'>{item.icon}</span>
            <span className='whitespace-nowrap'>{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
