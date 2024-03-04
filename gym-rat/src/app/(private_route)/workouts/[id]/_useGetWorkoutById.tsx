import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import { WorkoutService } from "@/services/workouts.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetWorkoutById(workoutId: string, enable: boolean) {
  const {
    data: workoutData,
    isLoading: workoutIsLoading,
    isFetching: workoutIsFetching,
  } = useQuery<iWorkout>({
    queryKey: ["useGetWorkoutById", workoutId],
    enabled: enable,
    queryFn: async () => await WorkoutService.getById(workoutId),
  });

  return { workoutData, workoutIsLoading, workoutIsFetching };
}
