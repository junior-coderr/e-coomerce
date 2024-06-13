"use client";
import { Kufam } from "next/font/google";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { set } from "mongoose";

const kufam = Kufam({
  weight: "800",
  subsets: ["latin"],
});

export default function Header({ props }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);

  useEffect(() => {
    if (open) {
      document.getElementById("a2").style.rotate = "405deg";
      document.getElementById("a3").style.rotate = "-410deg";
      document.getElementById("a2").style.left = "5px";
      document.getElementById("a3").style.left = "2px";

      // document.querySelector('.burger-parent').style.color='white'
      document.querySelector(".burger-parent").style.fontWeight = "500";

      document.getElementById("hamPage").style.display = "block";
      // document.getElementById('hamPage').style.transform='scale(1)';
      document.getElementById("hamPage").style.backdropFilter = "blur(15px)";
    } else {
      document.getElementById("a2").style.rotate = "0deg";
      document.getElementById("a3").style.rotate = "0deg";
      document.getElementById("a2").style.left = "0px";
      document.getElementById("a3").style.left = "10px";
      document.querySelector(".burger-parent").style.color = "black";
      document.querySelector(".burger-parent").style.fontWeight = "400";

      document.getElementById("hamPage").style.backdropFilter = "blur(0px)";

      setTimeout(() => {
        document.getElementById("hamPage").style.display = "none";
      }, 100);
    }
  }, [open]);

  return (
    <header className="flex justify-between select-none p-2">
      {/* //^Header */}

      {/* // this hidden for desktop */}
      {/* //? Hamburger */}
      <div className="relative w-8 cursor-pointer sm:hidden">
        <div
          className="text-3xl relative top-0 left-0 transition-all rotate-90  w-full h-[100%] z-[5] font-[400] burger-parent"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <span
            id="a2"
            className="absolute origin-center left-0  duration-200 ease-in-out"
          >
            |
          </span>
          <span
            id="a3"
            className="absolute origin-center left-[10px] duration-200 ease-in-out"
          >
            |
          </span>
        </div>
      </div>

      {/* //? Title */}
      <div className="flex justify-center items-center">
        <Link className={`${""} font-[700]  text-3xl`} href={"/dashboard"}>
          Uniika
        </Link>
      </div>

      {/* //? cart search */}
      <div>
        <div className="flex gap-4 md:gap-5 items-center">
          <Link href="/dashboard/search" className="hidden">
            <span className="bi bi-search text-[19px] md:text-[22px]  cursor-pointer"></span>
          </Link>
          <div className="relative hidden sm:flex  border-[1.3px] border-[#8B8BA3] justify-center items-center p-[6px] rounded-md px-4">
            <span className="bi bi-search text-xl"></span>
            <input
              onFocus={() => setInput(true)}
              onBlur={() => setInput(false)}
              type="text"
              // blue color
              className="] placeholder:text-[#8B8BA3]  px-3  outline-none w-[150px] md:w-[250px]  text-[#000000] text-[14px] font-medium"
              placeholder="Search Unique"
            />

            {/* suggestions */}
            <div
              className={`${
                input ? "flex" : "hidden"
              } ${"absolute rounded-md z-10 p-2 m-2 w-full h-[150px] md:h-[200px] bg-white border-[1.2px] top-[100%]"}`}
            ></div>
          </div>
          <Link href="/cart">
            <span className="bi bi-cart3 text-xl md:text-2xl cursor-pointer"></span>
          </Link>
          {/* adding profile icon
           */}
          <Link href="/profile">
            <span className="bi bi-person text-[24px] md:text-[27px] cursor-pointer"></span>
          </Link>
        </div>
      </div>

      {/* //^Header */}
    </header>
  );
}
