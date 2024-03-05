import UserModel from "@/features/models/userModel";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: any, { params }: any) {
  // delete user by ID
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
  // const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await UserModel.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}

export async function GET(req: any, { params }: any) {
  // get user by ID
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
  const users = await UserModel.findOne({ _id: params.id });
  return NextResponse.json({ users }, { status: 200 });
}
