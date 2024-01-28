"use client";

import { FC, ReactNode } from "react";

type modalProps = {
  children?: ReactNode;
  close(): void;
};

const Modal: FC<modalProps> = ({ children, close }) => {
  return (
    <>
      <div
        onClick={() => {
          if (close) {
            close();
          }
        }}
        className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-40 p-6 backdrop-blur-md"
      ></div>
      <div className="fixed z-50 w-3/4 max-w-96  bg-gray-700 shadow-lg rounded-xl p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </>
  );
};

export default Modal;
