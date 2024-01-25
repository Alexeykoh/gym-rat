import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOption } from "../api/auth/[...nextauth]/route";

type layoutProps = {
  children: ReactNode;
};

export default async function PrivateLayout({ children }: layoutProps) {
  const session = await getServerSession(authOption);
  if (!session?.user) {
    redirect("/sign-in");
  }
  return <>{children}</>;
}
