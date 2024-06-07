"use client";

import { useEffect, useRef, useState } from "react";
import { SocialSync, GoLiveButton } from "../../../public/svgs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { generateRandomColor } from "@/lib/utils";
import "../../lib/fonts.css"

const color = generateRandomColor()
import AWSHelper from "@/lib/awsHelper";
import useStore from "@/lib/zustand";

export default function Page() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const videoRef = useRef(null)  
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const {user} = useStore()

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileUrl(URL.createObjectURL(selectedFile))
    }
  };

  const url = process.env.NEXT_PUBLIC_API_URL;
  const uploadBox = {
    border: "2px solid #040629",
    borderRadius: "20px",
    boxShadow: "0 2px 16px 0 #FFFFFF",
  };

  const router = useRouter();

  const goLive = async () => {
    try {
      if (!title || !desc || !file) {
        toast("All fields needed!");
      } else {
        console.log("Going live...");
        console.log(user);
        const turl = await AWSHelper.uploadVideoDirect(file , user.userId);
        const d = new Date();
        let date = d.toISOString();
        let token = localStorage.getItem("token");
        let res = await axios.post(`${url}/api/stream`, {
          title: title,
          description: desc,
          startTimestamp: date,
          thumbnailUrl: turl,
        },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        console.log(res);
        if (res) {
          toast("Stream created successfully!");
          setTimeout(() => {
            router.push(`/stream/${res.data?.streamId}`)
          }, 3000)
        }
      }
    } catch (error) {
      console.error("Error occurred!!", error);
    }
  };
  
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    };

    startVideo();

    // Clean up the stream on component unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let stream = videoRef.current.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="bg-[#020317] w-screen h-screen flex flex-col md:flex-row">
      <div className="md:w-2/12 pl-5 pt-10 w-full">
        <SocialSync />
      </div>
      <div className="md:w-8/12 md:pl-14 md:pt-20 md:pr-12 w-full px-5 pt-10">
        <div
          style={uploadBox}
          className="w-full h-[55%] bg-[#040629] flex items-center justify-center overflow-clip "
        >
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <track kind="captions" />
          </video>
        </div>

        <div
          style={uploadBox}
          className=" cursor-pointer m-auto w-[50%] h-[40%] mt-5 bg-[#040629] flex items-center justify-center "
          onClick={handleDivClick}
        >
          {file ? (
            <img
              src={fileUrl}
              alt="Uploaded Thumbnail"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ color: "white" }}>Upload Thumbnail</span>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
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
            <div
              className="rounded-full w-fit pl-3 pr-3 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center hover:cursor-pointer"
              onClick={() => goLive()}
            >
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
        <div className=" rounded-full aspect-square px-4 shadow-lg flex justify-center items-center" style={{ backgroundColor: color }}>
          <h2 className=" text-xl font-semibold aspect-square text-center">{user ? user.firstName[0].toUpperCase() : "U"}</h2>
        </div>
        {/* <img src="" alt="pfp" className="rounded-full w-full h-full" /> */}
        <div className="ml-2">
          <div className="font-semibold text-xl text-white">{user ? user.firstName : "User"}</div>
          <div className="font-semibold text-base text-[#867D7D]">
            @{user ? user.username : "username"}
          </div>
        </div>
      </div>
    </div>
  );
}
