"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface workoutCardProps {
  id: string;
  icon: any;
  title: string;
  description: string;
  date: string;
}
const WorkoutCard: FC<workoutCardProps> = ({
  id,
  icon,
  title,
  description,
  date,
}) => {
  const router = useRouter();
  //
  return (
    <>
      <div
        onClick={() => router.push(`/workouts/${id}`)}
        className="w-full h-full flex flex-col gap-4 max-w-96"
      >
        <div className="w-full flex gap-4 items-start">
          <div className="min-w-16 min-h-16 bg-gray-600/70 rounded-full flex items-center justify-center">
            <Image src={icon} alt={"icon"} width={32} height={32} />
          </div>
          <div className="flex flex-col">
            <p className="text-2xl">{title}</p>
            <p className="text-md text-gray-100/50">{description}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-100/50 w-1/2">
            {new Date(date).toLocaleDateString("ru-RU")}
          </div>
          <svg
            className="bg-lime-500 rounded-full"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m531.692-480-184-184L376-692.308 588.308-480 376-267.692 347.692-296l184-184Z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default WorkoutCard;
