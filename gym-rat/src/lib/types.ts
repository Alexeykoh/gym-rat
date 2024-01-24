

export interface iUserParameters {
  user_id: string;
  age: number;
  weight: number;
  height: number;
}
[];

export interface iGenders {
  id: string;
  name: string;
}
export interface Roles {
  id: string;
  name: string;
}

export interface Workout {
  id: string;
  user_id: string;
  date: string;
  name: string;
  description: string;
}

export interface Exercises {
  id: string;
  workout_id: string;
  exercise_id: string;
  date: string;
  name: string;
  repeats: { order: number; weight: number }[];
}

export interface Exercise {
  id: string;
  exercise_type_id: string;
  name: string;
}
export interface ExerciseType {
  id: string;
  name: string;
}

export interface Records {
  id: string;
  exercise_id: string;
  workout_id: string;
  repeat_order: number;
}
export interface Goals {
  id: string;
  exercise_id: string;
  max_weight: number;
}

export interface ExerciseDescriptions {
  id: string;
  exercise_id: string;
  description: string;
}
