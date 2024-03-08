"use client";
import { LucideIcon, MoreVertical } from "lucide-react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

type ContextMenuProps = {
  icon?: LucideIcon | ReactNode | string;
  data: {
    name: string;
    icon: string | LucideIcon | ReactNode;
    action: () => void;
  }[];
};

const ContextMenu: FC<ContextMenuProps> = ({ data }) => {
  const [context, setContext] = useState<boolean>(false);
  const menuRef = useRef<HTMLUListElement>(null);
  //
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef?.current?.contains(e.target as Node)) {
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
        <span onClick={toggleContext}> {<MoreVertical />}</span>
        <ul
          ref={menuRef}
          className={
            (context ? " flex " : " hidden ") +
            " flex-col absolute top-0 right-0  rounded-xl shadow-lg w-max z-40 overflow-hidden  bg-zinc-700"
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
                    <span className="text-xl"> {el.icon as string}</span>
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
