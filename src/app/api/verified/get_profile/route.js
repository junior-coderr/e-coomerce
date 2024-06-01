import { verify } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/models/connect.db";
import User from "@/models/user";

export async function POST(req) {
  try {
    // TODO : getting token
    const cookieStore = cookies();
    let token = cookieStore.get("token")
      ? cookieStore.get("token").value
      : null;
    const request = await req.json();

    if (!token) {
      token = request.token ? request.token : null;
    }

    if (!token)
      return NextResponse.json({ success: false, data: "Token not found" });

    const data = await verify(token);

    if (!data)
      return NextResponse.json({ success: false, data: "User not found" });

    await connectDB();
    const user = await User.findOne({ email: data.email });

    if (!user)
      return NextResponse.json({ success: false, data: "User not found" });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.log("Error:::", error.message);
    return NextResponse.json({ success: false, data: error.message });
  }
}
