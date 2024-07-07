import Edit_btn from "./profile_components/button/edit_btn";
import Option_btn from "./profile_components/option_btn";

import axios from "axios";
import { cookies } from "next/headers";

async function getname() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await axios.post(`${baseUrl}/api/verified/get_profile`, {
    token: cookies().get("token") ? cookies().get("token").value : "",
  });
  console.log("ddd", res.data.data.address);
  console.log("add");
  return res.data.data;
}

export default async function Profile() {
  const data = await getname();
  console.log(data);

  return (
    <>
      <div className="border-[1px] flex gap-1 flex-col rounded-md p-2">
        {/* //? options  */}
        <div className="flex justify-between items-center p-2 pb-1">
          <span className="text-xl font-extrabold">User details</span>
          {/* addign edit icon  */}
          <Edit_btn />
        </div>

        {/* //*email */}
        <div className="flex flex-col gap-[2px] p-2 pt-0">
          <div className="flex gap-2 items-center">
            <i className="bi bi-envelope-fill text-[#017BF9] text-xl"></i>
            <h3 className="">Email :</h3>
          </div>

          <div className="text-[16px] font-medium reak-words">{data.email}</div>
        </div>

        {/* //*phone */}
        <div className="flex flex-col gap-[2px] p-2">
          <div className="flex gap-2 items-center">
            <i className="bi bi-phone-fill text-[#017BF9] text-xl"></i>
            <h3 className="">Phone no :</h3>
          </div>
          <div className="text-[16px] font-medium">
            {data.address && data.address.length > 0
              ? data.address[data.address.length - 1].prefix +
                " " +
                data.address[data.address.length - 1].phone
              : "something here!!"}
          </div>
        </div>

        {/* address icon  */}
        {/* //*Address */}
        <div className="flex flex-col gap-[2px] p-2">
          <div className="flex gap-2 items-center">
            <i className="bi bi-geo-alt-fill text-[#017BF9] text-xl"></i>
            Address :
          </div>
          <div>
            {data.address ? (
              <div className="text-[16px] font-medium">
                {data.address
                  ? data.address[data.address.length - 1].street +
                    " , " +
                    data.address[data.address.length - 1].streetOptional +
                    " , " +
                    data.address[data.address.length - 1].city +
                    ", " +
                    data.address[data.address.length - 1].state +
                    ", " +
                    data.address[data.address.length - 1].country +
                    " - " +
                    data.address[data.address.length - 1].zip
                  : ""}
              </div>
            ) : (
              "something here!!"
            )}
          </div>
          <div className="text-[16px]">
            {/* {data.address != "" ? data.address : "something here!!"} */}
          </div>
        </div>
      </div>
      <Option_btn />
    </>
  );
}
