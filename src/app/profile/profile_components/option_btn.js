"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

async function logOut() {
  signOut();
  const l = await fetch("/api/logout");
  const data = await l.json();
  console.log(data);
  if (data.status === 200) {
    window.location.href = "/register/login";
  }
  // signOut();
}

export default function Option_btn() {
  return (
    <>
      <br />
      <div className="border-[1px] flex gap-2 overflow-auto  font-medium flex-col rounded-md p-4">
        {/* adding other buttons lik order history, logout, etc */}
        <div className="flex  items-center gap-3 justify-center w-min">
          <button className="bg-[#005dba] w-max shrink-0 flex justify-center items-center gap-2 text-white p-2 px-5 rounded-[4px]">
            Order history
            <i className="bi bi-cart-fill text-[#f3f3f3] text-xl"></i>
          </button>
          <button className="bg-[#005dba] w-max shrink-0 flex justify-center items-center gap-2 text-white p-2 px-5 rounded-[4px]">
            Wishlist
            {/* adding icons  */}
            <i className="bi bi-heart-fill  text-[#f3f3f3] text-xl"></i>
          </button>
          <button className="bg-[#005dba] w-max shrink-0 flex justify-center items-center gap-2 text-white p-2 px-5 rounded-[4px]">
            Customer support
            <i className="bi bi-chat-left-text-fill text-[#f3f3f3] text-xl"></i>
          </button>
          <button className="bg-[#005dba] w-max shrink-0 flex justify-center items-center gap-2 text-white p-2 px-5 rounded-[4px]">
            Terms and conditions
            <i className="bi bi-file-earmark-text-fill text-[#f3f3f3] text-xl"></i>
          </button>
          <button
            className="bg-[#01366b] w-max shrink-0 flex justify-center items-center gap-2 text-white p-2 px-5 rounded-[4px]"
            onClick={logOut}
          >
            Logout{" "}
            <i className="bi bi-box-arrow-right text-[#f3f3f3] text-xl"></i>
          </button>
        </div>
      </div>
    </>
  );
}
