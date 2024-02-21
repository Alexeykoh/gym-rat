"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import { iUser } from "@/models/userModel";
import { iWorkout } from "@/models/workoutModel";
import axios from "axios";
import { FC, useEffect, useState } from "react";

type WorkoutPageProps = {
  params: { id: string };
};

const WorkoutPage: FC<WorkoutPageProps> = ({ params }) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [workouts, setWorkouts] = useState<iWorkout[]>([]);
  //
  function getUserById(id: string) {
    axios.get("/api/users/" + id).then((res: any) => {
      setUser(res.data.users);
    });
  }
  function getUserWorkouts() {
    axios.get("/api/workouts/items?type=all").then((res) => {
      setWorkouts(res.data.message);
    });
  }
  //
  useEffect(() => {
    getUserById(params.id);
    getUserWorkouts();
  }, [params.id]);
  //
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
};

export default WorkoutPage;
