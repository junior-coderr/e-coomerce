"use client";
import { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const [btn, setBtn] = useState(false);

  // adding and event for online and offline
  useEffect(() => {
    if (!navigator.onLine) {
      toast.error("No internet connection");
    } else {
      toast.dismiss();
    }
    console.log("online", navigator.onLine);
  }, [navigator.onLine]);

  async function login() {
    const email = emailRef.current.value;
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      email
    );
    if (!isValidEmail) {
      toast.error("Invalid email address");
      return;
    }
    try {
      toast.dismiss();
      toast.loading("Loading...");

      setBtn(false);

      const result = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const response = await result.json();
      toast.remove();
      setBtn(true);
      // console.log(response);
      if (response.success) {
        toast.success("OTP Sent");
        router.push("/register/signup/verify");
      } else {
        toast.error("User not found");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <div className="h-full justify-center items-center">
        {/* a stylish design of a register page */}
        <div className="flex justify-center items-center h-full ">
          <Image
            src="/register.jpg"
            className="hidden md:block"
            alt="s"
            width={500}
            height={500}
          />
          <div className="flex flex-col items-center justify-center gap-4 ">
            <div>
              <h1 className="text-3xl font-semibold ">Login</h1>
              <br />
            </div>
            <div className="flex flex-col">
              <input
                ref={emailRef}
                type="email"
                onInput={(e) =>
                  e.target.value.length > 0 ? setBtn(true) : setBtn(false)
                }
                placeholder="Email"
                className="border-[1px] shadow-sm border-gray-200 rounded-sm text-[15px] p-3  w-[200px] md:w-[300px] outline-none font-medium "
              />
            </div>
            <button
              onClick={login}
              disabled={!btn}
              className={`${
                !btn ? "opacity-50" : "opacity-100"
              } ${"bg-[#017BF9] shadow-lg font-semibold text-white p-3 m-2 w-[150px] rounded-sm text-sm active:scale-[.96] md:active:scale-100 md:hover:scale-[1.03] ease-in-out outline-none duration-50 "}`}
            >
              Login
            </button>
            <span className="text-sm">
              <Link href="/register/signup">
                Don't have an account?
                <span className="text-[#017BF9] font-semibold"> Register</span>
              </Link>
            </span>

            <div className="flex gap-2">
              <button
                className="bg-[#] shadow-md text-[#616173] flex gap-2 justify-center items-center p-3 m-2  w-[135px] rounded-sm text-sm"
                onClick={() => signIn("google")}
              >
                <i class="bi bi-google text-[#017BF9]"></i>
                Google
              </button>
              <button className="bg-[#017BF9] shadow-xl text-white flex gap-2 justify-center items-center p-3 m-2  w-[135px] rounded-sm text-sm">
                <i class="bi bi-facebook"></i>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
