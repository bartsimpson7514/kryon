"use client"
import { useTheme } from "@/context/ThemeProvider"
import React from "react"

import Image from "next/image"
const Theme = () => {
  const { mode, setMode } = useTheme()

  const otherTheme = mode === "dark" ? "light" : "dark"

  return (
    <button
      type="button"
      className="flex w-auto items-center justify-center rounded-md transition"
      onClick={() => {
        setMode(otherTheme)
        localStorage.theme = otherTheme
      }}
    >
      <div
        className={
          " text-light500_dark-700 text-semibold flex w-full items-center justify-between  bg-transparent  tracking-[0.03px] md:hidden"
        }
      >
        Switch Theme
      </div>

      <div className="h-5 w-5">
        <Image
          src={"/assets/icons/sun.svg"}
          width={24}
          height={24}
          alt="sun"
          className="dark:hidden"
        />
        <Image
          src={"/assets/icons/moon.svg"}
          width={24}
          height={24}
          alt="moon"
          className="hidden dark:block"
        />
      </div>
    </button>
  )
}

export default Theme
