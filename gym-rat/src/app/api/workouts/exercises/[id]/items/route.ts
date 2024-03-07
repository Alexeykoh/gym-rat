import OrderModel from "@/features/models/orderModel";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  try {
    // get workout exercises by ID
    //
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
    const allOrders = await OrderModel.find({
      exercise_id: params.id,
    });
    return NextResponse.json({ message: allOrders }, { status: 200 });
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
