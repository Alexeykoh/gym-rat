import mongoose, { Schema } from "mongoose";
import { iUser } from "./userModel";

export interface iFriend {
  _id?: string;
  owner_id: string;
  friend_name: string;
  friendshipAccepted: boolean
}
const workoutSchema: Schema = new Schema({
  owner_id: { type: String, required: true },
  friend_name: { type: String, },
  friendshipAccepted: { type: Boolean, required: false, default: false },
});

const WorkoutModel: any =
  mongoose.models.workout || mongoose.model<iUser>("workout", workoutSchema);

export default WorkoutModel;
