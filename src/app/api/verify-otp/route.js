import { cookies } from "next/headers";
import { sign, verify, decode } from "../../../lib/jwt";
import { NextResponse } from "next/server";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const cookieStore = cookies();
    // decoding jtw
    // console.log(cookieStore.get("token").value);
    const { name, email, otp, isRegistered } = decode(
      cookieStore.get("token").value
    );
    const userData = await req.json();

    // checking otp
    const isOtpValid = await bcrypt.compare(userData.otp, otp);

    if (!isOtpValid) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    if (!isRegistered) {
      console.log("not registered");
      cookieStore.set("token", sign({ name, email, isRegistered: true }));
      console.log("token set");
      const createdUser = new User({
        name,
        email,
        cart: [], // Empty array for cart
        orders: [], // Empty array for orders
        address: [],
        currentOrder: [],
      });

      await createdUser.save();

      // const createdUser = await User.create({
      //   name,
      //   email,
      //   cart: [], // Empty array for cart
      //   orders: [], // Empty array for orders
      //   address: [],
      //   currentOrder: [],
      // });
      console.log("created user", createdUser);
      return NextResponse.json(
        { success: true, message: "Verified", data: createdUser },
        { status: 200 }
      );
    } else {
      cookieStore.set("token", sign({ name, email, isRegistered: true }));
      const createdUser = "none";
      return NextResponse.json(
        { success: true, message: "Verified", data: "createdUser" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
