"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [btn, setBtn] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const [condition, setCondition] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    if (btn && btn2) {
      setCondition(true);
    } else {
      setCondition(false);
    }
  }, [btn, btn2]);

  async function register() {
    toast.dismiss();
    if (!condition) return;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    console.log(name, email);
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      email
    );
    if (!isValidEmail) {
      toast.error("Invalid email address");
      return;
    }
    try {
      toast.loading("Sending...");
      const result = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const response = await result.json();
      toast.remove();
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        router.push("/register/signup/verify");
      } else {
        toast.error("User already exists");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      {/* register page */}

      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold">
            {/* Register & Shop Heartily! */}
            Register
          </h1>
          <br />
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={nameRef}
            type="text"
            placeholder="Full name"
            className="border-[1px] shadow-sm border-gray-200 rounded-sm text-[15px] p-3  w-[200px]  md:w-[300px] outline-none font-medium "
            onInput={(e) =>
              e.target.value.length > 0 ? setBtn(true) : setBtn(false)
            }
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="border-[1px] shadow-sm border-gray-200 rounded-sm text-[15px] p-3  w-[200px] md:w-[300px] outline-none font-medium "
            onInput={(e) =>
              e.target.value.length > 0 ? setBtn2(true) : setBtn2(false)
            }
          />
        </div>
        <button
          onClick={register}
          disabled={!condition}
          className={`${
            !condition ? "opacity-50" : "opacity-100"
          } ${"bg-[#017BF9] shadow-lg text-white p-3 m-2 w-[150px] rounded-sm text-sm font-semibold active:scale-[.96] md:active:scale-100 md:hover:scale-[1.03] ease-in-out outline-none duration-50 "}`}
        >
          Register
        </button>
        <span className="text-sm">
          <Link href="/register/login">
            Already have an account?
            <span className="text-[#017BF9] font-semibold"> Login</span>
          </Link>
        </span>

        <div className="flex gap-2">
          <button className="bg-[#] shadow-md text-[#616173] flex gap-2 justify-center items-center p-3 m-2  w-[135px] rounded-sm text-sm">
            <i class="bi bi-google text-[#017BF9]"></i>
            Google
          </button>
          <button className="bg-[#017BF9] shadow-xl text-white flex gap-2 justify-center items-center p-3 m-2  w-[135px] rounded-sm text-sm">
            <i class="bi bi-facebook"></i>
            Facebook
          </button>
        </div>
      </div>

      {/* otp page  */}
    </>
  );
}
