import {
  iWorkout,
  iWorkoutResponse,
} from "@/lib/interfaces/Workouts.interface";
import connectMongoDB from "@/lib/mongodb";
import UserModel from "@/models/UserModel";
import WorkoutModel from "@/models/WorkoutModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const getSwitch: any = {
  all: async () => {
    const result = (await WorkoutModel.find({}).sort({
      date: -1,
    })) as iWorkout[];
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
  try {
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    const reqParams: iWorkout = await req.json(); // get params from request
    await connectMongoDB(); // connect to BD
    const user = await UserModel.findById(reqParams.user_id);
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    //
    await WorkoutModel.create({ ...reqParams }); // create new user
    return NextResponse.json(
      { message: "Workout Created", params: reqParams },
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
  const type = req.nextUrl.searchParams.get("type") as string;
  const page = req.nextUrl.searchParams.get("page") as number;
  if (type) {
    const getResult = await getSwitch[type](id);
    return NextResponse.json(getResult, { status: 200 });
  }
  if (page) {
    const perPage = 6;
    const today = new Date(Date.now());
    const pageReq = req.nextUrl.searchParams.get("page") as number;
    const skip = (pageReq - 1) * perPage;
    const totalItems = await WorkoutModel.countDocuments();
    const workouts: iWorkout[] = await WorkoutModel.find({
      user_id: id,
      date: { $lt: today },
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(perPage);
    const currentResp: iWorkoutResponse = {
      workouts: workouts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalItems / perPage),
    };
    return NextResponse.json(currentResp, { status: 200 });
  }
}
