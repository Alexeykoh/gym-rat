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
workoutSchema.methods.comparePassword = async function (password: any) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error: any) {
    throw new Error(error);
  }
};
//
const WorkoutModel: any =
  mongoose.models[modelName] ||
  mongoose.model<iWorkout>(modelName, workoutSchema);
//
export default WorkoutModel;
