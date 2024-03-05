export interface iWorkout {
  _id?: string;
  user_id: string;
  date: string;
  dateCreate?: string;
  name: string;
  description: string;
}

export interface iWorkoutResponse {
  currentPage: number;
  totalPages: number;
  workouts: iWorkout[];
}
