"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import { FC, useState } from "react";

type WorkoutPageProps = {
  params: { id: string };
};

const WorkoutPage: FC<WorkoutPageProps> = ({ params }) => {
  const [context, setContext] = useState<boolean>(false);

  //
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="px-4 py-2 fixed bottom-4 left-1/2 -translate-x-1/2 bg-lime-500 rounded-2xl z-20 text-black">
        add exercise
      </div>
      <h1 className="text-3xl">Workout name</h1>
      <div className="flex w-full flex-col gap-4">
        <CardLayout></CardLayout>
      </div>
    </div>
  );
};

export default WorkoutPage;
