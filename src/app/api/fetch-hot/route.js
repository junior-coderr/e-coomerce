import connectDB from "@/models/connect.db";
import { NextResponse } from "next/server";
import SomethingNew from "@/models/somethingNew";
export async function POST() {
  try {
    await connectDB();
    const data = await SomethingNew.find({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
