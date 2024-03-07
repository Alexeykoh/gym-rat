import OrderModel from "@/features/models/orderModel";
import { iExerciseOrder } from "@/lib/interfaces/ExerciseOrder.interface";
import connectMongoDB from "@/lib/mongodb";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: any, { params }: any) {
  // create new workout exercises
  //
  try {
    console.log("order POST");
    const session = await getServerSession(req);
    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }
    //
    const reqParams: iExerciseOrder = await req.json();
    console.log("reqParams", reqParams);
    //
    await connectMongoDB();
    //
    const newOrder = await OrderModel.create({
      ...reqParams,
    });
    return NextResponse.json(
      { message: "Order created", data: newOrder },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: any, { params }: any) {
  // edit orderItem by ID
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
    const reqParams: iExerciseOrder = await req.json();
    console.log("reqParams", reqParams);
    await connectMongoDB(); // connect to BD
    //
    const update = await OrderModel.findOneAndUpdate(
      {
        _id: params.id,
      },
      { ...reqParams }
    );

    return NextResponse.json(
      { message: "OrderItem updated", params: update },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: any, { params }: any) {
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
    await OrderModel.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "OrderItem was delete" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("error", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
