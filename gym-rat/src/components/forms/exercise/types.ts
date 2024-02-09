import { iExercise } from "@/models/exerciseModel";
import { iExerciseType } from "@/models/exerciseTypeModel";

export type pageProps = {
  typeList: iExerciseType[];
  onSuccess: () => any;
};

export interface iErrors extends iExercise {
  exist: string;
}
