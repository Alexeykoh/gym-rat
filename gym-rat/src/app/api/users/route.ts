import UserModel from "@/features/models/UserModel";
import { iUser } from "@/lib/interfaces/User.interface";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  // get all users
  //
  const session = await getServerSession(req);
  const emailSearchParams = req.nextUrl.searchParams;
  console.log("emailSearchParams", emailSearchParams);
  //
  // Check if the user is authenticated
  const par = Object.fromEntries(emailSearchParams);
  console.log("session", par);
  if (!session) {
    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 }
    );
  }
  //
  await connectMongoDB();
  //

  const usersResponse: iUser[] = await UserModel.find({ ...par });
  return NextResponse.json({ usersResponse }, { status: 200 });
}
