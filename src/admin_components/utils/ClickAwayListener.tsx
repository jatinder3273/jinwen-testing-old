'use client';
import React, { ReactNode, Ref, useEffect, useRef } from 'react';

interface IProps {
  children: ReactNode;
  onClickAway: () => void;
}

const ClickAwayListener = ({ children, onClickAway }: IProps) => {
  const containerRef: Ref<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClickAway();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={containerRef}>{children}</div>;
};

export default ClickAwayListener;
