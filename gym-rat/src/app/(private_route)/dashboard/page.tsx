"use client";

import WorkoutCard from "@/components/workoutCard/workoutCard";
import { iWorkout } from "@/models/workoutModel";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import arm from "../../../../public/icons/arm.svg";

export default function Dashboard() {
  const { data, status }: any = useSession();
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
  const [latestWorkout, setLatestWorkout] = useState<iWorkout | null>(null);
  //
  function getLatestWorkout() {
    fetch("/api/workouts/items?type=latest")
      .then((res) => res.json())
      .then((data) => {
        setLatestWorkout(data.message);
      });
  }

  //

  const name = data?.user?.name;
  const email = data?.user?.email;
  const role = data?.user?.role;

  //

  useEffect(() => {
    getLatestWorkout();
  }, []);

  //
  return (
    <main className="flex flex-col gap-8">
      <div className="flex justify-between gap-4">
        <div className="date w-2/3 text-8xl p-4 rounded-2xl bg-zinc-900">
          <p className="">{formateDate.day}</p>
          <p className="uppercase">{formateDate.month}</p>
        </div>
        <div className="flex flex-col gap-2 w-1/3  items-center">
          <div className="min-w-20 min-h-20 w-full h-fit bg-lime-400 rounded-2xl flex items-center justify-center text-md text-black font-semibold flex-col">
            {name}
            {role === "admin" && (
              <Link
                className="text-black bg-lime-400 rounded-xl text-center font-light"
                href={"/admin/types"}
              >
                {role}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-4xl">Last workout</p>
          <div className="bg-zinc-900 p-4 rounded-2xl">
            {!latestWorkout ? null : (
              <WorkoutCard
                icon={arm}
                title={latestWorkout.name}
                description={latestWorkout.description}
                date={latestWorkout.date}
                id={latestWorkout._id as string}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
