import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "./lib/jwt";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // console.log("request.TEST");
  const url = new URL(request.url);

  // for profile page

  if (cookies().get("token")) {
    var isVerified = await verify(cookies().get("token").value);
    // checking is validity of token
    console.log("isVerified", isVerified);
  } else {
    console.log("ss", cookies().get("token"));
    var isVerified = null;
  }

  if (url.pathname.startsWith("/profile")) {
    if (isVerified) {
      // console.log("token", token);
      return;
    } else {
      return NextResponse.redirect(new URL("/register/login", request.url));
    }
  }

  if (url.pathname.startsWith("/register/signup/verify")) {
    try {
      const isVerified = await verify(cookies().get("token").value);
      if (isVerified.otp) {
        return;
      }
      // console.log("isVerified", isVerified);
      return NextResponse.redirect(new URL("/register/login", request.url));

      // return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      console.log("error134", error.message);
      return NextResponse.redirect(new URL("/register/login", request.url));
    }
  }

  if (url.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/register/signup/verify", "/profile:path*", "/"],
};
