import mongoose, { Schema } from "mongoose";

export interface iUser {
  login: string;
  _id?: string;
  email: string;
  // first_name?: string;
  // last_name?: string;
  // avatar?: string;
  // reg_date?: string;
  // role_id?: string;
}

const userSchema: Schema = new Schema({
  login: { type: String, required: true },
  email: { type: String, required: true },
  // first_name: { type: String, required: false },
  // last_name: { type: String, required: false },
  // avatar: { type: String, required: false },
  // reg_date: { type: String, required: false },
  // role_id: { type: String, required: false },
});

const User: any = mongoose.model<iUser>("users", userSchema);

export default User;
