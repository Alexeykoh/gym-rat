"use client";
import { UserRoundCog } from "lucide-react";
import Link from "next/link";

interface iAdminLink {
  isAdmin: boolean;
}

export default function AdminLink({ isAdmin }: iAdminLink) {
  return (
    <Link href={"/admin/types"} className="">
      <UserRoundCog className="text-violet-400" />
    </Link>
  );
}
