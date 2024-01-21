"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

type navProps = {};

const Nav: FC<navProps> = () => {
  const pathname = usePathname();
  const routes = [
    { name: "main", path: "/" },
    { name: "dashboard", path: "/dashboard" },
    { name: "workouts", path: "/workouts" },
  ];
  //
  const showBack = pathname.includes("/workouts/") ? true : false;
  const router = useRouter();
  if (showBack) {
    return (
      <nav className="flex w-full justify-between rounded-full text-lg z-30">
        <div
          onClick={() => router.back()}
          className="bg-gray-600 rounded-full w-fit text-white gap-1 flex items-center px-3 py-2 pr-5"
        >
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M560-267.692 347.692-480 560-692.308 588.308-664l-184 184 184 184L560-267.692Z" />
          </svg>
          <p>back</p>
        </div>
      </nav>
    );
  }
  return (
    <nav className="flex w-full justify-between bg-gray-500 rounded-full text-lg z-30">
      {routes.map((el: { name: string; path: string }, ind: number) => {
        return (
          <Link
            key={ind}
            className={
              (pathname === el.path ? " bg-lime-400 text-black " : "") +
              " px-6 py-2  rounded-full active:bg-gray-100/50"
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
