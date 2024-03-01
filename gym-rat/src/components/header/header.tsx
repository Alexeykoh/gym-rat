"use client";
import { FC } from "react";
import Logo from "../logo/logo";
import Nav from "../nav/nav";

type headerProps = {};

const Header: FC<headerProps> = () => {
  //
  return (
    <header className="flex flex-col lg:flex-row items-center box-border justify-between gap-4 my-4">
      <div className="logo hidden lg:block w-1/3 ">
         <Logo />
      </div>

      <Nav />
      <div className="w-1/3"></div>
    </header>
  );
};

export default Header;
