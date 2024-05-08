"use client"

export default function Page ({ firstName, lastName, username, pfp }){
    return (
        <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full bg-[#D9D9D9]">
                <img src={pfp} alt="pfp" className="w-36 h-36 rounded-full"/>
            </div>
            <div className="font-bold text-xl text-white">{`${firstName} ${lastName}`}</div>
            <div className="underline underline-offset-4 decoration-[#867D7D] decoration-solid decoration-2 text-[#867D7D] text-base font-bold">@{username}</div>
        </div>
    )
}