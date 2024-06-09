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
  const [videos, setVideos] = React.useState([]);
  const [streams, setStreams] = React.useState([]);
  const [exploreCreators, setExploreCreators] = React.useState([]);

  const url = process.env.NEXT_PUBLIC_API_URL;

  const getData = async () => {
    try {
      const user = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const recommend = await axios.get(
        `https://social-sync-6c4b.onrender.com/recommend/${user?.data?.userId}`
      );
      const recommendPromise = await recommend.data.map((streamId) =>
        axios.get(`${url}/api/stream/${streamId}`)
      );
      const recommendDetails = await Promise.all(recommendPromise);
      const recommendVideos = recommendDetails.map((response) => response.data);
      setVideos(recommendVideos);
      if (recommendVideos.length === 0) {
        const v1 = await axios.get(`${url}/api/stream/all`);
        let v1data = await v1.data.filter((v) => v.storageUrl !== "");
        setVideos(v1data.slice(0, 6));
      }
      const s1 = await axios.get(`${url}/api/stream/all`);
      let s1data = await s1.data.filter(
        (s) => s.storageUrl === "" && s.endTimestamp === null
      );
      setStreams(s1data.slice(0, 6));
    } catch (error) {
      console.error(error);
    }
  };

  const getCreators = async () => {
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
  };

  React.useEffect(() => {
    getData();
    getCreators();
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
          <div className="w-full pl-10 pr-10 max-xs:pl-2">
            <h2 className="text-white text-2xl max-xs:text-lg font-medium mt-10 m-4">
              Explore streams from other creators
            </h2>
          </div>
          {videos && videos.length !== 0 ? (
            <div className="grid screen:grid-cols-3 size1:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 grid-cols-1 w-full">
              <>
                {videos.map((str) => {
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
                        live={
                          str.storageUrl === "" && str.endTimestamp === null
                            ? true
                            : false
                        }
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
          <div className="w-full pl-10 pr-10 max-xs:pl-2">
            <h2 className="text-white text-2xl max-xs:text-lg font-medium mt-10 m-4">
              Explore creators that are currently live
            </h2>
          </div>
          {streams && streams.length !== 0 ? (
            <div className="grid screen:grid-cols-3 size1:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 grid-cols-1 w-full">
              <>
                {streams.map((str) => {
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
                        live={
                          str.storageUrl === "" && str.endTimestamp === null
                            ? true
                            : false
                        }
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
          <div className="w-full pl-10 pr-10 max-xs:pl-2">
            <h2 className="text-white text-2xl max-xs:text-lg font-medium mt-10 m-4">
              Explore creators similar to your subscriptions
            </h2>
          </div>
          {exploreCreators && exploreCreators.length !== 0 ? (
            <div className="mt-4 grid screen:grid-cols-5 lg:grid-cols-4 size1:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 w-full">
              {exploreCreators.slice(0, 8).map((s, idx) => {
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
