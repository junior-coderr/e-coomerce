import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "./lib/jwt";
import Header from "./app/components/header";
// import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  console.log("req.TEST");
  const url = new URL(req.url);
  console.log("url.pathname", url.pathname);

  // for profile page

  if (cookies().get("token")) {
    var isVerified = await verify(cookies().get("token").value);
    // checking is validity of token
    if (isVerified) {
      console.log("isVerified:", true);
    }
  } else {
    console.log("ss", cookies().get("token"));
    var isVerified = null;
  }

  if (url.pathname.startsWith("/profile")) {
    if (isVerified) {
      // console.log("token", token);
      return;
    } else {
      return NextResponse.redirect(new URL("/register/login", req.url));
    }
  }

  if (url.pathname.startsWith("/register/signup/verify")) {
    try {
      const isVerified = await verify(cookies().get("token").value);
      if (isVerified.otp) {
        return;
      }
      // console.log("isVerified", isVerified);
      return NextResponse.redirect(new URL("/register/login", req.url));

      // return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch (error) {
      console.log("error134", error.message);
      return NextResponse.redirect(new URL("/register/login", req.url));
    }
  }

  if (
    url.pathname.startsWith("/api/add-cart") ||
    url.pathname.startsWith("/checkout/single") ||
    url.pathname.startsWith("/api/add-address") ||
    url.pathname.startsWith("/api/alter-cart")
  ) {
    console.log("middleware");
    if (isVerified) {
      console.log("Not redirecting");
      const reqHeaders = new Headers(req.headers);
      reqHeaders.set("email", isVerified.email);
      const response = NextResponse.next({ request: { headers: reqHeaders } });
      return response;
    } else {
      console.log("redirecting");
      console.log("req.url", req.url);
      if (url.pathname.startsWith("/api/add-cart")) {
        return NextResponse.json({
          isVerified: false,
          message: "Please login to add to cart",
        });
      }
      return NextResponse.redirect(new URL("/register/login", req.url));
    }
  }

  if (url.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// adding for post req
export const config = {
  matcher: [
    "/register/signup/verify",
    "/profile:path*",
    "/",
    "/api/add-cart",
    "/checkout/single",
    // "/checkout/multiple",
    "/api/add-address",
    "/api/alter-cart",
  ],
  method: ["GET", "POST"],
};
