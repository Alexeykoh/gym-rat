import { iOrder } from "@/lib/types";
import mongoose, { Schema } from "mongoose";

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

const OrderModel: any =
  mongoose.models.exercise_order ||
  mongoose.model<iOrder>("exercise_order", orderSchema);

export default OrderModel;
