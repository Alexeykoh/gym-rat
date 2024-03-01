"use client";
import { useMemo } from "react";

interface iDateLabel {
  date: string;
}

export default function DateLabel({ date }: iDateLabel) {
  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString("ru-RU");
  }, [date]);
  //
  return <div className="text-gray-100/50 min-w-16">{formattedDate}</div>;
}
