"use client";
import Link from "next/link";
import { addInput_data } from "../../../../redux/slices/input_data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditEmail() {
  const dispatch = useDispatch();
  let email = useSelector((state) => state.input_data.input_data);
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function Send_mail(email, router) {
    try {
      setLoading(true);
      const d = await fetch("/api/update_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      var data = await d.json();
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
    if (data) {
      setLoading(false);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
    } else {
      setLoading(false);
      toast.error("Something went wrong!");
      return;
    }

    router.push("/profile/edit_details/edit_details_email/verify_email");
    console.log(data);
  }

  useEffect(() => {
    email = "";
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center mt-10">
      <div className="flex gap-2">
        <i className="bi bi-envelope-fill text-[#017BF9] text-xl"></i>
        <h3 className="text-[18px] font-medium">Email :</h3>
      </div>

      <div className="">
        <input
          className="text-[16px] bg-gray-100 p-2 rounded-md border-2 w-[250px] outline-[#017BF9]"
          placeholder={"Enter your new email"}
          onInput={(e) => {
            dispatch(addInput_data(e.target.value));
          }}
        />
      </div>
      <div>
        {/* adding button  */}
        <button
          className={
            loading
              ? "bg-[#017BF9] text-white p-2 px-5 rounded-[4px] opacity-50"
              : "bg-[#017BF9] text-white p-2 px-5 rounded-[4px]"
          }
          style={email.length > 0 ? {} : { opacity: 0.5 }}
          onClick={() => {
            if (email.match(email_regex)) {
              if (session) {
                if (session.user.email == email) {
                  toast.error("Email is already registered");
                  return;
                }
              }
              loading;
              Send_mail(email, router);
            } else {
              toast.error("Invalid email");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
