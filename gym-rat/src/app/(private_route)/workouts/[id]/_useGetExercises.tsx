import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import { ExercisesService } from "@/services/exercises.services";
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
