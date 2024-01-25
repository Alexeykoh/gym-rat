"use client";

import { FC } from "react";

type ActionButtonProps = {
  busy?: boolean;
  action(): any;
  text?: string;
};

const ActionButton: FC<ActionButtonProps> = ({ busy, action, text }) => {
  return (
    <>
      <button
        onClick={() => {
          action && action();
        }}
        type="submit"
        className={
          (busy ? " bg-gray-400 " : " bg-lime-400 ") +
          " p-3 mt-4 rounded-xl text-xl text-black w-fit"
        }
      >
        {text || "action button"}
      </button>
    </>
  );
};

export default ActionButton;
