import Link from "next/link";
import { ReactNode } from "react";
import DateLabel from "../../labels/date-label";
import Icon from "./_UI/_icon";
import Information from "./_UI/_information";
import IntoLabel from "../../labels/into-label";

interface iWorkoutCard {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  date: string;
}

export default function WorkoutCard({
  id,
  icon,
  title,
  description,
  date,
}: iWorkoutCard) {
  return (
    <>
      <Link className="w-full space-y-4" href={`workouts/${id}`}>
        <div className="w-full flex gap-4 items-start">
          <Icon icon={icon} />
          <Information title={title} description={description} />
        </div>
        <div className="flex justify-between items-center">
          <DateLabel date={date} />
          <IntoLabel />
        </div>
      </Link>
    </>
  );
}
