import connectMongoDB from "@/lib/mongodb";
import ExerciseModel from "@/models/exerciseModel";
import ExerciseTypeModel, { iExerciseType } from "@/models/exerciseTypeModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  // get type by ID
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
  const allExerciseTypes = await ExerciseTypeModel.findOne({ _id: params.id });
  return NextResponse.json({ message: allExerciseTypes }, { status: 200 });
}

export async function PUT(req: any, { params }: any) {
  // edit type by ID
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
    const reqParams: iExerciseType = await req.json();
    await connectMongoDB(); // connect to BD
    //
    const update = await ExerciseTypeModel.findOneAndUpdate(
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
    const deleteBounce = await ExerciseModel.deleteMany({ type_id: params.id });
    await ExerciseTypeModel.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Exercise was delete" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
