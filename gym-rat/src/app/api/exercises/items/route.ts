import connectMongoDB from "@/lib/mongodb";
import ExerciseModel, { iExercise } from "@/models/exerciseModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  // get all exercises
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
  const allExercise = await ExerciseModel.find({});
  return NextResponse.json({ message: allExercise }, { status: 200 });
}

export async function POST(req: any) {
  // create new exercise
  //
  try {
    const session = await getServerSession(req);
    const reqParams: iExercise = await req.json();
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
    const oldExercise = await ExerciseModel.findOne({ name: reqParams.name });
    if (oldExercise) {
      return NextResponse.json(
        { error: "Exercise is already created" },
        { status: 409 }
      );
    }
    //
    await ExerciseModel.create({ ...reqParams });
    return NextResponse.json(
      { message: "Exercise Created", params: reqParams },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
