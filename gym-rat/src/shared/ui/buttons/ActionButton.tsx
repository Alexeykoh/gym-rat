"use client";

import { FC, ReactNode } from "react";
import LoaderSpinner from "../loaders/loader.spinner";

type ActionButtonProps = {
  busy?: boolean;
  action?: () => void;
  text?: string | ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  color?: string;
};

const ActionButton: FC<ActionButtonProps> = ({
  busy,
  action,
  text,
  type,
  color = "bg-zinc-800",
}) => {
  return (
    <>
      <button
        onClick={() => {
          if (action) {
            action();
          }
        }}
        type={type || "submit"}
        className={color + " p-4 rounded-2xl w-full h-15 flex justify-center"}
      >
        {busy ? (
          <LoaderSpinner />
        ) : (
          <p className="text-2xl font-semibold">{text}</p>
        )}
      </button>
    </>
  );
};

export default ActionButton;
