import { iExercise } from "@/models/ExerciseModel";

export type pageProps = {
  typeID: string;
  onSuccess: () => any;
  name: string;
};

export interface iErrors extends iExercise {
  exist: string;
}
