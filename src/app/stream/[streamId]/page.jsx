"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  SocialSync,
  Like,
  LikeFilled,
  Share,
  ThreeDots,
  ArrowLeft,
  SendBtn,
} from "../../../../public/svgs";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/app/loading";
import Message from "./(components)/Message";
import Reply from "./(components)/Reply";
import Donation from "./(components)/Donation";
// import dynamic from 'next/dynamic'
import useStore from "@/lib/zustand";
import { apiHandler } from "@/lib/api";
import { socket } from "@/lib/socket";
import Call from '@/components/Call'

export default function Page({ params }) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [render, setRender] = useState(false);
  const [streamInfo, setStreamInfo] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [creatorInfo, setCreatorInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false); // temporary
  const { user } = useStore()
  const router = useRouter();
  
  const divRef = useRef(null);
  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: 'smooth', 
      });
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  useEffect(() => {
    socket.connect();
    if (socket.connected) {
      onConnect();
      console.log("socket connected")
    }

    function onConnect() {

      socket.io.engine.on('upgrade', (transport) => {
        // setTransport(transport.name);
        console.log(transport.name)
      });
    }

    function onDisconnect() {
      console.log("socket disconnceted")
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('chat', (msg) => {
      console.log('Message:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('joined', (userId) => {
      console.log('User joined:', userId);
    });

    socket.emit("join", params.streamId)

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat');
      socket.off('joined');
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
    e.preventDefault()
    const token = localStorage.getItem("token");
    if (!token) return toast("Please login to send messages!")
    socket.emit('chat', params.streamId, token, message);
    setMessage("");
  }

  const getPreviousMessages = async (streamId) => {
    console.log({ streamId })

    toast("Loading Chat...");
    try {
      const res = await apiHandler.getLiveComments({ streamId });
      if (res.error) {
        toast(res.error)
      } else {
        setMessages(res);
      }
    } catch (error) {
      console.log("Failed to fetch chat messages", error);
      toast("Error fetching chat messages");
    }
  }

  const getStream = async (streamId) => {
    console.log({ streamId })
    toast("Loading Stream...");
    try {
      const res = await apiHandler.getStream({ streamId })
      if (res.error) {
        toast(res.error)
      } else {
        setStreamInfo(res);
        setCreatorInfo(res.creator);
        setRender(true);
      }
    } catch (error) {
      console.log("Failed to fetch stream info", error);
      toast("Error fetching stream info");
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(params)
    getStream(params.streamId);
    getPreviousMessages(params.streamId);
  }, [params]);

  return (
    <>
      {render && streamInfo && creatorInfo ? (
        <div className="bg-[#020317] h-[96vh]">
          <div className="flex items-center mt-9">
            <div
              className="ml-2.5 hover:cursor-pointer"
              onClick={() => router.back()}
            >
              <ArrowLeft />
            </div>
            <div
              className="ml-3.5 mt-1 hover:cursor-pointer"
              onClick={() => router.replace("/home")}
            >
              <SocialSync />
            </div>
          </div>
          <div className="mt-9 pl-16 pr-16 pt-1 h-5/6 ">
            <div className="flex justify-between h-full">
              <div className="w-[64.5%]">
                <div style={streamBox} className="h-5/6">
                  <Call channelName={params.streamId} AppID={"8a19575fdd7e4b2a93fcf5a01b9539aa"} type={(user && streamInfo && (streamInfo.userUserId === user.userId)?"host":"audience")} />
                </div>
                <div className="h-2/6 p-2 mt-2">
                  <div>
                    <h1 className="text-4xl font-bold">{streamInfo.title}</h1>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="border rounded-full w-16 h-16 flex justify-center items-center">
                        photo
                      </div>
                      <div className="ml-2">
                        <div className="font-semibold text-xl">
                          {creatorInfo.username}
                        </div>
                        <div className="font-medium text-[16px] text-[#867D7D]">
                          {creatorInfo._count.CreatorSubscribers} subscribers
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className="rounded-full w-fit pl-3 pr-3 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center ml-4 hover:cursor-pointer"
                        onClick={() => setLiked(!liked)}
                      >
                        {liked ? <LikeFilled /> : <Like />}
                        <span className="font-semibold text-xl text-black ml-1">
                          {streamInfo._count.Vote}
                        </span>
                      </div>
                      <div className="rounded-full w-9 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center ml-4 hover:cursor-pointer">
                        <Share />
                      </div>
                      <div className="rounded-full w-9 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] flex justify-center items-center ml-4 hover:cursor-pointer">
                        <ThreeDots />
                      </div>
                      <div className="rounded-full w-36 h-9 bg-gradient-to-r from-[#F16602] to-[#FF8E00] text-[#020317] text-xl font-semibold flex justify-center items-center ml-4 hover:cursor-pointer">
                        Subscribe
                      </div>
                    </div>
                  </div>
                  <div className="text-[#867D7D] mt-1">
                    <p className="font-semibold text-base leading-4">
                      {streamInfo._count.StreamView} views
                    </p>
                    <p className="font-medium text-lg">
                      {streamInfo.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[31.5%]">
                <div className="h-full border-[3px] rounded-3xl border-[#ffffff] bg-[#2E2F3F] bg-opacity-60 border-opacity-30 p-2 pr-3 pl-3 relative">
                  <div className="text-2xl font-bold leading-7 text-[#FF8E00] text-center m-2">
                    Live chat
                  </div>
                  <div ref={divRef} className="mt-4 overflow-y-auto pr-2 h-[74%]">
                    {messages.map((item, ind) => {
                      return (
                        <Message key={ind} message={item} />
                      )
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
                            onKeyDown={(e) => {if(e.key==="Enter"){
                              handleSend(e)
                            }}}
                            placeholder="Send message on chat"
                            className="font-medium text-xl bg-[#F4F3F3] w-full text-black focus:outline-none"
                          />
                        </div>
                        <div onClick={handleSend} className="bg-[#020317] h-7 w-7 rounded-full flex ml-2 justify-center items-center hover:cursor-pointer">
                          <SendBtn />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{loading ? <LoadingScreen /> : <div>Stream Not found !</div>}</>
      )}
    </>
  );
}
