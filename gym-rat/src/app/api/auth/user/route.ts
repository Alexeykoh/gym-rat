import connectMongoDB from "@/lib/mongodb";
import UserModel, { iUser } from "@/models/userModel";
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
    const params: iUser = await req.json(); // get params from request
    await connectMongoDB(); // connect to BD
    const oldUser = await UserModel.findOne({ email: params.email }); // check that user was created
    if (oldUser) {
      return NextResponse.json(
        { error: "User is already created" },
        { status: 409 }
      );
    }
    //
    await UserModel.create({ ...params }); // create new user
    return NextResponse.json(
      { message: "User Created", params },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: any) {
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

export async function DELETE(req: any) {
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
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await UserModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
