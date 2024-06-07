"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input"
import { EditPenIcon, EditPenIconSmall , ArrowLeft , SocialSync } from "../../../../../public/svgs";
import useStore from "@/lib/zustand"
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const Payment = () => {

    const url = process.env.NEXT_PUBLIC_API_URL
    const { auth, user, token, setToken, setAuth, setUser } = useStore()
    const path = usePathname()
    const router = useRouter();

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getUser = async () => {
        //axios
        try {
            const res = await axios.get(`${url}/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                validateStatus: (status) => (status >= 200 && status < 401)
            })
            console.log(res.data)
            if (res.status === 200) {
                toast(`Welcome back, ${res.data.username}!`)
                setUser(res.data)
                console.log(res.data)
            } else {
                toast(res.data.error)
            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong! Please try again later.")
        }
    }

    const handleSaveChanges = async () => {
        try {
            const res = await axios.put(`${url}/api/user/`, {
                firstName:fname ? fname : user.firstName,
                lastName:lname ? lname : user.lastName,
                username:username ? username : user.username,
                email:email ? email : user.email,
                password:password ? password : user.password,
                dob: `${year}-${month}-${date}`
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                validateStatus: (status) => (status >= 200 && status < 401)
            })
            if (res.status === 200) {
                toast("Changes saved successfully!")
                getUser()
            } else {
                toast(res.data.error)
            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong! Please try again later.")
        }
    
    }

    useEffect(() => {
        const dob = new Date(user?.dob); 
        const day = dob.getUTCDate().toString(); 
        const monthIndex = dob.getUTCMonth();  
        const yearValue = dob.getUTCFullYear().toString(); 
        setDate(day);
        setMonth(monthIndex + 1); 
        setYear(yearValue);
      }, []);
    useEffect(() => {
        if (!token) {
            const localToken = localStorage.getItem("token")
            if (!localToken&&(path!=="/login"&&path!=="/signup"&&path!=="/")) {
                redirect("/login")
            }
            setToken(localToken)
        } else if (!auth) {
            setAuth(true)
        } else if (!user) {
            getUser()
        } else if (path === "/login" || path === "/signup") {
            redirect("/home")
        }
    }, [path, auth, user, token])

  return (
    <>
    <div className="fixed backdrop-blur-md lg:backdrop-blur-0  w-full h-[100px] top-0 gap-2 flex justify-left items-center pl-10 z-10 " >
        <div className="hover:cursor-pointer" onClick={() => router.back()}><ArrowLeft/></div><SocialSync/>
    </div>
    <div className="my-[150px] border-[#5F5F6B] border-4 rounded-3xl w-[95%] p-10 sm:w-[80%] md:w-[60%] lg:w-[40%] bg-[#1D1D2F] m-auto flex justify-evenly items-center flex-col text-gray-600 relative">
        <h1 className="absolute top-[-50px] text-4xl font-bold text-[#D9D9D9]">Personal Details</h1>
        <div className="h-[200px] w-[200px] flex flex-col justify-center items-center gap-2 ">
        <div className="h-40 w-40 rounded-full bg-[#D9D9D9] "></div>
        <h2 className="flex justify-center underline items-center gap-2 text-lg text-[#867D7D]">Edit profile picture <EditPenIconSmall/></h2>
        </div>
        <div className="flex justify-evenly w-full">
            <Input value={fname} placeholder={user?.firstName} setValue={setFname} name={"First Name"} className={"w-[40%] mr-4"} >
                <div className="absolute right-2  bottom-7 text-2xl">
                    <EditPenIcon/>
                </div>
            </Input>
            <Input value={lname} placeholder={user?.lastName} setValue={setLname} name={"First Name"} className={"w-[40%]"} >
                <div className="absolute right-2  bottom-7 text-2xl">
                    <EditPenIcon/>
                </div>
            </Input>
        </div>
        <Input value={username} setValue={setUsername} placeholder={user?.username} name={"Username"} className={"w-[87%]"} >
                <div className="absolute right-2  bottom-7 text-2xl">
                    <EditPenIcon/>
                </div>
        </Input>
        <Input value={email} setValue={setEmail} placeholder={user?.email} name={"Email"} className={"w-[87%]"} >
                <div className="absolute right-2  bottom-7 text-2xl">
                    <EditPenIcon/>
                </div>
        </Input>
        <div className={`flex w-[87%] flex-col py-4 gap-1 `}>
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
        <Input value={password} placeholder={"********"} setValue={setPassword} name={"Password"} type={"password"} className={"w-[87%]"} >
        </Input>
        <div className=" pt-12 flex justify-center items-center w-full">
        <button onClick={handleSaveChanges} type="submit" className=' bg-primary w-fit text-slate-50 text-2xl font-semibold py-4 md:px-16 px-8 rounded-full'>Save Changes</button>
      </div>
    </div>
    </>
  );
};

export default Payment;
