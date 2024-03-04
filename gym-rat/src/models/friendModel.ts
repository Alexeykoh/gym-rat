import { iFriend } from "@/lib/interfaces/Friends.interface";
import mongoose, { Schema } from "mongoose";
//
const modelName = "friend";
//
const FriendSchema: Schema = new Schema({
  owner_id: { type: String, required: true },
  friend_name: { type: String },
  friendshipAccepted: { type: Boolean, required: false, default: false },
});
//
const FriendModel =
  mongoose.models[modelName] ||
  mongoose.model<iFriend>(modelName, FriendSchema);
//
export default FriendModel;
