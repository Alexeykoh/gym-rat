import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import axios, { AxiosResponse } from "axios";

export const ExercisesService = {
  async getExercisesByWorkoutId(workoutId: string) {
    const response: AxiosResponse<iWorkoutExercises> = await axios.get(
      "/api/exercises/items/" + workoutId
    );
    const data = response.data;
    return data;
  },
};
