import ExerciseModel from "@/features/models/ExerciseModel";
import { iExercise } from "@/lib/interfaces/Exercise.interface";
import connectMongoDB from "@/lib/mongodb";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  // get one exercise by ID
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
  const result = await ExerciseModel.find({ type_id: params.id });
  return NextResponse.json({ message: result }, { status: 200 });
}

export async function PUT(req: any, { params }: any) {
  // edit exercise by ID
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
    const update = await ExerciseModel.findOneAndUpdate(
      {
        _id: params.id,
      },
      { ...reqParams }
    );

    return NextResponse.json(
      { message: "Exercise updated", params: update },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: any) {
  // delete exercise by ID
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
  await ExerciseModel.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Exercise was delete" }, { status: 200 });
}
