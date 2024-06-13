"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function Logout({ params }) {
  const router = useRouter();
  console.log("params", params);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/verify_update_email/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        // TODO : Redirect to login page
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>{loading == true ? "Loading..." : "Redirecting"}</h1>
    </div>
  );
}
