"use client";
import { generateRandomColor } from "@/lib/utils";
import Link from "next/link";

export default function  Creator({ firstName, lastName, username, userId }) {
  const color = generateRandomColor();
  return (
    <Link href={`/profile/${userId}`} className="flex flex-col items-center mt-4 md:w-fit ml-4 mr-4">
      <div
        className=" rounded-full aspect-square w-36 h-36 shadow-lg flex justify-center items-center"
        style={{ backgroundColor: color }}
      >
        <h2 className="text-5xl font-semibold aspect-square text-center">
          {username ? username[0].toUpperCase() : "U"}
        </h2>
      </div>
      <div className="font-bold text-xl text-white">{`${firstName} ${lastName}`}</div>
      <div
        
        className="underline underline-offset-4 decoration-[#867D7D] decoration-solid decoration-2 text-[#867D7D] text-base font-bold hover:cursor-pointer"
      >
        @{username}
      </div>
    </Link>
  );
}
