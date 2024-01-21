"use client";
import Nav from "@/components/nav/nav";
import { FC } from "react";

type headerProps = {};

const Header: FC<headerProps> = () => {
  //

  return (
    <header className="flex justify-center items-center w-full fixed box-border p-4">
      <Nav />
    </header>
  );
};

export default Header;
