"use client";
import Link from "next/link";
import { generateRandomColor } from "@/lib/utils";

const color = generateRandomColor();
const SearchCard = ({
  title,
  views,
  username,
  date,
  live,
  userId,
  streamId,
  thumbnail,
  firstName,
}) => {
  return (
    <div className="flex items-center w-full h-40 rounded-3xl relative border-2 border-white border-opacity-20 bg-[#2E2F3F] bg-opacity-60">
      <Link
        href={`/stream/${streamId}`}
        className="w-6/12 h-full rounded-3xl bg-[#867D7D] hover:cursor-pointer"
      >
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full border-none rounded-3xl"
        />
      </Link>
      <div className="pl-1.5">
        <div className="font-medium xs:text-xl text-lg text-white">{title}</div>
        <div className="font-semibold xs:text-base text-sm text-[#867D7D]">
          {views} views
        </div>
        <div className="flex items-center">
          <div
            className=" rounded-full aspect-square w-8 h-8 shadow-lg flex justify-center items-center"
            style={{ backgroundColor: color }}
          >
            <h2 className="text-xl font-semibold aspect-square text-center">
              {firstName ? firstName[0].toUpperCase() : "U"}
            </h2>
          </div>
          <Link
            href={`/profile/${userId}`}
            className="font-semibold xs:text-xl text-lg text-[#867D7D] pl-2 underline underline-offset-4 decoration-[#867D7D] decoration-solid decoration-2 hover:cursor-pointer"
          >
            @{username}
          </Link>
        </div>
        <div className="font-semibold xs:text-base text-sm text-[#867D7D]">
          {live === true ? (
            <div className="flex items-center">
              <div className="border-4 rounded-full border-[#D20713]"></div>
              <span className="pl-1">Currently live</span>
            </div>
          ) : (
            <span>Streamed on {date}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
