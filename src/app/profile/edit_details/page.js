"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";

export default function Edit() {
  const [inp1, setInp1] = useState(false);
  const [inp2, setInp2] = useState(false);
  const [inp3, setInp3] = useState(false);
  const [data, setData] = useState({});
  async function getData() {
    const res = await fetch(`/api/verified/get_profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    return data;
  }
  useEffect(() => {
    getData().then((data) => {
      setData(data.data);
      console.log(data.data);
    });
  }, []);

  return (
    <div className="">
      <div className="border-[1px] flex gap-2 flex-col rounded-md p-2">
        {/* //? options  */}
        <div className="flex justify-between items-center p-2 pb-1">
          <span className="text-xl font-extrabold">Edit user details</span>
        </div>

        {/* //*email */}
        <div className="flex flex-col gap-[2px] p-2 pt-0">
          <div className="flex gap-2 items-center">
            <i className="bi bi-envelope-fill text-[#017BF9] text-xl"></i>
            <h3 className="text-[18px] font-medium">Email :</h3>
          </div>

          <div
            className="flex gap-2"
            onFocus={() => {
              setInp1(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setInp1(false);
              }, 1000);
            }}
          >
            <input
              className="text-[16px] bg-gray-100 p-2 rounded-md border-2 w-full"
              value={data.email ? data.email : "loading"}
            />
            <div>
              <Link
                href={"/profile/edit_details/edit_details_email"}
                className={inp1 ? "block" : "hidden"}
              >
                <i className="bi bi-pencil-fill text-[#017BF9] text-[18px] ml-auto shadow-lg cursor-pointer  w-0 h-0 p-5 flex justify-center items-center rounded-full "></i>
              </Link>
            </div>
          </div>
        </div>

        {/* //*phone */}
        <div className="flex flex-col gap-[2px] p-2">
          <div className="flex gap-2 items-center">
            <i className="bi bi-phone-fill text-[#017BF9] text-xl"></i>
            <h3 className="text-[18px] font-medium">Phone no :</h3>
          </div>

          <div
            className="flex gap-2"
            onFocus={() => setInp2(true)}
            onBlur={() => {
              setTimeout(() => {
                setInp2(false);
              }, 1000);
            }}
          >
            <input
              className="text-[16px] bg-gray-100 p-2 rounded-md border-2 w-full"
              value={data.phone ? data.phone : ""}
            />
            <div>
              <Link href={"/dashbaord"} className={inp2 ? "block" : "hidden"}>
                <i className="bi bi-pencil-fill text-[#017BF9] text-[18px] ml-auto shadow-lg cursor-pointer  w-0 h-0 p-5 flex justify-center items-center rounded-full "></i>
              </Link>
            </div>
          </div>
        </div>

        {/* address icon  */}
        {/* //*Address */}
        <div className="flex flex-col gap-[2px] p-2">
          <div className="flex gap-2 items-center">
            <i className="bi bi-geo-alt-fill text-[#017BF9] text-xl"></i>
            <h3 className="text-[18px] font-medium">Address :</h3>
          </div>
          <div
            className="flex gap-2"
            onFocus={() => setInp3(true)}
            onBlur={() => {
              setTimeout(() => {
                setInp3(false);
              }, 1000);
            }}
          >
            <input
              className="text-[16px] bg-gray-100 p-2 rounded-md border-2 w-full"
              // value={data.address ? data.address : ""}
            />
            <div>
              <Link href={"/dashbaord"} className={inp3 ? "block" : "hidden"}>
                <i className="bi bi-pencil-fill text-[#017BF9] text-[18px] ml-auto shadow-lg cursor-pointer  w-0 h-0 p-5 flex justify-center items-center rounded-full "></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
