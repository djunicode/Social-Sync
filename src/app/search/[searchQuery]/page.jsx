"use client";

import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import SearchCard from "@/components/SearchCard";
import {
  SortIcon,
  FilterIcon,
  MenuIcon,
  CrossIcon,
} from "../../../../public/svgs";
import "../../../lib/fonts.css"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page({ params }) {
  const [render, setRender] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [streamData, setStreamData] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const url = process.env.NEXT_PUBLIC_API_URL;

  const getResult = async () => {
    try {
      let searchV = await params.searchQuery.split("%2B").join(" ");
      const res = await axios.get(`${url}/api/stream/search/${searchV}?title=${searchV}`);
      // const res = await axios.get(`${url}/api/stream/all`);
      console.log(res.data);
      setStreamData(res.data);
      setRender(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setSearchValue(params.searchQuery.split("%2B").join(" "));
    getResult();
  }, []);

  return (
    <div className="flex">
      <div
        className={`${
          isSideBarOpen
            ? "max-md:translate-x-0 max-md:z-20"
            : "max-md:-translate-x-[18rem]"
        } max-md:transform transition-transform ease-in-out duration-500`}
      >
        <Sidebar />
      </div>
      <div className="flex flex-col pt-12 items-center h-full w-full md:ml-[18rem] bg-[#020317] z-10">
        <SearchBar query={searchValue} />
        <div
          className={`absolute right-0 mr-5 w-6 h-10 max-md:flex items-center hidden`}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        >
          {isSideBarOpen ? <CrossIcon /> : <MenuIcon />}
        </div>
        <div className="flex justify-between items-center w-full xs:p-8 p-4 xs:pt-16 pt-12">
          <div className="font-medium sm:text-2xl text-lg">
            {streamData?.length || 0} Results found
          </div>
          <div className="flex justify-between">
            <div className="rounded-full sm:w-36 w-24 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] text-[#020317] sm:text-xl text-lg font-semibold flex justify-center items-center ml-4 hover:cursor-pointer">
              <span className="pr-2">Sort </span>
              <SortIcon />
            </div>
            <div className="rounded-full sm:w-36 w-24 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] text-[#020317] sm:text-xl text-lg font-semibold flex justify-center items-center ml-4 hover:cursor-pointer">
              <span className="pr-2">Filter</span>
              <FilterIcon />
            </div>
          </div>
        </div>
        {render && streamData && streamData.length !== 0 && (
          <div className="w-full pl-8 pr-8 grid lg:grid-cols-2 gap-4">
            {streamData.map((stream) => (
              <div
                key={stream.streamId}
                className="mx-auto max-w-[478px] xl:max-w-[640px] w-full"
              >
                <SearchCard
                  title={stream.title}
                  views={stream.StreamView.length}
                  username={stream.creator.username}
                  date={stream.startTimestamp?.split("T")[0]}
                  userId={stream.userUserId}
                  streamId={stream.streamId}
                  thumbnail={stream.thumbnailUrl}
                  firstName={stream.creator.firstName}
                  live={stream.endTimestamp === null? true : false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
