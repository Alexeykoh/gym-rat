import AuthProvider from "@/components/AuthProvider/AuthProvider";
import type { Metadata } from "next";
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
  return (
    <AuthProvider>
      <html lang="en">
        <body className={"text-white bg-zinc-800 bgImage object-contain"}>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
