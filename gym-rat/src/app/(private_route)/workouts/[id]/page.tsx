"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import { iWorkout } from "@/models/workoutModel";
import { FC, useEffect, useState } from "react";

type WorkoutPageProps = {
  params: { id: string };
};

const WorkoutPage: FC<WorkoutPageProps> = ({ params }) => {
  const [context, setContext] = useState<boolean>(false);
  const [workout, setWorkout] = useState<iWorkout | null>(null);
  //
  function getWorkout() {
    fetch("/api/workout?id=" + params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.message);
        setWorkout(data?.message);
      });
  }
  useEffect(() => {
    getWorkout();
  }, []);

  //
  return (
    <div className="flex flex-col gap-4 w-full">
      <button className="px-4 py-2 fixed bottom-4 left-1/2 -translate-x-1/2 bg-lime-500 rounded-2xl z-20 text-black">
        add exercise
      </button>
      <h1 className="text-7xl">{workout?.name}</h1>
      <p className="text-xs text-gray-400">{workout?.date}</p>
      <p className="text-md text-gray-400">{workout?.description}</p>
      <div className="flex w-full flex-col gap-4">
        <CardLayout></CardLayout>
      </div>
    </div>
  );
};

export default WorkoutPage;
