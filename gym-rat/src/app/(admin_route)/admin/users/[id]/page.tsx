"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import { iUserData } from "@/lib/interfaces/User.interface";
import { useState } from "react";

interface iWorkoutPageProps {
  params?: { id: string };
}

export default function WorkoutPage({}: iWorkoutPageProps) {
  const [user] = useState<iUserData | null>(null);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 items-center">
        <p
          className={
            (user?.role === "admin"
              ? " bg-lime-400 text-black "
              : " bg-gray-100/30 ") + " text-xs px-2 py-1 w-fit rounded-lg"
          }
        >
          {user?.role}
        </p>
        <h1 className="text-3xl">{user?.name}</h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        <CardLayout>
          <div></div>
        </CardLayout>
      </div>
    </div>
  );
}
