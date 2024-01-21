import { connectToDb } from "./utils";

export const getWorkouts = async (params: any) => {
  try {
    connectToDb();
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
