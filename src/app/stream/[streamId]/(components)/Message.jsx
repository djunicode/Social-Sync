"use client";
import { memo } from "react";
import { Report } from "../../../../../public/svgs";
import { generateRandomColor, timeAgo } from "@/lib/utils";

const Message = memo(({ message, censorhsip }) => {
  const color = generateRandomColor();
  const tolerance = 1-censorhsip+0.1;
  function getTimeFromDate(data){
    const date = new Date(data)
    return date.toLocaleTimeString({hourCycle:"h24"}).slice(0,5)
  }
  return (
    <div className="flex mt-1 mb-1">
      <div>
      <div
        className=" rounded-full aspect-square w-10 h-10 shadow-lg flex justify-center items-center"
        style={{ backgroundColor: color }}
      >
        <h2 className="text-2xl font-semibold aspect-square text-center">
          {message.user? message.user.username[0].toUpperCase() : "U"}
        </h2>
      </div>
      </div>
      <div className="ml-2.5 w-full">
        <div className="font-semibold text-base text-[#867D7D] flex justify-between">
          <div className="underline underline-offset-4 decoration-[#867D7D] decoration-solid decoration-2 hover:cursor-pointer">
            {message.user.username}
          </div>
          <div>{timeAgo((new Date(message.createdAt)).getTime())}</div>
        </div>
        <div>
          <span className="font-medium text-xl">
            {tolerance>=message.toxicity?message.content:"******"}
          </span>
        </div>
        <div className="flex justify-end items-center">
          {/* <span className="font-semibold text-base text-[#867D7D] underline underline-offset-4 decoration-[#867D7D] decoration-solid decoration-2 hover:cursor-pointer">
            Reply
          </span> */}
          <span className="ml-2 hover:cursor-pointer">
            <Report />
          </span>
        </div>
      </div>
    </div>
  );
})

Message.displayName="Message"
export default Message
