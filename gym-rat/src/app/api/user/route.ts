import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { login, email } = await req.json();
  await connectMongoDB();
  await User.create({ login, email });
  return NextResponse.json(
    { message: "User Created", login, email },
    { status: 200 }
  );
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users }, { status: 200 });
}
export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
