"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Search() {
  let [search, setSearch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (search) {
      document.querySelector(".search-border").style.borderColor = "#6c6c6c";
    } else {
      document.querySelector(".search-border").style.borderColor = "black";
    }
  }, [search]);

  return (
    <>
      {/* //^Back BTN */}

      {/* //^Search Section */}
      <div className="pt-2  pb-2 search-border duration-200 absolute w-[100%] h-[100svh] top-0 bg-white z-[5] mx-[-16px]">
        {/* first section */}
        <div className="flex justify-center ">
          {/* going back icon */}
          <div
            className=" flex w-fit px-1 rounded-md bg-[white] justify-center items-center cursor-pointer"
            onClick={() => router.back()}
          >
            <i className="bi bi-arrow-left text-2xl  font-bold"></i>
          </div>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search and buy"
            className="w-[93%] p-2 rounded-md bg-[#FAFAFA] outline-none text-[#000000b1] text-[16px] font-semibold"
            onFocus={() => setSearch(!search)}
            onBlur={() => setSearch(!search)}
          />

          {/* Search icon */}
          <div className=" flex w-fit px-2 rounded-md justify-center items-center bg-[white] cursor-pointer">
            <i class="bi bi-search font-bold  text-[18px]"></i>
          </div>
        </div>

        {/* second section  */}
        <div>
          <div className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 gap-y-2 md:gap-3 lg:gap-5 rounded-lg">
              <div className="bg-[#FAFAFA] p-5 rounded-lg h-[200px]">
                <h1 className="text-xl font-semibold">Product 1</h1>
                <p className="text-md">Description</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
