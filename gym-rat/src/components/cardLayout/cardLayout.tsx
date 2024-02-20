"use client";
import { FC, useEffect, useState } from "react";

type cardLayoutProps = {
  children?: string | JSX.Element | JSX.Element[];
  isSelected?: boolean;
};

const CardLayout: FC<cardLayoutProps> = ({ children, isSelected }) => {
  const [isVisible, setIsVisible] = useState(false);
  //
  useEffect(() => {
    setIsVisible(true);
  }, []);
  //
  return (
    <div
      className={
        (isSelected ? " bg-lime-400 text-black " : " bg-zinc-900 ") +
        (isVisible ? " opacity-100 " : " opacity-0") +
        " px-4 py-4 rounded-2xl flex justify-between gap-4 items-center w-full h-full max-w-96 duration-500 "
      }
    >
      {children}
    </div>
  );
};

export default CardLayout;
