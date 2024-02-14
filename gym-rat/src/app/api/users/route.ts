import connectMongoDB from "@/lib/mongodb";
import UserModel from "@/models/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  // get all users
  //
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
  await connectMongoDB();
  //
  const users = await UserModel.find();
  return NextResponse.json({ users }, { status: 200 });
}
