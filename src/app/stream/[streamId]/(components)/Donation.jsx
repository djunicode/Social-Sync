"use client";
import { GiftBox } from "../../../../../public/svgs";

export default function Donation() {
  return (
    <div className="flex items-center mt-1 mb-2">
      <div className="w-10 h-10 flex justify-center items-center">
        <GiftBox />
      </div>
      <div className="ml-3.5 w-full font-semibold text-base text-[#F16602]">
        <span className="underline underline-offset-4 decoration-[#F16602] decoration-solid decoration-2 hover:cursor-pointer">
          @user123
        </span>
        <span> donated $20</span>
      </div>
    </div>
  );
}
