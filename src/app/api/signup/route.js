import connectDB from "@/models/connect.db";
import User from "@/models/user";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign, verify, decode } from "../../../lib/jwt";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const cookieStore = cookies();
    const { email, name } = await req.json();

    const existingUserVerifiedByEmail = await User.findOne({ email });
    if (existingUserVerifiedByEmail) {
      return NextResponse.json(
        { success: false, message: "User Already Exists" },
        { status: 500 }
      );
    } else {
      let otp = Math.floor(100000 + Math.random() * 900000);
      console.log("otp", otp);
      console.log(await sendVerificationEmail(email, name, otp));

      // encrypting the otp
      const salt = await bcrypt.genSalt(10);
      otp = await bcrypt.hash(otp.toString(), salt);

      const token = sign({ name, email, otp, isRegistered: false });
      // creating otp and sending email

      cookieStore.set("token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        httpOnly: true,
      });

      return NextResponse.json(
        { success: true, message: "OTP Sent" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
