import connectMongoDB from "@/lib/mongodb";
import WorkoutExercisesModel, {
  iWorkoutExercises,
} from "@/models/workoutExercisesModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
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
  const allExerciseTypes = await WorkoutExercisesModel.find({});
  return NextResponse.json({ message: allExerciseTypes }, { status: 200 });
}

export async function POST(req: any) {
  // create new workout exercises
  //
  try {
    console.log("post workoutExercise");
    const session = await getServerSession(req);
    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    //
    const reqParams: iWorkoutExercises = await req.json();
    console.log("reqParams", reqParams);
    //
    await connectMongoDB();
    //
    const oldExerciseType = await WorkoutExercisesModel.findOne({
      name: reqParams.name,
    });
    //
    if (oldExerciseType) {
      return NextResponse.json(
        {
          error: "Type is already created",
          message: "Type is already created",
        },

        { status: 409 }
      );
    }
    //
    const newWorkoutExercise = await WorkoutExercisesModel.create({
      ...reqParams,
    });
    return NextResponse.json(
      { message: "Type created", newWorkoutExercise },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
