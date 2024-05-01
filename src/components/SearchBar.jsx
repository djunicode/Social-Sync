"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchHistory } from "../../public/svgs";

export default function SearchBar({ query }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSearchSuggestons = () => {
    const searchValue = document.getElementById("searchInput").value;
    if (searchValue && searchValue.trim() !== "") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSearch = async () => {
    const searchValue = document.getElementById("searchInput").value;
    if (searchValue && searchValue.trim() !== ""){
      const searchQuery = searchValue.split(" ").join("+");
      console.log(searchQuery)
      if(searchQuery){
        router.push(`/search/${searchQuery}`)
      }
    }
  }

  const searchHistory = [
    "Past search here Lorem, ispum. hi",
    "Past search here Lorem, ispum. hello",
    "Past search here Lorem, ispum. world",
    "Past search here Lorem, ispum. code",
    "Past search here Lorem, ispum. unicode",
    "Past search here Lorem, ispum. stream",
    "Past search here Lorem, ispum. video",
  ];

  return (
    <div className="w-[45%] relative">
      <div className="relative h-10 flex rounded-full z-20">
        <div className="w-10/12 h-full rounded-l-full">
          <input
            type="text"
            className="w-full rounded-l-full h-full pl-4 pr-15 text-black font-medium text-xl focus:outline-none"
            placeholder={query ? query : "What are you looking for?"}
            onChange={handleSearchSuggestons}
            onClick={() => setIsOpen(!isOpen)}
            id="searchInput"
          />
        </div>
        <div
          className="w-3/12 absolute right-0 h-full bg-gradient-to-r from-[#F16602] to-[#FF8E00] rounded-full flex justify-center items-center hover:cursor-pointer text-[#020317] font-semibold text-xl"
            onClick={handleSearch}
        >
          Search
        </div>
      </div>
      {isOpen && (
        <div className="bg-[#D9D9D9] absolute top-5 z-10 w-9/12 ml-1 text-[#867D7D] font-medium text-xl rounded-b-2xl">
          <div className="border-l-[3px] border-r-[3px] border-[#867D7D] border-opacity-55 w-full h-7"></div>
          <div className="max-h-64 overflow-y-hidden">
            {searchHistory.map((val) => {
              return (
                <div
                  key={val}
                  className="flex items-center w-full h-7 border-l-[3px] border-r-[3px] border-[#867D7D] border-opacity-55 pl-1 pr-1 hover:bg-[#FF8E00] hover:bg-opacity-40 hover:border-[#BB8E00] hover:cursor-pointer"
                  onClick={() => {
                    document.getElementById("searchInput").value = `${val}`;
                  }}
                >
                  <div className="mt-1">
                    <SearchHistory />
                  </div>
                  <span className="h-full overflow-y-hidden">{val}</span>
                </div>
              );
            })}
          </div>
          <div className="border-l-[3px] border-r-[3px] border-b-[3px] border-[#867D7D] rounded-b-2xl border-opacity-55 w-full h-5"></div>
        </div>
      )}
    </div>
  );
}
