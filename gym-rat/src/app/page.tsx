"use client";

import Logo from "@/shared/ui/logo/logo";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/sign-in");
  return (
    <div className="flex flex-col gap-6 w-screen h-screen justify-center items-center bgImage object-contain backdrop-brightness-50">
      <Logo />
    </div>
  );
}
