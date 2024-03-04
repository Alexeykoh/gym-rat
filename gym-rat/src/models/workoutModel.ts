import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
//
const modelName = "workout";
//
const workoutSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  date: { type: Date, default: Date.now },
  name: { type: String, required: false },
  description: { type: String, required: false },
});
//
workoutSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
//
const WorkoutModel =
  mongoose.models[modelName] ||
  mongoose.model<iWorkout>(modelName, workoutSchema);
//
export default WorkoutModel;
