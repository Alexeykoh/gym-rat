import { ReactNode } from "react";

interface iIcon {
  icon: ReactNode;
}

export default function Icon({ icon }: iIcon) {
  return (
    <div className="min-w-16 min-h-16 bg-gray-600/70 rounded-full flex items-center justify-center">
      {icon}
    </div>
  );
}
