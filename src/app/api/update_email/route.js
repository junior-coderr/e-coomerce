import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "@/lib/jwt";
import { getToken } from "next-auth/jwt";
import { updateVerificationEmail } from "@/helpers/updateVerificationEmail";
import connectDB from "@/models/connect.db";
import User from "@/models/user";
import jwt from "jsonwebtoken";

export const POST = async function (req) {
  const res_data = await req.json();
  // console.log("res_data", res_data);

  const cook = cookies().get("token");

  console.log("cookies", cook);
  if (!cookies().get("token")) {
    return NextResponse.json({ success: false, message: "User not found" });
  }

  const token = cookies().get("token").value;

  const user = await verify(token);

  console.log("user", user);

  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" });
  }

  if (res_data.email == user.email) {
    console.log("email is same");
    return NextResponse.json({
      success: false,
      message: "Same email cannot be updated",
      no: 1,
    });
  } else {
    console.log("email is not same");
  }

  // await connectDB();
  // const doesExist = await User.findOne({ email: res_data.email });

  // if (doesExist) {
  //   return NextResponse.json({
  //     success: false,
  //     message: "Email is already registered",
  //     no: 2,
  //   });
  // }
  // updating user
  // const updateEmail = await User.updateOne(
  //   { email: user.email },
  //   { email: res_data.email }
  // );

  // creating a new token with 10 min expiry
  const new_token = jwt.sign(
    { newEmail: res_data.email, oldEmail: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );

  console.log("oldEmail", user.email, "\n");

  const res = await updateVerificationEmail(new_token, res_data.email);
  console.log(res);

  return NextResponse.json({
    success: true,
    message: "Verification email sent",
  });
};
