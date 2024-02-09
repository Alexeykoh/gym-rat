import mongoose, { Schema } from "mongoose";

export interface iExercises {
  _id?: string;
  workout_id: string;
  exercise_id: string;
  name: string;
}

const exercisesSchema: Schema = new Schema({
  workout_id: { type: String, required: true },
  exercise_id: { type: String, required: true },
  name: { type: String, required: true },
});

const ExercisesModel: any =
  mongoose.models.exercises ||
  mongoose.model<iExercises>("exercises", exercisesSchema);

export default ExercisesModel;
