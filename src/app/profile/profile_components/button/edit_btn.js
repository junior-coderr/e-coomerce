"use client";
import Link from "next/link";

export default function Edit_btn() {
  return (
    <Link href={"/profile/edit_details"}>
      <i className="bi bi-pencil-fill text-[#017BF9] text-[18px] ml-auto shadow-lg cursor-pointer  w-0 h-0 p-5 flex justify-center items-center rounded-full "></i>
    </Link>
  );
}
