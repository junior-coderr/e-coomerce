import { NextResponse } from "next/server";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
import mongoose from "mongoose";
export async function POST(req) {
  try {
    await connectDB();

    const user = await req.json();
    console.log("user", user);
    const { product_id, quantity, color, size } = user;
    const email = req.headers.get("email");
    const updatedUserCart = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          cart: {
            product: new mongoose.Types.ObjectId(product_id),
            product_id: new mongoose.Types.ObjectId(product_id),
            quantity,
            color,
            size,
          },
        },
      },
      { new: true }
    );
    console.log("updatedUserCart", updatedUserCart);
    return NextResponse.json({ success: true, carted: true }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        carted: false,
        message: "Something went wrong!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
