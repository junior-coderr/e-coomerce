import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "./app/lib/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  console.log("request.url", "yes!!");

  //   displaying base path
  const url = new URL(request.url);

  if (url.pathname.startsWith("/register/signup/verify")) {
    console.log("request.url\n \n", request.url);

    try {
      const isVerified = await verify(cookies().get("token").value);
      if (isVerified.otp) {
        return;
      }
      console.log("isVerified", isVerified);
      return NextResponse.redirect(new URL("/register/login", request.url));

      // return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
      console.log("error134", error.message);
      return NextResponse.redirect(new URL("/register/login", request.url));
    }
  }
  //   return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/register/signup/verify",
};
