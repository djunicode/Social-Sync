"use client"
import useStore from "@/lib/zustand"

export default function Page() {
    const { user, setAuth, setToken, setUser } = useStore()
  return (
    <div className=' flex flex-col min-h-screen bg-dark justify-center items-center '>
        <h1 className=" text-6xl font-bold text-primary py-6">Hello {user?user.username:"user"}</h1>
        <button onClick={()=>{localStorage.removeItem("token");setToken(null);setAuth(false);setUser(null)}} className=" bg-primary py-4 px-8 font-semibold hover:bg-primary/90 transition-all text-4xl rounded-full text-slate-50">Sign out</button>
    </div>
  )
}
