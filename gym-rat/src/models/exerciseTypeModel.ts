import mongoose, { Schema } from "mongoose";

export interface iExerciseType {
  _id?: string;
  name: string;
  description?: string | undefined;
}

const exerciseTypeSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const ExerciseTypeModel: any =
  mongoose.models.exerciseType ||
  mongoose.model<iExerciseType>("exerciseType", exerciseTypeSchema);

export default ExerciseTypeModel;
