"use client";
import Header from "@/components/header/header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type layoutProps = {
  children: ReactNode | string;
};

export default function PrivateLayout({ children }: layoutProps) {
  const { data: session, status } = useSession();
  // console.log(status, status !== "authenticated" && status !== "loading");

  if (status !== "authenticated" && status !== "loading") {
    redirect("/sign-in");
  }

  return (
    <>
      <main className="container p-4 mx-auto flex flex-col w-full">
        <Header />
        {children}
      </main>
    </>
  );
}
