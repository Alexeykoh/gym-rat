"use client";
import { iUserService } from "@/lib/interfaces/UserService.interface";
import { UserService } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
//

export default function useLoginAuthorization() {
  const router = useRouter();
  //
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  //
  async function loginIn({ email, password }: iUserService) {
    setLoading(true);
    const loginUser = await UserService.login({
      email: email,
      password: password,
    });
    if (loginUser?.error) {
      setError(loginUser?.error);
    }
    setLoading(false);
    router.replace("/dashboard");
  }
  //
  return { loading, error, loginIn };
}
