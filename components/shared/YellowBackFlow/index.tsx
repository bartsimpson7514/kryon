"use client"
import React from "react"
import YellowBackFlowBg from "@/public/assets/icons/yellow-back-flow.svg"
const YellowBlackFlowBg = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" min-h-screens container flex w-full flex-col px-20 py-4 min-xl:p-5">
      <div className=" background-light900_dark900s absolute left-0 right-0 top-40 z-0 m-auto flex h-full max-h-[500px] w-full items-center justify-center overflow-hidden">
        <YellowBackFlowBg className={"h-full w-full"} />
      </div>
      <div className=" relative z-10 w-full">{children}</div>
    </main>
  )
}

export default YellowBlackFlowBg
