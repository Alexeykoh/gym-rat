import connectMongoDB from "@/lib/mongodb";
import { iExercise } from "@/models/ExerciseModel";
import WorkoutModel from "@/models/WorkoutModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  // get one workout by ID
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
  const result = await WorkoutModel.findOne({ _id: params.id });
  // result.forEach((el: any) => {

  //   console.log(el);
  // });

  // console.log("result", result);
  return NextResponse.json({ message: result }, { status: 200 });
}

export async function PUT(req: any, { params }: any) {
  // edit workout by ID
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
    //
    await connectMongoDB(); // connect to BD
    //
    const update = await WorkoutModel.findOneAndUpdate(
      {
        _id: params.id,
      },
      { ...reqParams }
    );

    return NextResponse.json(
      { message: "Workout updated", params: update },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: any) {
  // delete workout by ID
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
  await WorkoutModel.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Exercise was delete" }, { status: 200 });
}
