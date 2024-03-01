import CardLayout from "@/components/cardLayout/cardLayout";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import { WorkoutService } from "@/services/workouts.service";
import SpinnerLoader from "@/shared/ui/loaders/spinnerLoader";
import { useQuery } from "@tanstack/react-query";
import { Medal } from "lucide-react";
import WorkoutCard from "../../../../shared/ui/cards/workout-card/workout-card";
import Title from "../_IU/_title";
import AddExerciseBtn from "../_IU/_add-exercise-btn";

interface iPrevWorkoutSection {}

export default function PrevWorkoutSection() {
  const { data, isLoading } = useQuery<iWorkout[] | null>({
    queryKey: ["WorkoutService.getAll"],
    queryFn: async () => await WorkoutService.getAll(),
  });

  // if (isLoading) {
  //   return <SpinnerLoader />;
  // }
  return (
    <>
      <section className="flex flex-col gap-4">
        <AddExerciseBtn isLoading={isLoading} />
        <Title text="Предыдущие" />
        {data?.map(({ date, description, name, _id }, ind: number) => {
          return (
            <CardLayout key={ind}>
              <WorkoutCard
                icon={<Medal />}
                title={name}
                description={description}
                date={date}
                id={_id as string}
              />
            </CardLayout>
          );
        })}
      </section>
    </>
  );
}
