import React from "react"

import { auth } from "@clerk/nextjs/server"
import { AUTH_JWT_TEMPLATE, WORKLOAD_TYPES } from "@/constants"
import YellowBackFlow from "@/components/shared/YellowBackFlow"
import IndexerTasks from "@/components/indexer-tasks"
import AITasks from "@/components/ai-tasks"

const TasksPage = async ({ params }: { params: { slug: string[] } }) => {
  const { getToken } = auth()
  const token = (await getToken(AUTH_JWT_TEMPLATE)) || ""
  const [, workloadId] = params?.slug || []
  return (
    <YellowBackFlow>
      {/* <Tasks params={params} jwtToken={token} /> */}

      {workloadId == WORKLOAD_TYPES.AI_WORKLOAD && (
        <AITasks params={params} jwtToken={token} />
      )}
      {workloadId == WORKLOAD_TYPES.UNMARSHAL_INDEXER && (
        <IndexerTasks params={params} jwtToken={token} />
      )}
    </YellowBackFlow>
  )
}

export default TasksPage
