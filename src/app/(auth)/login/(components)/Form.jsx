"use client"
import Input from "@/components/Input"
import useStore from "@/lib/zustand"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { apiHandler } from "@/lib/api"

export default function Form() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const [nameEmail, setNameEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setAuth, setToken } = useStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await apiHandler.login({ nameEmail, password })
    if (!res.error) {
      toast("Logged in successfully!")
      localStorage.setItem("token", res.accessToken)
      setToken(res.accessToken)
      setAuth(true)
    } else {
      toast(res.error)
    }
  }

  return (
    <form className=' flex flex-col w-full py-5'>
      <Input value={nameEmail} setValue={setNameEmail} name={"Email/Username"} />
      <Input value={password} setValue={setPassword} name={"Password"} type="password" />
      <div className=" pt-12 flex justify-center items-center w-full">
        <button onClick={(e) => { handleSubmit(e) }} className=' bg-primary w-fit text-slate-50 text-2xl font-semibold py-4 md:px-16 px-8 rounded-full'>Login</button>
      </div>
    </form>
  )
}
