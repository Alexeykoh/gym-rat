import mongoose, { Schema } from "mongoose";

export interface iExercise {
  _id?: string;
  type_id: string;
  name: string;
  description: string | undefined;
}

const exerciseSchema: Schema = new Schema({
  type_id: { type: String, required: true },
  name: { type: String, required: true },
  descriptions: { type: String },
});

const ExerciseModel: any =
  mongoose.models.one_exercise ||
  mongoose.model<iExercise>("one_exercise", exerciseSchema);

export default ExerciseModel;
