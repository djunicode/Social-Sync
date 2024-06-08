"use client";
import "../../lib/fonts.css"
import { useContext, useRef, useState } from "react";
import {
  SocialSync,
  UploadButtonSmall,
  UploadButton,
} from "../../../public/svgs";
import AWSHelper from "@/lib/awsHelper";
import useStore from "@/lib/zustand";
import { generateRandomColor } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { url } from "@/lib/api";
import { toast } from "sonner";
import axios from "axios";

const color = generateRandomColor()

export default function Page() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [fileUploading, setFileUploading] = useState(false)
  const [storageUrl, setStorageUrl] = useState("")
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const {user} = useStore()
  const router = useRouter()
  const uploadBox = {
    border: "2px solid #040629",
    borderRadius: "20px",
    boxShadow: "0 2px 16px 0 #FFFFFF",
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async(event) => {
    const selectedFile = event.target.files[0];
    if(!user)return
    if (selectedFile) {
      setFileUploading(true)
      const url = await AWSHelper.uploadVideoDirect(selectedFile, user.userId);
      console.log('Uploaded img URL: ', url);
      setFileUrl(url)
      setFileUploading(false)
    }
  };

  const handleUpload = async (file) => {
    if (file) {
      if(!user)return
      setFileUploading(true)
      const url = await AWSHelper.uploadVideoDirect(file, user.userId);
      console.log('Uploaded video URL: ', url);
      setStorageUrl(url)
      setFileUploading(false)
    } else {
      console.log('No file selected');
    }
  };
  
  async function goLive(){
    try {
      console.log({title, desc, storageUrl, fileUploading})
      if (!title || !desc || !storageUrl || !fileUrl || fileUploading) {
        toast("Title, Description, Thumbnail and Video needed!");
      } else {
        const d = new Date();
        let date = d.toISOString();
        let token = localStorage.getItem("token");
        let res = await axios.post(`${url}/api/stream`, {
          thumbnailUrl: fileUrl,
          storageUrl:storageUrl,
          title: title,
          description: desc,
          startTimestamp: date,
        },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        console.log(res);
        if (res) {
          toast("Stream created successfully!");
          router.push(`/stream/${res.data?.streamId}`)
        }
      }
    } catch (error) {
      console.error("Error occurred!!", error);
    }
  };

  return (
    <div className="bg-[#020317]  h-full  flex flex-col md:flex-row relative">
      {fileUploading?<div className=" flex w-full h-full bg-black bg-opacity-55 absolute top-0 right-0 justify-center items-center">
        <h3 className=" text-2xl font-bold text-slate-50 animate-ping">Uploading Video...</h3>
      </div>:<></>}
      <div className="md:w-2/12 pl-5 pt-10 w-full">
        <SocialSync />
      </div>
      <div className="md:w-8/12 md:pl-14 md:pt-20 md:pr-12 w-full px-5 pt-10">
        <div
          style={uploadBox}
          className="w-full h-[55%] bg-[#040629] flex items-center justify-center  overflow-clip"
        >
          {storageUrl!==""?
          <div className=" flex justify-center overflow-clip ">
            <video src={storageUrl} controls autoPlay className=" w-full h-full"/>
          </div>
          :
            <div>
            <div className="flex justify-center">
              <label htmlFor="file" className="hover:cursor-pointer">
                <UploadButton />
              </label>
            </div>
            <div className="mt-4 text-center">
              <label
                htmlFor="file"
                className="font-bold md:text-[28px] text-[20px] text-[#383958] underline underline-offset-8 decoration-[#383958] decoration-solid decoration-4 hover:cursor-pointer"
              >
                Select file to upload
              </label>
              <input type="file" onChange={(e)=>handleUpload(e.target.files[0])} name="" id="file" className="hidden" />
            </div>
          </div>}
        </div>
        <div
          style={uploadBox}
          className=" cursor-pointer overflow-clip m-auto w-[50%] h-[40%] mt-5 bg-[#040629] flex items-center justify-center  "
          onClick={handleDivClick}
        >
          
          {fileUrl ? (
            <img
              src={fileUrl}
              alt="Uploaded Thumbnail"
              className=" rounded-lg"
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
            <button type="button" onClick={()=>{goLive()}} className="transition-all active:scale-95 rounded-full w-fit pl-3 pr-3 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center hover:cursor-pointer">
              <span className="font-semibold lg:text-xl text-lg text-black ml-1">
                Finish upload
              </span>
              <span>
                <UploadButtonSmall />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-3/12 absolute right-0 h-32 pr-3 justify-end items-center">
      <div className=" rounded-full aspect-square px-4 shadow-lg flex justify-center items-center" style={{backgroundColor:color}}>
            <h2 className=" text-xl font-semibold aspect-square text-center">{user?user.firstName[0].toUpperCase():"U"}</h2>
          </div>
        <div className="ml-2">
          <div className="font-semibold text-xl text-white">{user?user.firstName:"User"}</div>
          <div className="font-semibold text-base text-[#867D7D]">
          @{user?user.username:"username"}
          </div>
        </div>
      </div>
    </div>
  );
}
