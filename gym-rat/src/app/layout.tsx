import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "@/components/header/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <body
          className={
            (inter.className,
            " flex flex-col mx-auto container text-white box-border bg-zinc-800")
          }
        >
          <Header />
          <main className="pt-20 flex shrink w-full max-h-full box-border p-4">
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
