"use client";
import MainNav from "@/entities/navigation/main-nav";
import Logo from "@/shared/ui/logo/logo";

export default function Header() {
  return (
    <header className="flex flex-col lg:flex-row items-center box-border justify-between gap-4 my-4">
      <div className="logo hidden lg:block w-1/3">
        <Logo />
      </div>

      <MainNav />
      <div className="w-1/3"></div>
    </header>
  );
}
