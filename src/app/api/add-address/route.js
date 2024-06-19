import { NextResponse } from "next/server";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
export async function POST(req) {
  try {
    await connectDB();
    const email = req.headers.get("email");
    const user = await req.json();
    const { address } = user;
    // console.log("address", address);
    // console.log("email", email);
    const updatedUserAddress = await User.findOne({ email });
    console.log("updatedUserAddress", updatedUserAddress);
    updatedUserAddress.address.push(address);
    await updatedUserAddress.save();
    console.log("updatedUserAddress", updatedUserAddress);
    return NextResponse.json(
      { success: true, added: true, isVerified: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("error new", error);
    return NextResponse.json(
      {
        success: false,
        added: false,
        isVerified: true,
        message: "Something went wrong!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
