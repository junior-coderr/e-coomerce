import Link from "next/link";

export default function HamPage() {
  return (
    <div
      className="w-[100%] max-w-[1200px] mx-[-16px] m-auto h-[100svh] bg-[#1e1e1e] fixed top-0 z-[10] duration-200 blur-0 morpha  sm:hidden"
      id="hamPage" style={{display:'none'}}
    >
        <br />
        <br />
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-2xl hover:bg-[white] p-4">
            <Link href='/dashboard'>Home</Link>
          </div>
          <div className="font-semibold text-2xl hover:bg-[white] p-4">
          <Link href='/cart'>Cart</Link>
          </div>
          <div className="font-semibold text-2xl hover:bg-[white] p-4">
          <Link href='/contact'>Contact</Link>
          </div>
        </div>
    </div>
  );
}
