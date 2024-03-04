"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface iBackButton {
  color?: string;
}

export default function BackButton({ color = " bg-slate-600 " }: iBackButton) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={color + " p-4 rounded-2xl w-15 h-15 fixed bottom-4 left-4"}
    >
      <ArrowLeft />
    </button>
  );
}
