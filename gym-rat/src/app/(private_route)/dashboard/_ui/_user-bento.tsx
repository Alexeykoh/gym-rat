import { enumUserRole } from "@/lib/interfaces/User.interface";
import { CircleUser } from "lucide-react";

interface iUserBento {
  name: string;
  role: enumUserRole;
}

export default function UserBento({ name, role }: iUserBento) {
  return (
    <div className="col-span-3 bg-zinc-900 text-white rounded-2xl flex items-center text-md font-semibold h-full w-full gap-4">
      <div className="self-start p-4 bg-zinc-800 rounded-2xl">
        <CircleUser />
      </div>
      <div className="">
        <p className="">{name}</p>
        <p className={role === enumUserRole.admin ? " text-violet-400 " : ""}>
          {role}
        </p>
      </div>
    </div>
  );
}
