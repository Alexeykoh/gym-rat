"use client";

import { ReactNode } from "react";

interface iOptionalButton {
  color?: string;
  isVisible?: boolean;
  optionalElement?: ReactNode;
}

export default function OptionalButton({
  color = " bg-slate-600 ",
  isVisible = false,
  optionalElement,
}: iOptionalButton) {
  return (
    <button
      onClick={() => {
        console.log("OptionalButton click");
      }}
      className={
        color +
        " p-4 rounded-2xl w-24 h-[56px] absolute bottom-0 z-20 duration-300 flex justify-end items-center" +
        (isVisible ? " -right-16 " : " right-0 ")
      }
    >
      {optionalElement}
    </button>
  );
}
