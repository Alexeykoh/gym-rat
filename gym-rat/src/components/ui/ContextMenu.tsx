"use client";
import { MoreVertical } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

type ContextMenuProps = {
  icon?: any;
  data: {
    name: string;
    icon: any | string | JSX.IntrinsicElements;
    action: () => void;
  }[];
};

const ContextMenu: FC<ContextMenuProps> = ({ data, icon }) => {
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
        <span onClick={toggleContext}> {!icon ? <MoreVertical /> : icon}</span>
        <ul
          ref={menuRef}
          className={
            (context ? " flex " : " hidden ") +
            " flex-col absolute top-0 right-0  rounded-xl shadow-md w-max z-40 overflow-hidden  bg-gray-400"
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
                    className="hover:bg-gray-300 hover:text-black flex gap-2 items-center justify-start w-full py-2 px-4  "
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
