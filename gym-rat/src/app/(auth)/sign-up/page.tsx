"use client";

import RegistrationForm from "@/components/forms/register/register";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
      <RegistrationForm />
      <Link
        className="text-gray-500 hover:text-gray-400 duration-150"
        href={"/sign-in"}
      >
        Already have an Account? <span className="font-semibold">Sign in</span>
      </Link>
    </div>
  );
}
