"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type navProps = {};

const Nav: FC<navProps> = () => {
  const pathname = usePathname();
  const routes = [
    { name: "account", path: "/account" },
    { name: "dashboard", path: "/dashboard" },
    { name: "workouts", path: "/workouts" },
  ];
  //

  return (
    <nav className="flex w-full max-w-96 justify-between bg-gray-500 rounded-full text-lg">
      {routes.map((el: { name: string; path: string }, ind: number) => {
        return (
          <Link
            key={ind}
            className={
              (pathname === el.path ? " bg-lime-400 text-black " : "") +
              " px-4 py-2  rounded-full active:bg-gray-100/50"
            }
            href={el.path}
          >
            {el.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
