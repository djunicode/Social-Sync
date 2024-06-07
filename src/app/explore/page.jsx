"use client";
import React from "react";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import Creator from "@/app/explore/(components)/Creator";
import axios from "axios";
import { MenuIcon, CrossIcon } from "../../../public/svgs";
import "../../lib/fonts.css";

export default function ExplorePage() {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const [streams1, setStreams1] = React.useState([]);
  const [streams2, setStreams2] = React.useState([]);
  const [exploreCreators, setExploreCreators] = React.useState([]);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const getData = async () => {
    try {
      const user = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const res = await axios.get(
        `https://social-sync-6c4b.onrender.com/recommend/${user?.data?.userId}`
      );
      const recommendedStreamIds = res.data;
      const streamDetailsPromise = recommendedStreamIds.map((streamId) =>
        axios.get(`${url}/api/stream/${streamId}`)
      );
      const streamDetails = await Promise.all(streamDetailsPromise);
      const streams = streamDetails.map((response) => response.data);
      console.log(streams);
      setStreams1(streams);
      if (streams.length === 0) {
        const s1 = await axios.get(`${url}/api/stream/all`);
        let s1data = [];
        s1data.push(s1.data?.[0]);
        s1data.push(s1.data?.[1]);
        s1data.push(s1.data?.[2]);
        setStreams1(s1data);
      }
      const resp1 = await axios.get(`${url}/api/subscriptions/myStreams`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const resp2 = await axios.get(`${url}/api/user/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      let userIdsFromResp1 = [];
      if (resp1) {
        userIdsFromResp1 = await resp1.data.map((user) => user.creatorUserId);
        userIdsFromResp1.push(resp1.data[0].userUserId);
      }
      const filteredResp2 = await resp2.data.filter(
        (user) => !userIdsFromResp1.includes(user.userId)
      );
      setExploreCreators(filteredResp2);
      const streamIds = [];
      resp1.data.forEach((subscription) => {
        subscription.User_Subscriptions_creatorUserIdToUser.Stream.forEach(
          (stream) => {
            streamIds.push(stream.streamId);
          }
        );
      });
      const streamsPromises = streamIds.map(async (sId) => {
        try {
          const response = await axios.get(`${url}/api/stream/${sId}`);
          return response.data;
        } catch (error) {
          console.log(`Stream with ID ${sId} does not exist`);
          return null;
        }
      });
      const liveStreamDetails = await Promise.all(streamsPromises);
      const validLiveStreams = liveStreamDetails.filter(
        (details) => details !== null
      );
      console.log(validLiveStreams);
      setStreams2(validLiveStreams);
      if (!validLiveStreams || validLiveStreams.length === 0) {
        const s2 = await axios.get(`${url}/api/stream/all`);
        let s2data = [];
        s2data.push(s2.data?.[3]);
        s2data.push(s2.data?.[4]);
        s2data.push(s2.data?.[5]);
        setStreams2(s2data);
        console.log(s2);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex mb-4">
        <div
          className={`${
            isSideBarOpen
              ? "max-md:translate-x-0 max-md:z-20"
              : "max-md:-translate-x-[18rem]"
          } max-md:transform transition-transform ease-in-out duration-500`}
        >
          <Sidebar />
        </div>
        <div className="flex flex-col pt-12 items-center h-full w-full md:ml-[18rem] bg-[#030421] z-0">
          <SearchBar />
          <div
            className={`absolute right-0 mr-5 w-6 h-10 max-md:flex items-center hidden`}
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          >
            {isSideBarOpen ? <CrossIcon /> : <MenuIcon />}
          </div>
          <div className="items-start flex-1">
            <h2 className="text-white text-xl mt-10 flex m-4 text-center">
              Explore streams
            </h2>
          </div>
          {streams1 && streams1.length !== 0 ? (
            <div className="grid screen:grid-cols-3 size1:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 grid-cols-1">
              <>
                {streams1.map((str) => {
                  return (
                    <div
                      key={str.streamId}
                      className="max-w-[400px] min-w-[256px] mx-auto w-full"
                    >
                      <Card
                        title={str.title}
                        thumbnail={str.thumbnailUrl}
                        date={str.startTimestamp}
                        username={str.creator.username}
                        views={str._count.StreamView}
                        streamId={str.streamId}
                        userId={str.userUserId}
                      />
                    </div>
                  );
                })}
              </>
            </div>
          ) : (
            <div className="mt-8 mb-8 text-center text-red-400">
              No recommendations!
            </div>
          )}
          <hr className="w-1/2 mx-auto my-5 border-0 h-px bg-slate-500" />
          <h2 className="text-white text-xl mb-4 text-center">
            Explore creators that are currently live
          </h2>
          {streams2 && streams2.length !== 0 ? (
            <div className="grid screen:grid-cols-3 size1:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 grid-cols-1 w-full">
              <>
                {streams2.map((str) => {
                  return (
                    <div
                      key={str.streamId}
                      className="max-w-[400px] min-w-[256px] mx-auto w-full"
                    >
                      <Card
                        title={str.title}
                        thumbnail={str.thumbnailUrl}
                        date={str.startTimestamp}
                        username={str.creator.username}
                        views={str._count.StreamView}
                        streamId={str.streamId}
                        userId={str.userUserId}
                      />
                    </div>
                  );
                })}
              </>
            </div>
          ) : (
            <div className="mt-8 mb-8 text-center text-red-400">
              No livestreams!
            </div>
          )}
          <hr className="w-1/2 mx-auto my-5 border-0 h-px bg-slate-500" />
          <h2 className="text-white text-xl mb-4 text-center">
            Explore creators similar to your subscriptions
          </h2>
          {exploreCreators && exploreCreators.length !== 0 ? (
            <div className="mt-4 grid screen:grid-cols-5 lg:grid-cols-4 size1:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full">
              {exploreCreators.map((s, idx) => {
                return (
                  <Creator
                    key={`creator-${idx}`}
                    firstName={s.firstName}
                    lastName={s.lastName}
                    username={s.username}
                    userId={s.userId}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-8 mb-8 text-center text-red-400">
              No more creators!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
