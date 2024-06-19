import { NextResponse } from "next/server";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
export async function GET() {
  try {
    await connectDB();
    const token = cookies().get("token")?.value;
    const isVerified = await verify(token);
    const email = isVerified?.email;
    const user = await User.findOne({ email });
    // populated data
    const populatedUser = await user.populate("cart.product");
    console.log("populatedUser", populatedUser);

    if (!user) {
      return NextResponse.json(
        { success: false, carted: false, isVerified: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        carted: true,
        isVerified: true,
        cart: populatedUser.cart,
        address: user.address,
      },
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
