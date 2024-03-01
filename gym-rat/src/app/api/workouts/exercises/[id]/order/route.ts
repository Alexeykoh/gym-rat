import connectMongoDB from "@/lib/mongodb";
import WorkoutExercisesModel, {
  iWorkoutExercises,
} from "@/models/WorkoutExercisesModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
    const reqParams: iWorkoutExercises = await req.json();
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
