import AuthProvider from "@/components/AuthProvider/AuthProvider";
import LayoutLoading from "@/components/ui/skeletons/LayoutLoading";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Providers } from "./GlobalRedux/provider";
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
    <Providers>
      <AuthProvider>
        <html lang="en">
          <body className={"text-white bg-zinc-800"}>
            <Suspense fallback={<LayoutLoading />}>{children}</Suspense>
          </body>
        </html>
      </AuthProvider>
    </Providers>
  );
}
