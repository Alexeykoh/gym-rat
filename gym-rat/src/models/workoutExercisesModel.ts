import mongoose, { Schema } from "mongoose";

export interface iWorkoutExercises {
  _id?: string;
  workout_id: string;
  exercise_id: string;
  name: string;
  order: number;
}

const workoutExercisesSchema: Schema = new Schema({
  workout_id: { type: String, required: true },
  exercise_id: { type: String, required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
});

const WorkoutExercisesModel: any =
  mongoose.models.workout_exercises ||
  mongoose.model<iWorkoutExercises>(
    "workout_exercises",
    workoutExercisesSchema
  );

export default WorkoutExercisesModel;
