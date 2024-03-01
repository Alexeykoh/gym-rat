import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import connectMongoDB from "@/lib/mongodb";
import OrderModel from "@/models/OrderModel";
import UserModel from "@/models/UserModel";
import WorkoutExercisesModel from "@/models/WorkoutExercisesModel";
import WorkoutModel from "@/models/WorkoutModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const getSwitch: any = {
  all: async () => {
    const result = await WorkoutModel.find({}).sort({ date: -1 }) as iWorkout[];
    return result;
  },
  latest: async (id: string) => {
    const today = new Date(Date.now());
    return await WorkoutModel.findOne({
      user_id: id,
      date: { $lte: today },
    })
      .sort({ date: -1 })
      .lean();
  },
  previous: async (id: string) => {
    const today = new Date(Date.now());
    return await WorkoutModel.find({
      user_id: id,
      date: { $lt: today },
    })
      .sort({ date: -1 })
      .lean();
  },
  today: async (id: string) => {
    const today = new Date(Date.now());
    return await WorkoutModel.findOne({
      user_id: id,
      date: { $eq: today },
    })
      .sort({ date: -1 })
      .lean();
  },
  nextOne: async (id: string) => {
    const today = new Date(Date.now());
    return await WorkoutModel.findOne({
      user_id: id,
      date: { $gt: today },
    })
      .sort({ date: -1 })
      .lean();
  },
};
export async function POST(req: any) {
  // create new workout
  //
  try {
    const session = await getServerSession(req);
    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    //
    const reqParams: iWorkout = await req.json(); // get params from request
    await connectMongoDB(); // connect to BD
    //
    await WorkoutModel.create({ ...reqParams }); // create new user
    return NextResponse.json(
      { message: "User Created", params: reqParams },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: any, res: any) {
  // get all workouts
  //
  const session: any = await getServerSession(req);
  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }
  //
  await connectMongoDB();
  //
  const userData = await UserModel.findOne({
    email: session?.user?.email,
  });
  const id = userData._id.toString();
  const type = req.nextUrl.searchParams.get("type");
  const page = req.nextUrl.searchParams.get("page");
  if (type) {
    const getResult = await getSwitch[type](id);
    return NextResponse.json(getResult, { status: 200 });
  }
  if (page) {
    const storeObject = {
      exercises: [],
      workouts: [],
      orders: [],
    };
    //
    const perPage = 4;
    const today = new Date(Date.now());
    const pageReq = req.nextUrl.searchParams.get("page");
    const skip = (pageReq - 1) * perPage;
    const totalItems = await WorkoutModel.countDocuments();
    const workouts = await WorkoutModel.find({
      user_id: id,
      date: { $lt: today },
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(perPage);
    storeObject.workouts = workouts;
    //
    const itemsID = workouts.map((el: any) => el._id.toString());
    const exercises = await WorkoutExercisesModel.find({
      workout_id: { $in: itemsID },
    });
    storeObject.exercises = exercises;
    //
    const exercisesId = exercises.map((el: any) => el._id.toString());
    const orders = await OrderModel.find({
      exercise_id: { $in: exercisesId },
    });
    storeObject.orders = orders;
    //
    return NextResponse.json(
      {
        storeObject,
        currentPage: page,
        totalPages: Math.ceil(totalItems / perPage),
      },
      { status: 200 }
    );
  }
}
