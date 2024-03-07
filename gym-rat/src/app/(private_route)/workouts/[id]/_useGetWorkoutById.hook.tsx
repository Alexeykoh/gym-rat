import { WorkoutService } from "@/features/services/workouts.service";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
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
