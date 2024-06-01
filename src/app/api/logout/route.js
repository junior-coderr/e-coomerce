import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export const GET = async function (req) {
  // logout the user
  cookies().set("token", "", {
    maxAge: 0,
  });
  return NextResponse.json({ message: "logged out", status: 200 });
};
