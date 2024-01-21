import {
  Exercise,
  ExerciseType,
  Exercises,
  Genders,
  Roles,
  User,
  UserParameters,
  Workout,
} from "./types";
//
export const genders: Genders[] = [
  { id: "0", name: "male" },
  { id: "1", name: "female" },
];

export const roles: Roles[] = [
  { id: "0", name: "Admin" },
  { id: "1", name: "User" },
];

export const mockUser: User = {
  id: "0",
  login: "alexeykoh",
  mail: "alexeykoh@mail.ru",
  gender_id: "0",
  first_name: "Alexey",
  last_name: "Koh",
  avatar: "",
  reg_date: "19.01.2024",
  role_id: "0",
};

export const mockUserParams: UserParameters[] = [
  { user_id: "0", age: 29, weight: 91, height: 193 },
];

//
export const mockWorkout: Workout[] = [
  {
    id: "0",
    user_id: "0",
    date: "16.01.2024",
    name: "Грудь/Бицепс",
    description: "Круговая тренировка с акцентом",
  },
  {
    id: "1",
    user_id: "0",
    date: "18.01.2024",
    name: "Спина/Трицепс",
    description: "Круговая тренировка с акцентом",
  },
  {
    id: "2",
    user_id: "0",
    date: "20.01.2024",
    name: "Ноги/Плечи",
    description: "Круговая тренировка с акцентом",
  },
];
export const exerciseType: ExerciseType[] = [
  {
    id: "0",
    name: "chest",
  },
  {
    id: "1",
    name: "legs",
  },
];
export const exercise: Exercise[] = [
  {
    id: "0",
    exercise_type_id: "0",
    name: "Жим лежа",
  },
];
export const exercises: Exercises[] = [
  {
    id: "0",
    workout_id: "0",
    exercise_id: "0",
    date: "",
    name: "Жим лежа",
    repeats: [
      { order: 1, weight: 20 },
      { order: 2, weight: 40 },
      { order: 3, weight: 60 },
      { order: 4, weight: 70 },
    ],
  },
];
