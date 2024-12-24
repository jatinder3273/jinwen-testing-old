import React, { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  maxWidth?: number;
  children: ReactNode;
}

const PopupLayout: React.FC<IProps> = ({
  isOpen,
  handleClose,
  maxWidth,
  children,
}) => {
  return (
    <>
      {isOpen ? (
        <div className="fixed z-[9999] inset-0 h-full w-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
          <div
            className={`w-[90%] bg-white rounded-md`}
            style={{ maxWidth: `${maxWidth}px` }}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PopupLayout;
