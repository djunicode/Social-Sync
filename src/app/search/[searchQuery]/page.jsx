"use client";

import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import SearchCard from "@/components/SearchCard";
import { SortIcon, FilterIcon } from "../../../../public/svgs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page({ params }) {
  const [render, setRender] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [streamData, setStreamData] = useState([]);

  const url = process.env.NEXT_PUBLIC_API_URL;

  const getResult = async () => {
    try {
      // const res = await axios.get(`${url}/api/stream/search/${searchValue}?title=${searchValue}`)
      const res = await axios.get(`${url}/api/stream/all`);
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
      <Sidebar />
      <div className="flex flex-col pt-12 items-center h-full w-full ml-[18rem] bg-[#020317]">
        <SearchBar query={searchValue} />
        <div className="flex justify-between items-center w-full p-8 pt-16">
          <div className="font-medium text-2xl">
            {streamData?.length || 0} Results found
          </div>
          <div className="flex justify-between">
            <div className="rounded-full w-36 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] text-[#020317] text-xl font-semibold flex justify-center items-center ml-4 hover:cursor-pointer">
              <span className="pr-2">Sort </span>
              <SortIcon />
            </div>
            <div className="rounded-full w-36 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] text-[#020317] text-xl font-semibold flex justify-center items-center ml-4 hover:cursor-pointer">
              <span className="pr-2">Filter</span>
              <FilterIcon />
            </div>
          </div>
        </div>
        {render && streamData && streamData.length !== 0 && (
          <div className="w-full pl-8 pr-8 grid grid-cols-2 gap-4">
            {streamData.map((stream) => (
              <div key={stream.streamId}>
                <SearchCard
                  title={stream.title}
                  views={stream._count.StreamView}
                  user={stream.creator.username}
                  date={stream.startTimestamp?.split("T")[0]}
                  userId={stream.userUserId}
                  streamId={stream.streamId}
                  thumbnail={stream.thumbnailUrl}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
