import connectMongoDB from "@/lib/mongodb";
import UserModel from "@/models/userModel";
import WorkoutModel, { iWorkout } from "@/models/workoutModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const getSwitch: any = {
  all: async () => {
    return await WorkoutModel.find({});
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
  const getResult = await getSwitch[type](id);
  //
  const result = await WorkoutModel.find({});
  return NextResponse.json({ message: getResult }, { status: 200 });
}
