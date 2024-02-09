import connectMongoDB from "@/lib/mongodb";
import ExerciseModel, { iExercise } from "@/models/exerciseModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
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
  try {
    const session = await getServerSession(req);
    // Check if the user is authenticated
    console.log("session", session);
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    const params: iExercise = await req.json();
    console.log(params); // get params from request
    await connectMongoDB(); // connect to BD
    const oldExercise = await ExerciseModel.findOne({ name: params.name }); // check that user was created
    console.log("oldExercise", oldExercise);
    if (oldExercise) {
      return NextResponse.json(
        { error: "Exercise is already created" },
        { status: 409 }
      );
    }
    //
    await ExerciseModel.create({ ...params }); // create new exercise
    return NextResponse.json(
      { message: "Exercise Created", params },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: any) {
  try {
    const session = await getServerSession(req);
    const id = req.nextUrl.searchParams.get("id");
    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    //
    const params: iExercise = await req.json();
    await connectMongoDB(); // connect to BD
    //
    const update = await ExerciseModel.findOneAndUpdate(
      {
        _id: id,
      },
      { ...params }
    );

    return NextResponse.json(
      { message: "Exercise updated", params },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: any, res: any) {
  const session: any = await getServerSession(req);
  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }
  //
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ExerciseModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Exercise was delete" }, { status: 200 });
}
