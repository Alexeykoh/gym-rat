"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FC } from "react";

type headerProps = {};

const Header: FC<headerProps> = () => {
  //
  const { data, status }: any = useSession();
  const isAuth = status === "authenticated";
  const userName = data?.user?.name;
  // console.log(data);
  //
  return (
    <header className="flex items-center box-border p-4 justify-between">
      <div className="logo">GYM-Rat</div>
      <div className="w-fit flex gap-8 items-center">
        <div className="flex gap-2 items-center">
          <div className="userIcon min-w-8 min-h-8 rounded-full bg-gray-600 flex items-center justify-center">
            i
          </div>
          <p>{userName}</p>
        </div>

        <button
          onClick={() => {
            signOut();
            redirect("/sign-in");
          }}
          className="lg:hover:bg-gray-400 py-2 px-4 bg-gray-600 rounded-lg duration-150"
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
