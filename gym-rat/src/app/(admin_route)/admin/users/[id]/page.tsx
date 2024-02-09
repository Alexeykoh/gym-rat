"use client";

import CardLayout from "@/components/cardLayout/cardLayout";
import { FC } from "react";

type WorkoutPageProps = {
  params: { id: string };
};

const WorkoutPage: FC<WorkoutPageProps> = ({ params }) => {
  //
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl">Username name {params.id}</h1>
      <div className="flex w-full flex-col gap-4">
        <CardLayout>
          <div></div>
        </CardLayout>
      </div>
    </div>
  );
};

export default WorkoutPage;
