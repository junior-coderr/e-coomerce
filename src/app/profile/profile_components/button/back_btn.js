"use client";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  return (
    <div>
      <div
        className=" flex w-fit px-2 p-1 text-[12px]  shadow-lg rounded-full bg-[white] justify-center items-center cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <i className="bi bi-arrow-left text-2xl  font-bold"></i>
      </div>
    </div>
  );
}
