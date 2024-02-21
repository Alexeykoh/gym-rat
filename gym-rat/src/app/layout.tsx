import AuthProvider from "@/components/AuthProvider/AuthProvider";
import type { Metadata } from "next";
import { Providers } from "./GlobalRegux/provider";
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
      <html lang="en">
        <body className={"text-white bg-zinc-800"}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </AuthProvider>
  );
}
