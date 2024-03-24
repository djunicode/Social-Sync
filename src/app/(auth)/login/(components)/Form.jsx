"use client"
import Input from "@/components/Input"
import useStore from "@/lib/zustand"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function Form() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const [nameEmail, setNameEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setAuth, setToken } = useStore()   

  const handleSubmit = async (e) => {
    e.preventDefault()
    toast("Logging into account...")
    console.log({ nameEmail, password })
    console.log(url)
    //axios
    try {
      const res = await axios.post(`${url}/api/user/login`,
        {
          emailUsername:nameEmail, password: password,
        },
        {
          validateStatus: (status) => (status >= 200 && status < 401)
        }
      )
      console.log(res.data)
      if (res.status === 200) {
        toast("Logged in successfully!")
        localStorage.setItem("token", res.data.accessToken)
        setToken(res.data.accessToken)
        setAuth(true)
      } else {
        toast(res.data.error)
      }
    } catch (error) {
      console.log(error)
      toast("Something went wrong! Please try again later.")
    }
  }

  return (
    <form className=' flex flex-col w-full py-5'>
      <Input value={nameEmail} setValue={setNameEmail} name={"Email/Username"} />
      <Input value={password} setValue={setPassword} name={"Password"} type="password" />
      <div className=" pt-12 flex justify-center items-center w-full">
        <button onClick={(e)=>{handleSubmit(e)}} className=' bg-primary w-fit text-slate-50 text-2xl font-semibold py-4 md:px-16 px-8 rounded-full'>Login</button>
      </div>
    </form>
  )
}
