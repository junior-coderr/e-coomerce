"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Verify() {
  const otpInputRef = useRef(null);
  const router = useRouter();
  const [condition, setCondition] = useState(true);

  function checkOtp() {
    if (otpInputRef.current.value.length < 6) {
      toast.error("Invalid OTP");
      return;
    }

    setCondition(true);

    toast.dismiss();
    toast.loading("Checking...");

    const otp = otpInputRef.current.value;
    const userData = { otp };

    fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.remove();
        if (data.success) {
          toast.success(data.message);
          window.location.href = "/dashboard";
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    setCondition(false);
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div>
        <h1 className="text-3xl font-semibold">Enter OTP</h1>
        <br />
      </div>
      <div className="flex flex-col gap-2">
        <input
          ref={otpInputRef}
          onInput={(e) => {
            if (e.target.value.length > 5) {
              setCondition(false);
            } else {
              setCondition(true);
            }
          }}
          type="number"
          placeholder="Enter OTP"
          className="border-[1px] shadow-sm border-gray-200 rounded-sm text-[15px] p-3  w-[200px]  md:w-[300px] outline-none font-medium "
        />
      </div>
      <button
        className={`${
          condition ? "opacity-50" : "opacity-100"
        } ${"bg-[#017BF9] shadow-lg text-white p-3 m-2 w-[150px] rounded-sm text-sm font-semibold active:scale-[.96] md:active:scale-100 md:hover:scale-[1.03] ease-in-out outline-none duration-50 "}`}
        onClick={checkOtp}
        disabled={condition}
      >
        Verify
      </button>

      <span className="text-sm">
        <Link href="/register/resend">
          Resend OTP
          <span
            className={`
            ${"text-[#017BF9] font-semibold"}`}
          >
            {" "}
            Resend
          </span>
        </Link>
      </span>
    </div>
  );
}
