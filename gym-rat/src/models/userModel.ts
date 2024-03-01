import { enumUserRole, iUser } from "@/lib/interfaces/User.interface";
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
//
const modelName = "user";
//
const userSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.keys(enumUserRole),
    default: enumUserRole.user,
  },
  avatar: { type: String, required: false },
  name: { type: String, required: true },
});
//
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
//
userSchema.methods.comparePassword = async function (password: any) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error: any) {
    throw new Error(error);
  }
};
//
const UserModel: any =
  mongoose.models[modelName] || mongoose.model<iUser>(modelName, userSchema);
//
export default UserModel;
