import React from "react"
import WorkloadDetails from "./WorkloadDetails"
import { auth } from "@clerk/nextjs/server"
import { AUTH_JWT_TEMPLATE } from "@/constants"
import YellowBlackFlowBg from "@/components/shared/YellowBackFlow"

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { getToken } = auth()

  const token = (await getToken(AUTH_JWT_TEMPLATE)) || ""

  return (
    <YellowBlackFlowBg>
      <WorkloadDetails params={params} jwtToken={token} />
    </YellowBlackFlowBg>
  )
}
