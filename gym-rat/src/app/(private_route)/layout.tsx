"use client";
import Header from "@/components/header/header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";

type layoutProps = {
  children: ReactNode | string;
};
export default function PrivateLayout({ children }: layoutProps) {
  const { status } = useSession();
  console.log("Layout mount");
  if (status !== "authenticated" && status !== "loading") {
    redirect("/sign-in");
  }
  return (
    <>
      <main className="container p-4 mx-auto flex flex-col w-full">
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
}
