import connectMongoDB from "@/lib/mongodb";
import WorkoutModel, { iWorkout } from "@/models/workoutModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
    //
    const params: iWorkout = await req.json(); // get params from request
    console.log("params", params);
    await connectMongoDB(); // connect to BD
    //
    await WorkoutModel.create({ ...params }); // create new user
    return NextResponse.json(
      { message: "User Created", params },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: any, res: any) {
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
    //
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    //
    const userData = await WorkoutModel.findOne({
      _id: id,
    });
    //
    return NextResponse.json({ message: userData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
