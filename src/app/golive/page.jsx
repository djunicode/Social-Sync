"use client";

import { useState } from "react";
import { SocialSync, GoLiveButton } from "../../../public/svgs";

export default function Page() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const uploadBox = {
    border: "2px solid #040629",
    borderRadius: "20px",
    boxShadow: "0 2px 16px 0 #FFFFFF",
  };

  return (
    <div className="bg-[#020317] w-screen h-screen flex flex-col md:flex-row">
      <div className="md:w-2/12 pl-5 pt-10 w-full">
        <SocialSync />
      </div>
      <div className="md:w-8/12 md:pl-14 md:pt-20 md:pr-12 w-full px-5 pt-10">
        <div
          style={uploadBox}
          className="w-full h-[55%] bg-[#040629] flex items-center justify-center "
        >
          <span>Preview of camera</span>
        </div>
        <div className="pt-8">
          <div className="font-bold min-[1170px]:text-[28px] lg:text-[26px] md:text-[24px] text-[20px] text-white flex flex-col min-[1130px]:flex-row">
            <label htmlFor="title">Give the stream a title:</label>
            <input
              type="text"
              id="title"
              className="rounded-lg pl-2 pr-2 outline-none mt-2 md:mt-0 min-[1130px]:ml-2 flex-grow lg:text-2xl text-xl text-[#867D7D]"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="font-bold min-[1170px]:text-[28px] lg:text-[26px] md:text-[24px] text-[20px] text-white mt-4">
            <label htmlFor="desc">
              Enter paragraph description for stream here:
            </label>
            <br />
            <textarea
              name=""
              id="desc"
              className="w-full resize-none rounded-lg h-28 outline-none mt-2 lg:mt-0 pl-2 pr-2 pt-1 font-medium lg:text-xl text-lg text-[#867D7D]"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
          </div>
          <div className="flex justify-center mt-4">
            <div className="rounded-full w-fit pl-3 pr-3 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center hover:cursor-pointer">
              <span className="font-semibold lg:text-xl text-lg text-black ml-1">
                Go Live
              </span>
              <span>
                <GoLiveButton />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-3/12 absolute right-0 h-32 pr-3 justify-end items-center">
        <div className="w-16 h-16 rounded-full bg-[#D9D9D9] border border-[#D9D9D9]">
          <img src="" alt="pfp" className="rounded-full w-full h-full" />
        </div>
        <div className="ml-2">
          <div className="font-semibold text-xl text-white">Full Name</div>
          <div className="font-semibold text-base text-[#867D7D]">
            @username
          </div>
        </div>
      </div>
    </div>
  );
}
