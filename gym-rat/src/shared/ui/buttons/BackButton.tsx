"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface iBackButton {
  color?: string;
  isVisible?: boolean;
}

export default function BackButton({
  color = " bg-slate-600 ",
  isVisible = false,
}: iBackButton) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={
        color +
        " p-4 rounded-2xl w-24 h-15 absolute bottom-0 z-20 duration-300 " +
        (isVisible ? " -left-16 " : " left-0 ")
      }
    >
      <ArrowLeft />
    </button>
  );
}
