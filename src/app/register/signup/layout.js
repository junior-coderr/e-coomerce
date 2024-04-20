import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div className="h-full justify-center items-center">
      {/* a stylish design of a register page */}
      <div className="flex justify-center items-center h-full">
        <Image
          src="/register.jpg"
          className="hidden md:block"
          alt="s"
          width={500}
          height={500}
        />
        {children}
      </div>
    </div>
  );
}
