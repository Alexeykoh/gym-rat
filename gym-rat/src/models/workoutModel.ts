import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { iUser } from "./userModel";

export interface iWorkout {
  _id?: string;
  user_id: string;
  date: string;
  name: string;
  description: string;
}
const workoutSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  date: { type: String, default: Date.now },
  name: { type: String, required: false },
  description: { type: String, required: false },
});

workoutSchema.methods.comparePassword = async function (password: any) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error: any) {
    throw new Error(error);
  }
};

const WorkoutModel: any =
  mongoose.models.workout || mongoose.model<iUser>("workout", workoutSchema);

export default WorkoutModel;
