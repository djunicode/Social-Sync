"use client"
import { ReplyBtn } from "../../../../../public/svgs"
import Message from "./Message"

export default function Reply() {
  return (
    <div className="flex w-full mt-1 mb-1">
        <div className="ml-12"><ReplyBtn/></div>
        <div className="ml-2 w-full"><Message/></div>
    </div>
  )
}
