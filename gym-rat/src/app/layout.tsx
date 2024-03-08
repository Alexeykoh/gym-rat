import AuthProvider from "@/components/AuthProvider/AuthProvider";
import LayoutLoading from "@/components/ui/skeletons/LayoutLoading";
import { NavProvider } from "@/lib/context/nav-context";
import UserProvider from "@/lib/context/user-context";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "GYM-Rat",
  description: "Fitness app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //
  return (
    <AuthProvider>
      <UserProvider>
        <NavProvider>
          <html lang="en">
            <body className={"text-white bg-zinc-800"}>
              <Suspense fallback={<LayoutLoading />}>{children}</Suspense>
            </body>
          </html>
        </NavProvider>
      </UserProvider>
    </AuthProvider>
  );
}
