import ActionButton from "@/shared/ui/buttons/ActionButton";
import { UserRoundCog } from "lucide-react";
import Link from "next/link";

interface iAdminLink {
  isAdmin: boolean;
}

export default function AdminLink({ isAdmin }: iAdminLink) {
  if (isAdmin) {
    return (
      <Link href={"/admin/types"} className="fixed bottom-4 right-4 z-50">
        <ActionButton text={<UserRoundCog className="text-lime-400" />} />
      </Link>
    );
  } else {
    return null;
  }
}
