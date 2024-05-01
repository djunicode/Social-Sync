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
import { memo, useMemo } from "react";

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
                    {type !== "host" ? [remoteUsers[0]].map((user, ind) => (
                        <RemoteUser key={`user-${ind}`} user={user} />
                    )):<></>}
                </div>
            </div>
        );
    }
    return (
        <AgoraRTCProvider client={client}>
            <Videos channelName={props.channelName} AppID={props.appId} type={props.type} />
            <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                <a className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40" href="/">End Call</a>
            </div>
        </AgoraRTCProvider>
    );
})

export default Call;