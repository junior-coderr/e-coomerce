"use client";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  return (
    <div className="absolute w-[100%] h-[100svh] left-0 top-0 bg-white p-2 z-[10]">
      <span onClick={() => router.back()} className="cursor-pointer">
        Back
      </span>
      <h1>Product Page {params.id}</h1>
    </div>
  );
}
