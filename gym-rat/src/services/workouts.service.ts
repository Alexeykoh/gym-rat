import {
  iWorkout,
  iWorkoutResponse,
} from "@/lib/interfaces/Workouts.interface";
import axios, { AxiosResponse } from "axios";

export const WorkoutService = {
  async getAllById(userID: string) {
    const response: AxiosResponse<iWorkout[]> = await axios.get(
      "/api/workouts/all/" + userID
    );
    const data = response.data;
    return data;
  },
  async getAll() {
    const response: AxiosResponse<iWorkout[]> = await axios.get(
      "/api/workouts/items?type=all"
    );
    const data = response.data;
    return data;
  },
  async getByPage({ pageParam }: { pageParam: number }) {
    const response: AxiosResponse<iWorkoutResponse> = await axios.get(
      "/api/workouts/items?page=" + pageParam
    );
    const data = response.data.workouts;
    return data;
  },
  async getById(workoutID: string) {
    const response: AxiosResponse<iWorkout> = await axios.get(
      "/api/workouts/items/" + workoutID
    );
    const data = response.data;
    return data;
  },
};
