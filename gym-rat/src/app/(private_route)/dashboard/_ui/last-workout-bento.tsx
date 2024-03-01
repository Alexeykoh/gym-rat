import CardLayout from "@/components/cardLayout/cardLayout";
import WorkoutCard from "@/components/workoutCard/workoutCard";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import { Trophy } from "lucide-react";
interface iLastWorkoutBento {
  workout: iWorkout | null;
}
export default function LastWorkoutBento({ workout }: iLastWorkoutBento) {
  return (
    <CardLayout>
      <div className="lg:h-full w-full">
        <p className="text-4xl mb-4">Последняя тренировка</p>
        {!workout ? null : (
          <WorkoutCard
            icon={<Trophy />}
            title={workout.name}
            description={workout.description}
            date={workout.date}
            id={workout._id as string}
          />
        )}
      </div>
    </CardLayout>
  );
}
