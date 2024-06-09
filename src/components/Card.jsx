"use client";
import React from "react";
import { generateRandomColor } from "@/lib/utils";
import Link from "next/link";

const Cards = ({
  thumbnail,
  title,
  username,
  views,
  date,
  streamId,
  userId,
  live,
}) => {
  const color = generateRandomColor();
  return (
    <div className="m-2">
      <div className="bg-gray-800 rounded-2xl border border-[#FFFFFF] border-opacity-25 overflow-clip ">
        <Link
          href={`/stream/${streamId}`}
          className="rounded-2xl overflow-hidden mb-3"
        >
          <img
            src={
              thumbnail ||
              "data:image/png;base64,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"
            }
            alt="Thumbnail"
            className="w-full h-40 object-cover rounded-2xl"
          />
        </Link>
        <h3 className="text-white text-xl font-medium ml-3 mt-2 mb-1">
          {title || "Title of stream here"}
        </h3>
        <div className="flex items-center ml-3 mb-2">
          <div
            className=" rounded-full aspect-square w-8 h-8 mr-2 shadow-lg flex justify-center items-center"
            style={{ backgroundColor: color }}
          >
            <h2 className="text-lg font-semibold aspect-square text-center">
              {username ? username[0].toUpperCase() : "U"}
            </h2>
          </div>
          <Link
            href={`/profile/${userId}`}
            className="text-gray-400 text-lg font-medium underline underline-offset-[3px]"
          >
            @{username || "@user123"}
          </Link>
        </div>

        <p className="text-gray-400 ml-3 pb-2 text-base font-semibold mr-3 flex justify-between">
          <span>{views || "00,000"} views</span>
          <span>
            {live ? <div className="text-base text-medium text-white"><span className="text-[#D20713]">· </span> Live</div> : <>{date?.split("T")[0] || "dd/mm/yyyy"}</>}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Cards;
