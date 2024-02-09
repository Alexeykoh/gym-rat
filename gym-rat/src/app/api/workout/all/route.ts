import connectMongoDB from "@/lib/mongodb";
import UserModel from "@/models/userModel";
import WorkoutModel from "@/models/workoutModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  try {
    const session: any = await getServerSession(req);
    // Check if the user is authenticated
    console.log("session", session);
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
    const workouts = await WorkoutModel.find({ user_id: id }).sort({
      date: -1,
    });
    return NextResponse.json({ message: workouts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
