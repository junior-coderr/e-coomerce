"use client";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  return (
    <div>
      <span onClick={() => router.back()} className="cursor-pointer">
        Back
      </span>
      <h1>Product Page {params.id}</h1>
    </div>
  );
}
