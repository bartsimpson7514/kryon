import React from "react"
import ArrowExternalIcon from "@/public/assets/icons/arrow-external.svg"
import isEmpty from "lodash.isempty"
import { Button } from "../ui/button"

const TaskMetadata = ({ task }: { task: any }) => {
  if (isEmpty(task)) {
    return <></>
  }

  return (
    <>
      <div className="flex w-full flex-col items-start gap-5 overflow-hidden rounded-lg border-0">
        <h2 className="text-24 font-medium text-white-v-50">Custom metadata</h2>
        <div className="flex gap-24 text-16 font-medium text-white">
          <div className="text-white">
            <span className="text-white-v-600">Name: {` `}</span>
            <span>{task.name}</span>
          </div>
          <div>
            <span className="text-white-v-600">Image: {` `}</span>
            <span>{task.metadata?.deployment_config?.image}</span>
          </div>
          <div>
            <span className="text-white-v-600">VM Type: {` `}</span>
            <span>{task.metadata?.deployment_config?.vm_type}</span>
          </div>
          <div>
            <span className="text-white-v-600">Port: {` `}</span>
            <span>{task.metadata?.deployment_config?.port}</span>
          </div>
        </div>
        <Button variant="outline" className="!h-8 !py-1 text-yellow-400">
          Usage docs <ArrowExternalIcon />
        </Button>
      </div>
    </>
  )
}

export default TaskMetadata
