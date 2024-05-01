import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
import { decode } from "@/lib/jwt";
import mongoose from "mongoose";

export async function POST(req) {
  // connecting db
  try {
    await connectDB();

    const cookieStore = cookies();
    const JWT_id = cookieStore.get("token").value;
    const { productId } = await req.json();

    // decoding the JWT
    const email = decode(JWT_id).email;

    // updating the user's wishlist with the product id
    console.log("email", email);
    const user = await User.findOne({ email });

    // checking if the products already exists in the wishlist
    if (user.wishlist.includes(productId)) {
      // removing the existing product from the wishlist
      const productIdObject = new mongoose.Types.ObjectId(productId);
      user.wishlist = user.wishlist.filter((id) => !id.equals(productIdObject));

      //setting empty array
      // user.wishlist = [];
      const stored = await user.save();
      console.log("yaya", stored);
      console.log("Product already exists in the wishlist");
      return NextResponse.json(
        {
          success: true,
          message: "Product already exists in the wishlist",
          exist: true,
        },
        { status: 400 }
      );
    }

    user.wishlist.push(productId);
    const stored = await user.save();
    console.log("yaya", stored);

    return NextResponse.json(
      { success: true, email, productId, exist: false },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error.message);
    return NextResponse.json(
      { success: false, message: error.message, exist: false },
      { status: 500 }
    );
  }
}
