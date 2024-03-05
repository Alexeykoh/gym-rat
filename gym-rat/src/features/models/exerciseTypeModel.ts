import { iWorkoutExerciseType } from "@/lib/interfaces/WorkoutExerciseType.interface";
import mongoose, { Schema } from "mongoose";
//
const modelName = "exerciseType";
//
const exerciseTypeSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});
//
const ExerciseTypeModel =
  mongoose.models[modelName] ||
  mongoose.model<iWorkoutExerciseType>(modelName, exerciseTypeSchema);
//
export default ExerciseTypeModel;
