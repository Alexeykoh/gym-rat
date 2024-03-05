import WorkoutExercisesModel from "@/features/models/WorkoutExercisesModel";
import { iWorkoutExercises } from "@/lib/interfaces/WorkoutExercise.interface";
import { iWorkoutExerciseType } from "@/lib/interfaces/WorkoutExerciseType.interface";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  try {
    // get workout exercises by ID
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
    const allExerciseTypes = await WorkoutExercisesModel.find({
      workout_id: params.id,
    });
    allExerciseTypes.forEach((el: any, ind: number) => {
      console.log(el._id.toString());
    });
    // console.log(`allExerciseTypes`, allExerciseTypes);
    return NextResponse.json({ message: allExerciseTypes }, { status: 200 });
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: any, { params }: any) {
  // edit workout exercises by ID
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
    const reqParams: iWorkoutExerciseType = await req.json();
    await connectMongoDB(); // connect to BD
    //
    const update = await WorkoutExercisesModel.findOneAndUpdate(
      {
        _id: params.id,
      },
      { ...reqParams }
    );

    return NextResponse.json(
      { message: "Type updated", params: update },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: any) {
  // delete workout exercises by ID
  //
  try {
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
    await WorkoutExercisesModel.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Exercise was delete" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: any, { params }: any) {
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
    const newWorkoutExercise = await WorkoutExercisesModel.create({
      ...reqParams,
    });
    return NextResponse.json(
      { message: "Workout exercise created", newWorkoutExercise },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
