import { ExercisesService } from "@/features/services/exercises.services";
import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import { useQuery } from "@tanstack/react-query";

export default function useGetExercises(workoutId: string, enable: boolean) {
  const {
    data: exercisesData,
    isLoading: exercisesIsLoading,
    isFetching: exercisesIsFetching,
  } = useQuery<iWorkoutExercises>({
    queryKey: ["useGetExercises", workoutId],
    enabled: enable,
    queryFn: async () =>
      await ExercisesService.getExercisesByWorkoutId(workoutId),
  });

  return { exercisesData, exercisesIsLoading, exercisesIsFetching };
}
