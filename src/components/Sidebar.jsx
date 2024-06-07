"use client";
import React, { useEffect, useState, memo } from "react";
import { SocialSync } from "../../public/svgs";
import useStore from "@/lib/zustand";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { IoMdHome } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";
import { RiMenuAddLine } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { generateRandomColor } from "@/lib/utils";

const color = generateRandomColor()
const Sidebar = memo(() => {
  const [open, setOpen] = React.useState(0);
  const {user} = useStore();
  console.log(user)
  const [openAlert, setOpenAlert] = React.useState(true);
  const [subscriptions,setSubscriptions] = React.useState([])
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const url = process.env.NEXT_PUBLIC_API_URL;

  const getData = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(`${url}/api/subscriptions/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let subscriptionsData = [];
      if (res) {
        res?.data?.map(async (s) => {
          let res1 = await axios.get(`${url}/api/user/${s.creatorUserId}`);
          if(res1){
            let obj = {
              firstName: res1.data.firstName,
              lastName: res1.data.lastName,
              userId: res1.data.userId,
              username: res1.data.username
            }
            subscriptionsData.push(obj);
            console.log(res1);
          }
        })
        setSubscriptions(subscriptionsData);
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex">
      <Card className="h-screen fixed bg-[#1C1D2F] md:w-full max-w-[18rem] p-4 pt-6 shadow-xl shadow-blue-gray-900/5">
        <div className="flex justify-center text-3xl items-center mb-8 mt-5 text-[#FF8E00]">
          <a href="/home">
            <SocialSync />
          </a>
        </div>
        <div className="flex items-center ml-3 mb-5 mt-5 ">
          <div className=" rounded-full aspect-square px-4 shadow-lg flex justify-center items-center" style={{backgroundColor:color}}>
            <h2 className=" text-xl font-semibold aspect-square text-center">{user?user.firstName[0].toUpperCase():"U"}</h2>
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-bold text-white">{user?user.firstName:"User"}</h2>
            <p className="text-gray-400">@{user?user.username:"username"}</p>
          </div>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-3 border-b-0" selected={open === 1}>
              <ListItemPrefix>
                <IoMdHome className="h-7 w-7 mr-2" />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto focus:bg-[#F16602] font-normal"
              >
                <a href="/videos">Home</a>
              </Typography>
            </ListItem>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="border-b-0 p-3" selected={open === 2}>
              <ListItemPrefix>
                <IoCompassOutline className="h-7 w-7 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                <a href="/explore">Explore</a>
              </Typography>
            </ListItem>
          </Accordion>
          <Accordion
            open={open === 3}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 3 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <RiMenuAddLine className="h-7 w-7 mr-2" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Subscription
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 ml-5">
                {subscriptions && subscriptions.length > 0 && (
                  <>
                    {subscriptions.map((s) => {
                      return (
                        <a href={`/profile/${s.userId}`}>
                          <ListItem className="hover:cursor-pointer hover:text-gray-200">
                            <ListItemPrefix>
                              <FaCircleUser
                                strokeWidth={4}
                                className="h-5 w-5 mr-2"
                              />
                            </ListItemPrefix>
                            {s.username}
                          </ListItem>
                        </a>
                      );
                    })}
                  </>
                )}
              </List>
            </AccordionBody>
          </Accordion>
        </List>
      </Card>
    </div>
  );
});

export default Sidebar;
