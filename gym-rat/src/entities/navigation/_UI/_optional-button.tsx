"use client";

import { ReactNode } from "react";

interface iOptionalButton {
  color?: string;
  optionalElement?: ReactNode;
}

export default function OptionalButton({
  color = " bg-slate-600 ",
  optionalElement,
}: iOptionalButton) {
  return (
    <button
      className={
        color +
        " p-4 rounded-2xl w-24 h-[56px] absolute bottom-0 z-20 duration-300 flex justify-end items-center" +
        (optionalElement ? " -right-16 " : " right-0 ")
      }
    >
      {optionalElement}
    </button>
  );
}
