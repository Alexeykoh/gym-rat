"use client";
import Header from "@/components/header/header";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { ReactNode } from "react";

type layoutProps = {
  children: ReactNode | string;
};

export default function AdminLayout({ children }: layoutProps) {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  console.log(session);
  if (session?.user?.role !== "admin" && status !== "loading") {
    redirect("/account");
  }
  if (status !== "loading") {
    return (
      <main className="container p-4 mx-auto flex flex-col w-full gap-4">
        <Header />
        <button
          onClick={() => {
            router.back();
          }}
          className="px-4 py-2 rounded-xl bg-gray-400 w-fit text-black"
        >
          {"back"}
        </button>
        {children}
      </main>
    );
  }
}
