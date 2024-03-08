import WorkoutModel from "@/features/models/workoutModel";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  // get all workout exercises
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
  const allExerciseTypes = await WorkoutModel.find({ user_id: params.id });
  //
  return NextResponse.json({ ...allExerciseTypes }, { status: 200 });
}
