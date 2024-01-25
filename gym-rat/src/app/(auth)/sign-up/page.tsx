"use client";

import RegistrationForm from "@/components/forms/register/register";
import { userInfo } from "os";
import { useState } from "react";

export default function Login() {
  
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
      <RegistrationForm />
    </div>
  );
}
