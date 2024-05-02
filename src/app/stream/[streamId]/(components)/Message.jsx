"use client";
import { Report } from "../../../../../public/svgs";

export default function Message({ message }) {
  function getTimeFromDate(data){
    const date = new Date(data)
    return date.toLocaleTimeString({hourCycle:"h24"}).slice(0,5)
  }
  return (
    <div className="flex mt-1 mb-1">
      <div>
        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-600">
          pfp
        </div>
      </div>
      <div className="ml-2.5 w-full">
        <div className="font-semibold text-base text-[#867D7D] flex justify-between">
          <div className="underline underline-offset-4 decoration-[#867D7D] decoration-solid decoration-2 hover:cursor-pointer">
            {message.user.username}
          </div>
          <div>{getTimeFromDate(message.createdAt)}</div>
        </div>
        <div>
          <span className="font-medium text-xl">
            {message.content}
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
}
