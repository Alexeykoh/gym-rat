import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  const session: any = await getServerSession(req);
  // Check if the user is authenticated
  // console.log("session", session);
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "User is not authenticated" },
  //     { status: 401 }
  //   );
  // }
  //
  await connectMongoDB();
  // //
  // const userData = await UserModel.findOne({
  //   email: session?.user?.email,
  // });
  // const id = userData._id.toString();
  // const workouts = await WorkoutModel.find({ user_id: id });
  return NextResponse.json({ message: "exercises" }, { status: 200 });
}
