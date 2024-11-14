"use client"

import React from "react"
import YellowBackFlow from "@/components/shared/YellowBackFlow"
import AvsDetails from "@/components/avs/AvsDetails"

interface PageProps {
  params: {
    avsId: number
  }
}

const Page = ({ params: { avsId } }: PageProps) => {
  return (
    <YellowBackFlow>
      <AvsDetails avsId={avsId} />
    </YellowBackFlow>
  )
}

export default Page
