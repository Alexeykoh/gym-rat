import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

export interface iUser {
  _id?: string;
  email: string;
  password: string;
  role: "admin" | "user";
  avatar?: string;
  name: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  avatar: { type: String, required: false },
  name: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password as string, salt);
      this.password = hash;
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = async function (password: any) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error: any) {
    throw new Error(error);
  }
};

const UserModel: any =
  mongoose.models.user || mongoose.model<iUser>("user", userSchema);

export default UserModel;
