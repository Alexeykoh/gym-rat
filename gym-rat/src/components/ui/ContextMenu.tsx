"use client";
import { FC, useEffect, useRef, useState } from "react";

type ContextMenuProps = {
  data: {
    name: string;
    icon: any | string | JSX.IntrinsicElements;
    action: () => void;
  }[];
};

const ContextMenu: FC<ContextMenuProps> = ({ data }) => {
  const [context, setContext] = useState<boolean>(false);
  const menuRef = useRef(null);
  //
  useEffect(() => {
    let handler = (e: any) => {
      // @ts-ignore
      if (!menuRef?.current?.contains(e?.target)) {
        setContext(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });
  //
  function toggleContext() {
    setContext(!context);
  }
  //
  return (
    <>
      <div className="relative">
        <svg
          onClick={toggleContext}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          viewBox="0 -960 960 960"
          width="32"
        >
          <path d="M480-218.461q-16.5 0-28.25-11.75T440-258.461q0-16.501 11.75-28.251t28.25-11.75q16.5 0 28.25 11.75T520-258.461q0 16.5-11.75 28.25T480-218.461ZM480-440q-16.5 0-28.25-11.75T440-480q0-16.5 11.75-28.25T480-520q16.5 0 28.25 11.75T520-480q0 16.5-11.75 28.25T480-440Zm0-221.538q-16.5 0-28.25-11.75T440-701.539q0-16.5 11.75-28.25t28.25-11.75q16.5 0 28.25 11.75t11.75 28.25q0 16.501-11.75 28.251T480-661.538Z" />
        </svg>
        <ul
          ref={menuRef}
          className={
            (context ? " flex " : " hidden ") +
            " flex-col absolute top-0 right-0  rounded-xl shadow-md w-max z-40 overflow-hidden px-2 bg-gray-400"
          }
        >
          {!data
            ? null
            : data.map((el, ind) => {
                return (
                  <li
                    key={ind}
                    onClick={() => {
                      el.action();
                      setContext(false);
                    }}
                    className="hover:bg-gray-300 hover:text-black flex gap-2 items-center justify-start w-full p-2  "
                  >
                    {el.icon}
                    <p className="text-xl">{el.name}</p>
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
};

export default ContextMenu;
