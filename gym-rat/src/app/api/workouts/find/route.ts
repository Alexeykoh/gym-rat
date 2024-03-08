import UserModel from "@/features/models/userModel";
import WorkoutModel from "@/features/models/workoutModel";
import { iWorkout } from "@/lib/interfaces/Workouts.interface";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
  await connectMongoDB();
  const userData = await UserModel.findOne({
    email: session?.user?.email,
  });
  const id = userData._id.toString();
  const searchValue = req.nextUrl.searchParams.get("search") as string;
  if (!searchValue) {
    return NextResponse.json([] as iWorkout[], { status: 200 });
  }
  const searchRes = await WorkoutModel.find({
    user_id: id,
    $or: [
      { name: { $regex: new RegExp(searchValue, "i") } },
      { description: { $regex: new RegExp(searchValue, "i") } },
      // { date: { $regex: new RegExp(searchValue, "i") } },
    ],
  }).catch((error) => {
    console.error(error);
  });

  return NextResponse.json(searchRes as iWorkout[], { status: 200 });
}
