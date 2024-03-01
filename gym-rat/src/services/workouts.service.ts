import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import axios, { AxiosResponse } from "axios";

export const WorkoutService = {
  async getAllById(userID: string) {
    try {
      const response: AxiosResponse<any[]> = await axios.get(
        "/api/workouts/all/" + userID
      );
      const data: any[] = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },
  async getAll() {
    try {
      const response: AxiosResponse<iWorkout[]> = await axios.get(
        "/api/workouts/items?type=all"
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },
  async getByPage<T>(page: number) {
    try {
      const response: AxiosResponse<T> = await axios.get(
        "/api/workouts/items?page=" + page
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },
};
