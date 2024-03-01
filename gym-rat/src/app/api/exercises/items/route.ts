import connectMongoDB from "@/lib/mongodb";
import ExerciseModel, { iExercise } from "@/models/ExerciseModel";
import UserModel from "@/models/UserModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const switchType: any = {
  all: async () => {
    console.log("switchType all");
    return await ExerciseModel.find({});
  },
  type_id: async (id: string) => {
    console.log("switchType type_id");
    return await ExerciseModel.find({ type_id: id });
  },
};

export async function GET(req: any, res: any) {
  // get all exercises
  //
  const session: any = await getServerSession(req);
  const userData = await UserModel.findOne({
    email: session?.user?.email,
  });
  //
  const typeIdParam = req.nextUrl.searchParams.get("type_id");
  //
  //
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
  if (typeIdParam !== null) {
    const resultParams = await switchType["type_id"](typeIdParam);
    return NextResponse.json({ message: resultParams }, { status: 200 });
  } else {
    console.log("get all", typeIdParam !== null);
    const result = await ExerciseModel.find({});
    return NextResponse.json([...result], { status: 200 });
  }

  //
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
