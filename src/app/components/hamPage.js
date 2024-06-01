import Link from "next/link";

export default function HamPage() {
  return (
    <div
      className="w-[100%] max-w-[1200px] mx-[-16px] m-auto h-[100svh] bg-[#1e1e1e] fixed top-0 z-[4] duration-200 blur-0 morpha  sm:hidden"
      id="hamPage"
      style={{ display: "none" }}
    >
      <br />
      <br />
      <div className="flex flex-col gap-4 pt-5 justify-start items-center h-[100%] mt-8">
        <div className="font-semibold text-2xl p-4 flex gap-4 hover:bg-[rgb(4,56,105,.1)] rounded-lg items-center justify-start w-[270px]">
          <i className="bi bi-binoculars-fill text-[40px] text-[#043869]"></i>
          <Link href="/dashboard/search" className="text-5xl">
            Search
          </Link>
        </div>
        <div className="font-semibold text-2xl  p-4 flex gap-3 items-center hover:bg-[rgb(4,56,105,.1)] justify-start w-[270px]">
          <i className="bi bi-heart-fill text-[40px] text-[#043869]"></i>
          <Link href="/wishlist" className="text-5xl">
            Wishlist
          </Link>
        </div>
        <div className="font-semibold text-2xl  p-4 flex gap-3 items-center hover:bg-[rgb(4,56,105,.1)] justify-start w-[270px]">
          <i className="bi bi-house-door-fill text-[40px] text-[#043869]"></i>
          <Link href="/dashboard" className="text-5xl">
            Home
          </Link>
        </div>
        <div className="font-semibold text-2xl  p-4 flex gap-3 items-center hover:bg-[rgb(4,56,105,.1)] justify-start w-[270px]">
          <i className="bi bi-telephone-fill text-[40px] text-[#043869]"></i>
          <Link href="/contact" className="text-5xl">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
