import { iExercise } from "@/lib/interfaces/Exercise.interface";
import mongoose, { Schema } from "mongoose";
//
const modelName = "exercise";
//
const exerciseSchema: Schema = new Schema({
  type_id: { type: String, required: true },
  name: { type: String, required: true },
  descriptions: { type: String },
});
//
const ExerciseModel: any =
  mongoose.models[modelName] ||
  mongoose.model<iExercise>(modelName, exerciseSchema);
//
export default ExerciseModel;
