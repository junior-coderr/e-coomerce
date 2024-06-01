export default function Verify() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <i className="bi bi-envelope-fill text-[#017BF9] text-[18px] ml-auto shadow-lg cursor-pointer  w-0 h-0 p-5 flex justify-center items-center rounded-full "></i>
        <h1 className="text-[#017BF9] text-[18px] font-bold">
          Verify your email address
        </h1>
        <p className="text-[#017BF9] text-[18px] font-bold">
          We have sent a verification email to your email address
        </p>
        <p className="text-[#017BF9] text-[18px] font-bold">
          Please click the link in the email to verify your email address
        </p>
      </div>
    </div>
  );
}
