import connectMongoDB from "@/lib/mongodb";
import ExerciseTypeModel, { iExerciseType } from "@/models/exerciseTypeModel";
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
  const allExerciseTypes = await ExerciseTypeModel.find({});
  return NextResponse.json({ message: allExerciseTypes }, { status: 200 });
}

export async function POST(req: any) {
  try {
    const session = await getServerSession(req);
    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    const params: iExerciseType = await req.json();
    console.log("params", params);
    await connectMongoDB(); // connect to BD
    const oldExerciseType = await ExerciseTypeModel.findOne({
      name: params.name,
    }); // check that user was created
    console.log("oldExerciseType", oldExerciseType);
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
    await ExerciseTypeModel.create({ ...params }); // create new exercise
    const newType = await ExerciseTypeModel.findOne({
      name: params.name,
    });
    return NextResponse.json(
      { message: "Type created", newType },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
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
    const params: iExerciseType = await req.json();
    await connectMongoDB(); // connect to BD
    //
    const update = await ExerciseTypeModel.findOneAndUpdate(
      {
        _id: id,
      },
      { ...params }
    );

    return NextResponse.json(
      { message: "Type updated", params },
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
  await ExerciseTypeModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Type was delete" }, { status: 200 });
}
