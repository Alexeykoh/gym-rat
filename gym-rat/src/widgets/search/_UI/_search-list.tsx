import CardLayout from "@/components/cardLayout/cardLayout";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import WorkoutCard from "@/shared/ui/cards/workout-card/workout-card";
import { Link } from "lucide-react";
import router from "next/router";

interface iSearchList {
  isOpen: boolean;
  searchLoading: boolean;
  searchData: iWorkout[] | undefined;
}

export default function SearchList({
  isOpen,
  searchLoading,
  searchData,
}: iSearchList) {
  return (
    <>
      {!isOpen ? null : (
        <ul
          className={
            (searchLoading ? " opacity-0 " : " opacity-100 ") +
            " w-full flex flex-col gap-4 max-h-full overflow-y-auto pb-32 duration-150"
          }
        >
          {!searchData?.length && (
            <CardLayout>
              <p>Нет результатов</p>
            </CardLayout>
          )}
          {searchData?.map(({ date, description, name, _id }, ind: number) => {
            return (
              <span
                key={ind}
                onClick={() => {
                  router.push(`workouts/${_id}`);
                }}
              >
                <CardLayout key={ind}>
                  <WorkoutCard
                    icon={<Link />}
                    title={name}
                    description={description}
                    date={date}
                    id={_id as string}
                  />
                </CardLayout>
              </span>
            );
          })}
        </ul>
      )}
    </>
  );
}
