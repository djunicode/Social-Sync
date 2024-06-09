"use client";
import React, { useEffect, useState, memo } from "react";
import {
  SocialSync,
  HomeIcon,
  HomeIconSelected,
  ExploreIcon,
  ExploreIconSelected,
  SubscriptionIcon,
} from "../../public/svgs";
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
import { FaCircleUser } from "react-icons/fa6";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { generateRandomColor } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";

const color = generateRandomColor();
const Sidebar = memo(() => {
  const [open, setOpen] = React.useState(0);
  const { user } = useStore();
  console.log(user);
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const url = process.env.NEXT_PUBLIC_API_URL;

  const getData = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(`${url}/api/subscriptions/myStreams`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res && res.data) {
        const subscriptionsData = await Promise.all(
          res.data.map(async (s) => {
            const res1 = await axios.get(`${url}/api/user/${s.creatorUserId}`);
            if (res1 && res1.data) {
              return {
                firstName: res1.data.firstName,
                lastName: res1.data.lastName,
                userId: res1.data.userId,
                username: res1.data.username,
              };
            }
            return null;
          })
        );
        setSubscriptions(subscriptionsData.filter(Boolean));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
    setLocation(window?.location?.pathname);
  }, []);

  return (
    <div className="flex">
      <Card className="h-screen fixed bg-[#1C1D2F] rounded-none md:w-full max-w-[18rem] p-4 pt-6 shadow-xl shadow-blue-gray-900/5 border-r-2 rounded-r-3xl border-[#FFFFFF] border-opacity-30">
        <div className="flex justify-center text-3xl items-center mb-8 mt-5 text-[#FF8E00]">
          <Link href="/">
            <SocialSync />
          </Link>
        </div>
        <Link
          href={`/profile/${user?.userId}`}
          className="flex items-center ml-3 mb-5 mt-10"
        >
          <div
            className=" rounded-full aspect-square px-4 shadow-lg flex justify-center items-center"
            style={{ backgroundColor: color }}
          >
            <h2 className=" text-xl font-semibold aspect-square text-center">
              {user ? user.firstName[0].toUpperCase() : "U"}
            </h2>
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-bold text-white">
              {user ? user.firstName : "User"} {user ? user.lastName : "123"}
            </h2>
            <div className="text-gray-400 hover:text-gray-300 underline underline-offset-[4px]">
              @{user ? user.username : "username"}
            </div>
          </div>
        </Link>
        <List className="mt-10">
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
            <ListItem
              className={`p-3 border-b-0 ${
                location === "/videos" ? "text-[#FF8E00]" : ""
              }`}
              selected={open === 1}
            >
              <ListItemPrefix>
                {location === "/videos" ? (
                  <HomeIconSelected />
                ) : (
                  <HomeIcon />
                )}
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto focus:bg-[#F16602] font-semibold text-xl"
              >
                <Link href="/videos">Home</Link>
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
            <ListItem
              className={`border-b-0 p-3 ${
                location === "/explore" ? "text-[#FF8E00]" : ""
              }`}
              selected={open === 2}
            >
              <ListItemPrefix>
                {location === "/explore" ? (
                  <ExploreIconSelected />
                ) : (
                  <ExploreIcon />
                )}
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-semibold text-xl"
              >
                <Link href="/explore">Explore</Link>
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
                  <SubscriptionIcon />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="mr-auto font-semibold text-xl"
                >
                  Subscription
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 ml-5">
                {subscriptions && subscriptions.length !== 0 && (
                  <>
                    {subscriptions.map((s, idx) => {
                      return (
                        <Link key={`sub-${idx}`} href={`/profile/${s.userId}`}>
                          <ListItem className="hover:cursor-pointer hover:text-gray-200 text-gray-400 underline underline-offset-[3px]">
                            <ListItemPrefix>
                              <FaCircleUser
                                strokeWidth={4}
                                className="h-5 w-5 mr-2"
                              />
                            </ListItemPrefix>
                            @{s.username}
                          </ListItem>
                        </Link>
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
Sidebar.displayName = "Sidebar";
export default Sidebar;
