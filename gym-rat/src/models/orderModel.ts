import { iExerciseOrder } from "@/lib/interfaces/ExerciseOrder.interface";
import mongoose, { Schema } from "mongoose";
//
const modelName = "exercise_order";
//
const orderSchema: Schema = new Schema({
  exercise_id: { type: String, required: true },
  amount: { type: Number, required: false, default: 0 },
  order: { type: Number, required: true },
  measure: {
    type: String,
    enum: ["kg", "lbs", "count", "s", "min"],
    default: "kg",
  },
});
//
const OrderModel: any =
  mongoose.models[modelName] ||
  mongoose.model<iExerciseOrder>(modelName, orderSchema);
//
export default OrderModel;
