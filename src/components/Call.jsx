"use client"

import AgoraRTC, {
    AgoraRTCProvider,
    LocalVideoTrack,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRTCClient,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";
import { memo, useEffect, useMemo } from "react";

const Call = memo(function CallComponent (props){
   
    
    const client = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }));
    
    console.log(client)
    function Videos(props) {
        const PublishLocal = () => {
            const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
            const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
            usePublish([localMicrophoneTrack, localCameraTrack]);
            const deviceLoading = isLoadingMic || isLoadingCam;
            return deviceLoading ? (
                <div className="flex flex-col items-center pt-40">Loading devices...</div>
            ) : (
                <>
                    {console.log("hii")}
                    <LocalVideoTrack
                        track={localCameraTrack}
                        play={true}
                        className="w-full h-full rounded-xl overflow-clip"
                    />
                </>
            )

        }


        const { AppID, channelName, type } = props;
        const remoteUsers = useRemoteUsers();
        const { audioTracks } = useRemoteAudioTracks([remoteUsers[0]]);
        console.log(AppID)
        useJoin({
            appid: "8a19575fdd7e4b2a93fcf5a01b9539aa",

            channel: channelName,
            token: null,
        });

        audioTracks.map((track) => track.play());
        const unit = "minmax(0, 1fr) ";

        return (
            <div className="flex flex-col justify-between w-full h-full p-1">
                <div
                    className={`flex w-full h-full rounded-3xl`}
                >
                    {type === "host" ? <PublishLocal />: <></>}
                    {type !== "host" ? remoteUsers.length===0?
                    <div className=" flex w-full h-full justify-center items-center text-xl font-semibold">
                        Stream has Ended!
                    </div>: 
                    [remoteUsers[0]].map((user, ind) => (
                        <RemoteUser key={`user-${ind}`} user={user} />
                    )):<></>}
                </div>
            </div>
        );
    }
    return (
        <AgoraRTCProvider client={client}>
            <Videos channelName={props.channelName} AppID={props.appId} type={props.type} />
        </AgoraRTCProvider>
    );
})

export default Call;