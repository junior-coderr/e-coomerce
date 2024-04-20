"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Order() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    document.getElementById("content-scroll").style.display = "none";

    return () => {
      if (document.getElementById("content-scroll")) {
        document.getElementById("content-scroll").style.display = "block";
      }
    };
  }, []);
  return (
    <>
      <div className="text-4xl font-bold">Order Page!!</div>
    </>
  );
}
