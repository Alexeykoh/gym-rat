import { ReactNode } from "react";

interface iNavWorkout {
  date: string;
  children?: ReactNode | string;
}

export default function NavWorkout({ date, children }: iNavWorkout) {
  return (
    <div className="text-lg flex justify-between w-full">
      <p className=" text-gray-500">
        {date ? new Date(date as string).toLocaleDateString("ru-RU") : null}
      </p>
      {children}
    </div>
  );
}
