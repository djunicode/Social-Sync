"use client"
import useStore from "@/lib/zustand"
import axios from "axios"
import { redirect, usePathname } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export default function AuthChecker() {
    const url = process.env.NEXT_PUBLIC_API_URL
    const { auth, user, token, setToken, setAuth, setUser } = useStore()
    const path = usePathname()

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
            } else {
                toast(res.data.error)
            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong! Please try again later.")
        }
    }
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
        <></>
    )
}
