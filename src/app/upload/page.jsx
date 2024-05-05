"use client";

import { useState } from "react";
import {
  SocialSync,
  UploadButtonSmall,
  UploadButton,
} from "../../../public/svgs";

export default function Page() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const uploadBox = {
    border: "2px solid #040629",
    borderRadius: "20px",
    boxShadow: "0 2px 16px 0 #FFFFFF",
  };

  return (
    <div className="bg-[#020317] w-screen h-screen flex">
      <div className="w-2/12 pl-5 pt-10">
        <SocialSync />
      </div>
      <div className="w-8/12 pl-14 pt-20 pr-12">
        <div
          style={uploadBox}
          className="w-full h-[55%] bg-[#040629] flex items-center justify-center"
        >
          <div>
            <div className="flex justify-center">
              <label htmlFor="file" className="hover:cursor-pointer">
                <UploadButton />
              </label>
            </div>
            <div className="mt-4">
              <label
                htmlFor="file"
                className="font-bold text-[28px] text-[#383958] underline underline-offset-8 decoration-[#383958] decoration-solid decoration-4 hover:cursor-pointer"
              >
                Select file to upload
              </label>
              <input type="file" name="" id="file" className="hidden" />
            </div>
          </div>
        </div>
        <div className="pt-8">
          <div className="font-bold text-[28px] text-white flex">
            <label htmlFor="title">Give the stream a title:</label>
            <input
              type="text"
              id="title"
              className="rounded-lg pl-2 pr-2 outline-none ml-2 flex-grow text-2xl text-[#867D7D]"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="font-bold text-[28px] text-white mt-4">
            <label htmlFor="desc">
              Enter paragraph description for stream here:
            </label>
            <br />
            <textarea
              name=""
              id="desc"
              className="w-full resize-none rounded-lg h-28 outline-none pl-2 pr-2 pt-1 font-medium text-xl text-[#867D7D]"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
          </div>
          <div className="flex justify-center mt-4">
            <div className="rounded-full w-fit pl-3 pr-3 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center hover:cursor-pointer">
              <span className="font-semibold text-xl text-black ml-1">
                Finish upload
              </span>
              <span>
                <UploadButtonSmall />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/12 h-32 flex pr-8 justify-end items-center">
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
