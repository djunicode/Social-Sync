"use client"
import Input from "@/components/Input"
import { apiHandler } from "@/lib/api"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function Form() {
  const url = process.env.NEXT_PUBLIC_API_URL
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  const router = useRouter()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dob = `${year}-${month}-${date}`
    const res = await apiHandler.signup({ username, password, firstName: fname, lastName: lname, email, dob })
    if (!res.error) {
      toast("Account created successfully! Please log in to continue.")
      router.push('/login')
    } else {
      toast(res.error)
    }
  }

  return (
    <form onSubmit={(e) => { handleSubmit(e) }} className=' flex flex-col w-full py-5'>
      <div className=" flex md:flex-row flex-col gap-4 w-full">
        <Input value={fname} setValue={setFname} name={"First Name"} className={" "} />
        <Input value={lname} setValue={setLname} name={"Last Name"} className={" "} />
      </div>
      <Input value={username} setValue={setUsername} name={"Username"} />
      <Input value={email} setValue={setEmail} name={"Email"} />
      <Input value={password} setValue={setPassword} name={"Password"} type="password" />
      <div className={`flex w-full flex-col py-4 gap-1 `}>
        <label className=" text-slate-50 text-lg font-medium px-2">Date of birth</label>
        <div className=" flex md:flex-row flex-col gap-4 w-full text-zinc-950">
          <select required className={`rounded-xl text-zinc-950 md:w-full  px-[10px] py-2 text-2xl font-semibold bg-light ${(date.length === 0) ? "shadow-[8px_8px_0px_0px_rgba(134,125,125,1)]" : "shadow-[8px_8px_0px_0px_rgba(254,141,0,1)]"} outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none`} value={date} onChange={(e) => { setDate(e.target.value) }}>
            <option value="">Date</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <select required className={`rounded-xl text-zinc-950 md:w-full  px-[10px] py-2 text-2xl font-semibold bg-light ${(month.length === 0) ? "shadow-[8px_8px_0px_0px_rgba(134,125,125,1)]" : "shadow-[8px_8px_0px_0px_rgba(254,141,0,1)]"} outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none`} value={month} onChange={(e) => { setMonth(e.target.value) }}>
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>{months[month - 1]}</option>
            ))}
          </select>
          <select required className={`rounded-xl text-zinc-950 md:w-full  px-[10px] py-2 text-2xl font-semibold bg-light ${(year.length === 0) ? "shadow-[8px_8px_0px_0px_rgba(134,125,125,1)]" : "shadow-[8px_8px_0px_0px_rgba(254,141,0,1)]"} outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none`} value={year} onChange={(e) => { setYear(e.target.value) }}>
            <option value="">Year</option>
            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <div className=" pt-12 flex justify-center items-center w-full">
        <button type="submit" className=' bg-primary w-fit text-slate-50 text-2xl font-semibold py-4 md:px-16 px-8 rounded-full'>Sign up</button>
      </div>
    </form>
  )
}
