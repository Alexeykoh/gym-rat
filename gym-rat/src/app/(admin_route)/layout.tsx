"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";

type layoutProps = {
  children: ReactNode | string;
};

export default function AdminLayout({ children }: layoutProps) {
  const { data: session, status }: any = useSession();
  const pathname = usePathname();
  if (session?.user?.role !== "admin" && status !== "loading") {
    redirect("/account");
  }
  if (status !== "loading") {
    const pages = [
      { name: "Аккаунт", href: "/account" },
      { name: "Категории", href: "/admin/types" },
      { name: "Пользователи", href: "/admin/users" },
    ];
    return (
      <main className="container p-4 mx-auto flex flex-col w-full gap-10">
        {/* <Header /> */}
        <div className="flex items-center w-full justify-center">
          <nav>
            <ul className="flex gap-2 items-center">
              {pages.map((el, ind) => {
                return (
                  <Link
                    key={ind}
                    href={el.href}
                    className={
                      (pathname.includes(el.href)
                        ? " bg-lime-400 text-black "
                        : "") + " px-4 py-2  rounded-full active:bg-gray-100/50"
                    }
                  >
                    {el.name}
                  </Link>
                );
              })}
            </ul>
          </nav>
        </div>

        {children}
      </main>
    );
  }
}
