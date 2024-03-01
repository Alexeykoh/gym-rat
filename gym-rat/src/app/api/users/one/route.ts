import { iUser, iUserData } from "@/lib/interfaces/User.interface";
import connectMongoDB from "@/lib/mongodb";
import UserModel from "@/models/UserModel";
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

  const usersResponse: iUser = await UserModel.findOne({ ...par });
  const readyResponse: iUserData = {
    _id: usersResponse?._id || "",
    email: usersResponse?.email || "",
    role: usersResponse?.role || "",
    name: usersResponse?.name || "",
    avatar: usersResponse?.avatar || "",
  };
  return NextResponse.json({ ...readyResponse }, { status: 200 });
}
