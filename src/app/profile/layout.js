import AddBtn from "./profile_components/button/add_btn";
import Back from "./profile_components/button/back_btn";
import Image from "next/image";
import axios from "axios";
import { cookies } from "next/headers";

async function getname() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.post(`${baseUrl}/api/verified/get_profile`, {
    token: cookies().get("token") ? cookies().get("token").value : "",
  });

  console.log("res", res.data);
  return res.data.data.name;
}
export default async function Layout({ children }) {
  await getname();
  return (
    <>
      <Back />
      <div className="flex flex-col gap-6">
        {/* //^Section 1 */}
        <div className="w-[100%] flex flex-col gap-2 justify-center items-center">
          <div className="relative">
            <Image
              src={"/profile.jpg"}
              width={100}
              height={100}
              className="rounded-full shadow-xl h-[180px] w-[180px] object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-center box-border p-0 text-[#333333]">
              {await getname()}
            </h1>
          </div>
        </div>

        {/* //^Section 2 */}
        <div className="w-full max-w-[800px] m-auto relative flex flex-col justify-start">
          {children}
        </div>
      </div>
    </>
  );
}
