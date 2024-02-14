"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import ActionButton from "@/components/ui/ActionButton";
import { iExerciseType } from "@/models/exerciseTypeModel";
import { iWorkout } from "@/models/workoutModel";
import { FC, useEffect, useState } from "react";

type WorkoutPageProps = {
  params: { id: string };
};

const WorkoutPage: FC<WorkoutPageProps> = ({ params }) => {
  const [context, setContext] = useState<boolean>(false);
  const [workout, setWorkout] = useState<iWorkout | null>(null);
  const [types, setTypes] = useState<iExerciseType[]>([]);
  //
  function getTypes() {
    fetch("/api/exercise/type")
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.message);
        setTypes(data?.message);
      });
  }
  function getWorkout() {
    fetch("/api/workouts/items/" + params.id) //
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data?.message);
      });
  }
  useEffect(() => {
    getWorkout();
    getTypes();
  }, []);

  //
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        {" "}
        <ActionButton text="Add exercise" action={() => {}} />
      </div>
      <h1 className="text-7xl">{workout?.name}</h1>
      <p className="text-xs text-gray-400">{workout?.date}</p>
      <p className="text-md text-gray-400">{workout?.description}</p>
      <div className="flex w-full flex-col gap-4">
        {!types.length
          ? null
          : types.map((el, ind) => {
              return (
                <CardLayout key={ind}>
                  <p>{el.name}</p>
                </CardLayout>
              );
            })}
      </div>
    </div>
  );
};

export default WorkoutPage;
