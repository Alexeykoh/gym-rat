"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type navProps = {};

const Nav: FC<navProps> = () => {
  const pathname = usePathname();
  const routes = [
    { name: "Аккаунт", path: "/account" },
    { name: "Главная", path: "/dashboard" },
    { name: "Тренировки", path: "/workouts" },
  ];
  //
  return (
    <nav className="flex w-full max-w-96 justify-between rounded-full text-lg">
      {routes.map((el: { name: string; path: string }, ind: number) => {
        return (
          <Link
            key={ind}
            className={
              (pathname.includes(el.path) ? " bg-lime-400 text-black " : "") +
              " px-4 py-2  rounded-full active:bg-gray-100/50 text-1xl"
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
