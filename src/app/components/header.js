"use client";
import { Kufam } from "next/font/google";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const kufam = Kufam({
  weight: "800",
  subsets: ["latin"],
});

export default function Header({ props }) {
  const [open, setOpen] = useState(false);

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
      // document.getElementById('hamPage').style.transform='scale(.9)';

      setTimeout(() => {
        document.getElementById("hamPage").style.display = "none";
      }, 100);
    }
  }, [open]);

  return (
    <header className="flex justify-between select-none">
      {/* //^Header */}

      {/* // this hidden for desktop */}
      {/* //? Hamburger */}
      <div className="relative w-8 cursor-pointer sm:hidden">
        <div
          className="text-3xl relative top-0 left-0 transition-all rotate-90  w-full h-[100%] z-[11] font-[400] burger-parent"
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
      <div>
        <h1 className={`${kufam.className} text-3xl`}>Zestora</h1>
      </div>

      {/* //? cart search */}
      <div>
        <div className="flex gap-4">
          <Link href="/dashboard/search">
            <span className="bi bi-search text-[22px]  cursor-pointer"></span>
          </Link>
          <Link href="/cart">
            <span className="bi bi-cart3 text-2xl cursor-pointer"></span>
          </Link>
        </div>
      </div>

      {/* //^Header */}
    </header>
  );
}
