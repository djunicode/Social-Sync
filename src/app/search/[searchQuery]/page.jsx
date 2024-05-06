"use client";

import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import SearchCard from "@/components/SearchCard";
import { SortIcon, FilterIcon } from "../../../../public/svgs";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(params.searchQuery.split("%2B").join(" "));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col pt-12 items-center h-full w-full ml-[18rem] bg-[#020317]">
        <SearchBar query={searchValue} />
        <div className="flex justify-between items-center w-full p-8 pt-16">
          <div className="font-medium text-2xl">00,000 Results found</div>
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
        <div className="w-full pl-8 pr-8 grid grid-cols-2 gap-4">
          <SearchCard
            title="Title of stream here"
            views="00,000"
            user="user123"
            date="dd/mm/yyyy"
          />
          <SearchCard
            title="Title of stream here"
            views="00,000"
            user="user123"
            date="dd/mm/yyyy"
          />
          <SearchCard
            title="Title of stream here"
            views="00,000"
            user="user123"
            live="true"
          />
          <SearchCard
            title="Title of stream here"
            views="00,000"
            user="user123"
            date="dd/mm/yyyy"
          />
          <SearchCard
            title="Title of stream here"
            views="00,000"
            user="user123"
            date="dd/mm/yyyy"
          />
          <SearchCard
            title="Title of stream here"
            views="00,000"
            user="user123"
            date="dd/mm/yyyy"
          />
          <SearchCard
            title="Title of stream here"
            views="00,000"
            user="user123"
            date="dd/mm/yyyy"
          />
          <SearchCard
            title="Title of stream here"
            views="00,000"
            user="user123"
            date="dd/mm/yyyy"
          />
        </div>
      </div>
    </div>
  );
}
