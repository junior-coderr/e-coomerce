"use client";
import { useRouter } from "next/navigation";

export default function Back({ dest }) {
  const router = useRouter();

  return (
    <div className="absolute z-10">
      <div
        className=" flex w-fit relative px-2 p-1 text-[12px] transition-all  shadow-lg rounded-full hover:bg-[white] bg-[#F2F2F2] justify-center items-center cursor-pointer"
        onClick={() => {
          if (dest == "series") {
            router.back();
          } else {
            router.push("/dashboard");
          }
        }}
      >
        <i className="bi bi-arrow-left text-2xl  font-bold"></i>
      </div>
    </div>
  );
}
