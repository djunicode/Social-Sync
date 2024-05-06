"use client";
import React from "react";
import SearchBar from "@/components/SearchBar";
import { SocialSync } from "../../public/svgs";

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

const Sidebar = () => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="flex">
      <Card className="h-screen fixed bg-[#1C1D2F] w-full max-w-[18rem] p-4 pt-6 shadow-xl shadow-blue-gray-900/5">
        <div className="flex justify-center text-3xl items-center mb-8 mt-5 text-[#FF8E00]">
          {/* <Typography variant="h2">SocialSync</Typography> */}
          <SocialSync/>
        </div>
        <div className="flex items-center ml-3 mb-5 mt-5 ">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <img
              src="full-name.png"
              alt="Full Name"
              className="w-7 h-7 rounded-full"
            />
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-bold text-white">Sharan</h2>
            <p className="text-gray-400">@sharyplays</p>
          </div>
        </div>
        {/* <div className="p-2">
        <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5 mt-3 mx-4" />}
        />
      </div> */}
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
                Home
              </Typography>
            </ListItem>
            {/* <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody> */}
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
              {/* <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            > */}
              <ListItemPrefix>
                <IoCompassOutline className="h-7 w-7 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Explore
              </Typography>
              {/* </AccordionHeader> */}
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
                <ListItem>
                  <ListItemPrefix>
                    <FaCircleUser strokeWidth={4} className="h-5 w-5 mr-2" />
                  </ListItemPrefix>
                  User 1
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <FaCircleUser strokeWidth={4} className="h-5 w-5 mr-2" />
                  </ListItemPrefix>
                  User 2
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          {/* <hr className="my-2 border-blue-gray-50" /> */}
          {/* <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip
              value=""
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}
          {/* <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
        </List>
      </Card>
    </div>
  );
};

export default Sidebar;
