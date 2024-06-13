"use client";
import Header from "../components/hamPage.js";
import HamPage from "../components/header.js";
import Content from "../components/content.js";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [style, setStyle] = useState(
    "opacity-100 font-[600] text-[16px] border-r-[4px] border-r-[#0186D0] bg-[#EEF5FF]"
  );
  return (
    <>
      <HamPage />
      <Header />

      {/* //?Content Section */}

      <div className="flex h-[100%] gap-4">
        {/* //?for desktop */}
        <div className="gap-10 flex flex-col justify-center items-end max-w-fit select-none hidden sm:flex">
          <Link
            href="/dashboard"
            className={`${
              pathname == "/dashboard" ? style : "opacity-50"
            } ${"cursor-pointer hover:opacity-100 hover:font-semibold duration-75 rounded-sm hover:border-r-[3px] border-r-theme w-[85px] font-medium p-2"}`}
            id="home"
          >
            Home
          </Link>

          <Link
            href="/dashboard/order"
            className={`${
              pathname == "/dashboard/order" ? style : "opacity-50"
            } ${"cursor-pointer hover:opacity-100 hover:font-semibold duration-75 rounded-sm hover:border-r-[3px] border-r-theme w-[85px] font-medium p-2"}`}
            id="order"
          >
            Orders
          </Link>
          {/* <Link
            href="/dashboard"
            className={`${
              pathname == "/dashboard/about" ? style : "opacity-50"
            } ${"cursor-pointer hover:opacity-100 hover:font-semibold duration-75 rounded-sm hover:border-r-[3px] border-r-theme w-[85px] font-medium p-2"}`}
            id="about"
          >
            Profile
          </Link> */}
          <Link
            href="/contact"
            className={`${
              pathname == "/contact" ? style : "opacity-50"
            } ${"cursor-pointer hover:opacity-100 hover:font-semibold duration-75 rounded-sm hover:border-r-[3px] border-r-theme w-[85px] font-medium p-2"}`}
            id="contact"
          >
            Contact
          </Link>
        </div>
        <Content />
        {children}
      </div>
    </>
  );
}
