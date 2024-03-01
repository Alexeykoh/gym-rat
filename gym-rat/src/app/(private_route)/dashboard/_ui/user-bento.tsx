import { enumUserRole } from "@/lib/interfaces/User.interface";
import { ShieldEllipsis } from "lucide-react";
import Link from "next/link";

interface iUserBento {
  name: string;
  role: enumUserRole;
}

export default function UserBento({ name, role }: iUserBento) {
  if (role === "admin") {
    return (
      <Link
        className="col-span-1 bg-lime-400 rounded-2xl flex flex-col items-center justify-center text-md text-black font-semibold p-4 h-full gap-2"
        href={"/admin/types"}
      >
        {name}
        <ShieldEllipsis />
      </Link>
    );
  } else {
    return (
      <div className="col-span-1 bg-lime-400 rounded-2xl flex flex-col items-center justify-center text-md text-black font-semibold p-4 h-full">
        {name}
      </div>
    );
  }
}
