"use client";
import { useMemo } from "react";

export default function DateBento() {
  const currentDate = useMemo(() => {
    return new Date();
  }, []);
  const formateDate = useMemo(() => {
    return {
      day: currentDate.toLocaleString("en-US", { day: "2-digit" }),
      month: currentDate.toLocaleString("en-US", { month: "short" }),
      year: currentDate.toLocaleString("en-US", { year: "2-digit" }),
    };
  }, [currentDate]);
  //
  return (
    <div className="col-span-2 lg:col-span-1 text-7xl p-4 rounded-2xl bg-zinc-900">
      <p className="">{formateDate.day}</p>
      <p className="uppercase">{formateDate.month}</p>
    </div>
  );
}
