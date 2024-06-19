import { NextResponse } from "next/server";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
import mongoose from "mongoose";
export async function POST(req) {
  try {
    await connectDB();
    const { product_id } = await req.json();
    // console.log("product_id", user);
    const email = req.headers.get("email");
    const updatedUserCart = await User.findOne({ email });
    const cart = updatedUserCart.cart;
    // poping out the product from the cart array
    const updatedCart = cart.filter((item) => {
      return item.product_id.toString() !== product_id;
    });
    updatedUserCart.cart = updatedCart;
    await updatedUserCart.save();
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
