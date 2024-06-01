import { NextResponse } from "next/server";
import { verify, decode, sign } from "@/lib/jwt";
import { cookies } from "next/headers";
import connectDB from "@/models/connect.db";
import User from "@/models/user";

export async function GET(request, { params }) {
  console.log("params", params.id);
  let isUpdated = {
    success: false,
    message: "",
  };
  try {
    const cookieStore = cookies();

    // TODO : Add a check for Token
    if (!params.id)
      return NextResponse.json({ success: false, message: "Invalid token" });

    const verify2 = await verify(params.id);

    // TODO : Add a check for Token
    if (!verify2)
      return NextResponse.json({ success: false, message: "Invalid token" });
    if (!verify2.newEmail || !verify2.oldEmail) {
      return NextResponse.json({
        success: false,
        message: "Invalid token",
      });
    }

    // TODO : Add a check for same Email
    if (verify2.newEmail === verify2.oldEmail)
      return NextResponse.json({
        success: false,
        message: "Email is same",
      });

    // TODO Connecting DB
    await connectDB();
    const doesExist = await User.findOne({ email: verify2.newEmail });

    // TODO : Checking new email is already registered or not
    if (doesExist)
      return NextResponse.json({
        success: false,
        message: "Email is already registered",
      });

    // TODO : Updating the email
    const updateEmail = await User.findOneAndUpdate(
      { email: verify2.oldEmail },
      { $set: { email: verify2.newEmail } },
      { new: true }
    );

    // TODO : Signing the new token
    const token = sign({
      name: updateEmail.name,
      email: verify2.newEmail,
      isRegistered: true,
    });

    // TODO : Setting the new token
    cookieStore.set("token", token, {
      maxAge: 60 * 60 * 24,
      path: "/",
      httpOnly: true,
    });

    // TODO : Updating status
    isUpdated.success = true;
  } catch (error) {
    // TODO : Updating status
    isUpdated.message = error.message;
  }

  if (isUpdated) {
    // TODO : Redirecting to login page
    return NextResponse.json({ success: true, message: "Email updated" });
  } else {
    // TODO : Redirecting to login page
    console.log("Failed updating email:::", isUpdated.message);
    return NextResponse.json({
      success: false,
      message: "Failed updating email",
    });
  }
}
