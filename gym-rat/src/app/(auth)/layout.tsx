import { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: layoutProps) {
  //
  return (
    <main className="lg:w-screen lg:h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
