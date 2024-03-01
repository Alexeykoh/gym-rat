import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import mongoose, { Schema } from "mongoose";
//
const modelName = "workout_exercises";
//
const workoutExercisesSchema: Schema = new Schema({
  workout_id: { type: String, required: true },
  exercise_id: { type: String, required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
});
//
const WorkoutExercisesModel: any =
  mongoose.models[modelName] ||
  mongoose.model<iWorkoutExercises>(modelName, workoutExercisesSchema);
//
export default WorkoutExercisesModel;
