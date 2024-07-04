import { NextResponse } from "next/server";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
import mongoose from "mongoose";
export async function POST(req) {
  try {
    await connectDB();

    const user = await req.json();
    console.log("user", user);
    const { product_id, quantity, color, size, delivery_charges } = user;
    const email = req.headers.get("email");
    console.log("delivery_charges", delivery_charges.base_charge);
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
            delivery_charges,
          },
        },
      },
      { new: true }
    );
    console.log("updatedUserCart", updatedUserCart);
    return NextResponse.json(
      { success: true, carted: true, isVerified: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        success: false,
        carted: false,
        isVerified: true,
        message: "Something went wrong!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
