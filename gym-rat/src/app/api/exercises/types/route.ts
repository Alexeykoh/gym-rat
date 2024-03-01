import connectMongoDB from "@/lib/mongodb";
import ExerciseTypeModel, { iExerciseType } from "@/models/ExerciseTypeModel";
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
  const allExerciseTypes = await ExerciseTypeModel.find({});
  return NextResponse.json([...allExerciseTypes], { status: 200 });
}

export async function POST(req: any) {
  // create new type
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
    await connectMongoDB();
    const oldExerciseType = await ExerciseTypeModel.findOne({
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
    const newType = await ExerciseTypeModel.create({ ...reqParams });
    // const newType = await ExerciseTypeModel.findOne({
    //   name: reqParams.name,
    // });
    return NextResponse.json(
      { message: "Type created", newType },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
