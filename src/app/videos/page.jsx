  "use client";
import React from "react";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "@/components/Card";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { IoMdHome } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { RiMenuAddLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaCircleUser } from "react-icons/fa6";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const URL = "https://social-sync-u7ir.onrender.com/api/stream/all";

export default function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [data, setData] = useState([]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const response = await axios.get(URL);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }
    fetchData();
  },[])

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col pt-12 items-center h-full w-full ml-[18rem] bg-[#030421]">
          <SearchBar />
          <div>
            <button className="bg-[#1C1D2F] hover:bg-gray-800 border-1 border border-b-1 text-white mt-8 font-bold py-2 px-7 rounded-[30px] focus:outline-none focus:bg-[#F16602] focus:shadow-outline mx-2">
              All
            </button>
            <button className="bg-[#1C1D2F] hover:bg-gray-800 border-1 border border-b-1 text-white mt-8 font-bold py-2 px-7 rounded-[30px] focus:outline-none focus:bg-[#F16602] focus:shadow-outline mx-2">
              Sports
            </button>
            <button className="bg-[#1C1D2F] hover:bg-gray-800 border-1 border border-b-1 text-white mt-8 font-bold py-2 px-7 rounded-[30px] focus:outline-none focus:bg-[#F16602] focus:shadow-outline mx-2">
              Tag
            </button>
          </div>
          <div className="items-start flex-1">
            <h2 className="text-white text-xl mt-10 flex m-4">
              From your subscribed creators
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {data.map((item, idx) => (
              <div key={`video-${idx}`}>
                <div className="bg-gray-800 rounded-lg ">
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img
                      src={item.thumbnailUrl}
                      alt="Stream 1"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <h3 className="text-white text-lg ml-3 mt-2 mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center ml-3 mb-2">
                    <img
                      src=""
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <p className="text-white text-sm">@user123</p>
                  </div>
                  <div className="flex">
                    <p className="text-gray-400 pr-8 text-left ml-3 mb-3 text-sm">
                      {item._count.StreamView}
                    </p>
                    <p className="text-gray-400 pl-20 ml-3 mr-3 mb-3 text-sm">
                      dd/mm/yyyy
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="w-1/2 mx-auto my-5 border-0 h-px bg-slate-500" />
          <h2 className="text-white text-xl mb-4">
            Creators currently live from your subscriptions
          </h2>
          <div className="grid grid-cols-3 gap-10 mb-10">
            <div className="bg-gray-800 rounded-lg ">
              <div className="rounded-lg overflow-hidden mb-3">
                <img
                  src="data:image/png;base64,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"
                  alt="Stream 1"
                  className="w-full h-40 object-cover"
                />
              </div>
              <h3 className="text-white text-lg ml-3 mt-2 mb-1">
                Title of stream here
              </h3>
              <div className="flex items-center ml-3 mb-2">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <p className="text-white text-sm">@user123</p>
              </div>

              <p className="text-gray-400 ml-3 mb-3 text-sm">
                00,000 views · dd/mm/yyyy
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg">
              <div className="rounded-lg overflow-hidden mb-3">
                <img
                  src="data:image/png;base64,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"
                  alt="Stream 1"
                  className="w-full h-40 object-cover"
                />
              </div>
              <h3 className="text-white text-lg ml-3 mt-2 mb-1">
                Title of stream here
              </h3>
              <div className="flex items-center ml-3 mb-2">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <p className="text-white text-sm">@user123</p>
              </div>

              <p className="text-gray-400 ml-3 text-sm">
                00,000 views · dd/mm/yyyy
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
