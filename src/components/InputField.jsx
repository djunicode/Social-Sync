"use client"

import { useState } from "react"
import { ShowPassword } from "../../public/svgs"

export default function InputField({ value, setValue, type = "text", name, id, placeholder, className, ...props }) {
    const [showPassword, setShowPassword] = useState(false)
    const [focus, setFocus] = useState(false)
    return type === "password" ?
        (
            <div
                className={`rounded-xl md:w-full  flex flex-row text-zinc-950 px-[10px] py-2 text-2xl font-semibold bg-light ${(value ? value.length === 0 : true) ? "shadow-[8px_8px_0px_0px_rgba(134,125,125,1)]" : "shadow-[8px_8px_0px_0px_rgba(254,141,0,1)]"} outline-none transition-all ${focus?"translate-x-[3px] translate-y-[3px] shadow-none":""} ${className}`}>
                <input required type={showPassword?"text":"password"}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    onFocus={()=>{setFocus(true)}}
                    onBlur={()=>{setFocus(false)}}
                    aria-label={placeholder}
                    {...props}
                    className=" flex w-full flex-grow bg-transparent outline-none" />
                <button type="button" onClick={()=>{setShowPassword(!showPassword)}} className=" w-8 aspect-square ">
                <ShowPassword />
                </button>
            </div>
        ) :
        (
            <input
                className={`rounded-xl text-zinc-950 md:w-full  px-[10px] py-2 text-2xl font-semibold bg-light ${(value ? value.length === 0 : true) ? "shadow-[8px_8px_0px_0px_rgba(134,125,125,1)]" : "shadow-[8px_8px_0px_0px_rgba(254,141,0,1)]"} outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none ${className}`}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                required
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                aria-label={placeholder}
                {...props}
            />
        )
}

