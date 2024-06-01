import { cookies } from "next/headers";
import { sign, verify, decode } from "../../../lib/jwt";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const cookieStore = cookies();
    const { email } = await req.json();
    // console.log("email", email);

    const existingUserVerifiedByEmail = await User.findOne({ email });
    if (existingUserVerifiedByEmail) {
      let otp = Math.floor(100000 + Math.random() * 900000);
      const salt = await bcrypt.genSalt(10);

      console.log(
        await sendVerificationEmail(
          email,
          existingUserVerifiedByEmail.name,
          otp
        )
      );

      console.log("existingUserVerifiedByEmail", existingUserVerifiedByEmail);
      otp = await bcrypt.hash(otp.toString(), salt);
      const token = sign({
        name: existingUserVerifiedByEmail.name,
        email,
        otp,
        isRegistered: true,
      });
      cookieStore.set("token", token, {
        maxAge: 60 * 60,
        path: "/",
        httpOnly: true,
      });
      return NextResponse.json(
        { success: true, message: "OTP Sent" },
        { status: 400 }
      );
    } else {
      console.log("User does not exist");

      return NextResponse.json(
        { success: false, message: "User does not exist" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
