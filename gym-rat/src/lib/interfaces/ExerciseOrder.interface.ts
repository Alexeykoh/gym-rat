export enum iMeasureEnum {
  kg = "kg",
  lbs = "lbs",
  count = "count",
  s = "s",
  min = "min",
}

export interface iExerciseOrder {
  _id?: string;
  exercise_id: string;
  amount: number;
  order: number;
  measure: iMeasureEnum;
}
