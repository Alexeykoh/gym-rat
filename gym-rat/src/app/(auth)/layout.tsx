import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOption } from "../api/auth/[...nextauth]/route";

type layoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: layoutProps) {
  const session = await getServerSession(authOption);
  //
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
