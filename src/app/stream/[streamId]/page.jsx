"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  SocialSync,
  Like,
  LikeFilled,
  Share,
  ArrowLeft,
  SendBtn,
} from "../../../../public/svgs";
import "../../../lib/fonts.css";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/app/loading";
import Message from "./(components)/Message";
import Reply from "./(components)/Reply";
import Donation from "./(components)/Donation";
// import dynamic from 'next/dynamic'
import useStore from "@/lib/zustand";
import { apiHandler } from "@/lib/api";
import { socket } from "@/lib/socket";
import Call from "@/components/Call";
import { generateRandomColor } from "@/lib/utils";
import axios from "axios";

const color = generateRandomColor();
export default function Page({ params }) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [render, setRender] = useState(false);
  const [streamInfo, setStreamInfo] = useState();
  const [messages, setMessages] = useState([]);
  const [censorhsip, setCensorship] = useState(0.6);
  const [message, setMessage] = useState("");
  const [creatorInfo, setCreatorInfo] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false); // temporary
  const [viewers, setViewers] = useState(0);
  const { user } = useStore();
  const router = useRouter();

  const divRef = useRef(null);
  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.connect();
    if (socket.connected) {
      onConnect();
      console.log("socket connected");
    }

    function onConnect() {
      socket.io.engine.on("upgrade", (transport) => {
        // setTransport(transport.name);
        console.log(transport.name);
      });
    }

    function onDisconnect() {
      console.log("socket disconnceted");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("chat", (msg) => {
      console.log("Message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("joined", (userId) => {
      console.log("User joined:", userId);
    });

    socket.emit("join", params.streamId);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat");
      socket.off("joined");
    };
  }, []);
  const streamBox = {
    border: "2px solid #040629",
    // border: "2px solid white",
    borderRadius: "20px",
    boxShadow: "0 2px 16px 0 #FFFFFF",
  };

  const donateButton = {
    boxShadow: "0 2px 8px 2px rgba(255, 255, 255, 0.2)",
  };

  async function handleSend(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast("Please login to send messages!");
    socket.emit("chat", params.streamId, token, message);
    setMessage("");
  }

  const getPreviousMessages = async (streamId) => {
    console.log({ streamId });

    toast("Loading Chat...");
    try {
      const res = await apiHandler.getLiveComments({ streamId });
      if (res.error) {
        toast(res.error);
      } else {
        setMessages(res);
      }
    } catch (error) {
      console.log("Failed to fetch chat messages", error);
      toast("Error fetching chat messages");
    }
  };

  const getStream = async (streamId) => {
    console.log({ streamId });
    toast("Loading Stream...");
    try {
      const res = await apiHandler.getStream({ streamId });
      if (res.error) {
        toast("Stream not found!");
        router.replace("/videos");
      } else {
        setStreamInfo(res);
        setCreatorInfo(res.creator);
        const resp = await axios.get(`${url}/api/subscriptions/myStreams`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(resp.data);
        console.log(res.userUserId);
        const isSubscribed = await resp.data.some(
          (subscription) => subscription.creatorUserId === res.userUserId
        );
        if (isSubscribed) {
          setSubscribed(true);
        }
        const view = await axios.post(
          `${url}/api/streamView/create`,
          { streamId: streamId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(view);
        const me = await axios.get(`${url}/api/user/me`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const record = await axios.post(
          "https://social-sync-6c4b.onrender.com/record",
          { userId: me?.data?.userId, streamId: params?.streamId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(record)
        setRender(true);
      }
    } catch (error) {
      console.log("Failed to fetch stream info", error);
      toast("Error fetching stream info");
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(params);
    getStream(params.streamId);
    getPreviousMessages(params.streamId);
  }, [params]);

  async function handleEnd(route) {
    if (
      !(
        user &&
        streamInfo &&
        streamInfo.userUserId === user.userId &&
        streamInfo.storageUrl === ""
      )
    )
      return (window.location.href = route ? route : "/videos");
    const res = await apiHandler.endStream({
      endTimestamp: new Date(Date.now()).toISOString(),
      streamId: streamInfo.streamId,
      streamInfo: streamInfo,
    });
    console.log(res);
    if (res.error) return toast(res.error);
    toast("Stream ended!");
    window.location.href = route ? route : "/videos";
  }

  const toggleSubscribe = async () => {
    try {
      let token = localStorage.getItem("token");
      const me = await axios.get(`${url}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (subscribed) {
        const res = await axios.delete(
          `${url}/api/subscriptions/delete/${streamInfo.userUserId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res);
        if (res && res.data) {
          setSubscribed(false);
        } else {
          if (res.response.data.message === "Internal Server Error") {
            setSubscribed(false);
          }
        }
      } else {
        const res = await axios.post(
          `${url}/api/subscriptions/`,
          {
            userUserId: me?.data?.userId,
            creatorUserId: streamInfo.userUserId,
            streamStreamId: streamInfo.streamId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res);
        if (res && res.data) {
          setSubscribed(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleExitStream = async () => {
    try {
      const d = new Date();
      let date = d.toISOString();
      const res = await axios.post(
        `${url}/api/streamExit/create`,
        { streamStreamId: streamInfo?.streamId, videoTimestamp: date },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const resviewers = await axios.get(
          `${url}/api/streamView/viewers/${params?.streamId}`
        );
        setViewers(resviewers.data.liveViewers);
      } catch (error) {
        console.log(error);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {render && streamInfo && creatorInfo ? (
        <div className="bg-[#020317] h-full flex flex-grow flex-col min-h-screen">
          <div className="flex items-center pt-8">
            <div
              className="ml-2.5 hover:cursor-pointer"
              onClick={() => {
                handleExitStream();
                handleEnd("/videos");
              }}
            >
              <ArrowLeft />
            </div>
            <div
              className="ml-3.5 mt-1 hover:cursor-pointer"
              onClick={() => {
                handleExitStream();
                handleEnd("/");
              }}
            >
              <SocialSync />
            </div>
          </div>
          <div className="mt-9 md:pl-16 md:pr-16 sm:pl-12 sm:pr-12 xs:pl-8 xs:pr-8 pl-4 pr-4 pt-1 h-5/6 ">
            <div className="lg:flex justify-between lg:h-full">
              <div className="lg:w-[64.5%] flex flex-col">
                <div
                  style={streamBox}
                  className="lg:h-full w-full aspect-video sm:h-[50vh] xs:h-[45vh] h-[35vh] overflow-clip relative"
                >
                  {streamInfo && streamInfo.storageUrl ? (
                    <video
                      controls
                      autoPlay
                      src={streamInfo.storageUrl}
                      className=" w-full h-full  rounded-lg overflow-clip"
                    />
                  ) : (
                    <Call
                      channelName={params.streamId}
                      AppID={"8a19575fdd7e4b2a93fcf5a01b9539aa"}
                      type={
                        user &&
                        streamInfo &&
                        streamInfo.userUserId === user.userId
                          ? "host"
                          : "audience"
                      }
                    />
                  )}
                </div>
                <div className="bg-[#020317] py-5 mt-2 w-full">
                  <div>
                    <h1 className="text-4xl font-bold">{streamInfo.title}</h1>
                  </div>
                  <div className="mt-3 xs:flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className=" rounded-full aspect-square w-16 h-16 shadow-lg flex justify-center items-center"
                        style={{ backgroundColor: color }}
                      >
                        <h2 className="text-2xl font-semibold aspect-square text-center">
                          {creatorInfo.username
                            ? creatorInfo.username[0].toUpperCase()
                            : "U"}
                        </h2>
                      </div>
                      <div className="ml-2">
                        <div className="font-semibold sm:text-xl text-lg">
                          {creatorInfo.username}
                        </div>
                        <div className="font-medium sm:text-base text-sm text-[#867D7D]">
                          {creatorInfo._count.CreatorSubscribers} subscribers
                        </div>
                      </div>
                    </div>
                    <div className="flex xs:mt-0 mt-4 xs:mb-0 mb-4 max-xs:justify-end">
                      <div
                        className="rounded-full w-fit pl-3 pr-3 sm:h-9 h-8 max-xs:h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center ml-4 hover:cursor-pointer"
                        onClick={() => setLiked(!liked)}
                      >
                        {liked ? <LikeFilled /> : <Like />}
                        <span className="font-semibold sm:text-xl text-lg text-black ml-1">
                          {streamInfo._count.Vote}
                        </span>
                      </div>
                      <div
                        className="rounded-full sm:w-9 sm:h-9 w-8 h-8 max-xs:w-9 max-xs:h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center sm:ml-4 ml-2 max-xs:ml-3 hover:cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast("Share link copied to clipboard");
                        }}
                      >
                        <Share />
                      </div>
                      <div
                        className="rounded-full sm:w-36 sm:h-9 w-28 h-8 max-xs:w-36 max-xs:h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] text-[#020317] text-xl font-semibold flex justify-center items-center sm:ml-4 ml-2 max-xs:ml-3 hover:cursor-pointer"
                        onClick={() => toggleSubscribe()}
                      >
                        {subscribed ? "Unsubscribe" : "Subscribe"}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#867D7D] mt-1">
                    <p className="font-semibold sm:text-base text-sm leading-4">
                      {streamInfo?._count?.StreamView || viewers} views
                    </p>
                    <p className="font-medium sm:text-lg text-base">
                      {streamInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-[31.5%] flex flex-col gap-5">
                {user &&
                streamInfo &&
                streamInfo.userUserId === user.userId &&
                !streamInfo.storageUrl ? (
                  <button
                    onClick={() => handleEnd("/videos")}
                    className=" py-3 px-6 rounded-xl w-full bg-red-500 hover:bg-red-600 text-white text-lg font-semibold"
                  >
                    End Stream
                  </button>
                ) : (
                  <></>
                )}
                {user && streamInfo && streamInfo.userUserId === user.userId ? (
                  <div className=" flex flex-col">
                    <label htmlFor="censorship">Censorship: {censorhsip}</label>
                    <input
                      className=" w-full bg-red-500"
                      type="range"
                      step={0.05}
                      name="censorship"
                      id="censorship"
                      value={censorhsip}
                      onChange={(e) =>
                        setCensorship(parseFloat(e.target.value))
                      }
                      max={1}
                      min={0}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="lg:h-full h-[75vh] border-[3px] rounded-3xl border-[#ffffff] bg-[#2E2F3F] bg-opacity-60 border-opacity-30 p-2 pr-3 pl-3 relative">
                  <div className="text-2xl font-bold leading-7 text-[#FF8E00] text-center m-2">
                    Live chat
                  </div>
                  <div
                    ref={divRef}
                    className="mt-4 overflow-y-auto pr-2 h-[74%]"
                  >
                    {messages.map((item, ind) => {
                      return (
                        <Message
                          censorhsip={censorhsip}
                          key={ind}
                          message={item}
                        />
                      );
                    })}
                    {/* <Message />
                    <Message />
                    <Donation />
                    <Message />
                    <Message />
                    <Reply /> */}
                  </div>
                  <div className="absolute bottom-5 w-[95%]">
                    <div className="flex justify-end mt-2 mb-2">
                      <div
                        style={donateButton}
                        className="text-xl leading-6 font-semibold text-[#020317] bg-gradient-to-r from-[#F16602] to-[#FF8E00] w-fit p-2 pl-8 pr-8 rounded-full hover:cursor-pointer"
                      >
                        Donate
                      </div>
                    </div>
                    <div>
                      <div className="bg-[#F4F3F3] rounded-full w-full flex justify-between items-center p-3 pl-5 h-11">
                        <div className="w-full">
                          <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onSubmit={handleSend}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSend(e);
                              }
                            }}
                            placeholder="Send message on chat"
                            className="font-medium text-xl bg-[#F4F3F3] w-full text-black focus:outline-none"
                          />
                        </div>
                        <div
                          onClick={handleSend}
                          className="bg-[#020317] h-7 w-7 rounded-full flex ml-2 justify-center items-center hover:cursor-pointer"
                        >
                          <SendBtn />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-lg:h-16"></div>
            </div>
          </div>
        </div>
      ) : (
        <>{loading ? <LoadingScreen /> : <div>Stream Not found !</div>}</>
      )}
    </>
  );
}
