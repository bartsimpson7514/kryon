"use client"
import React from "react"
import ModalSkeleton from "../shared/modalSkeleton"
import AllTasks from "./AllTasks"

const RunningWorkload = ({
  categoryName,
  jwtToken,
  workloadId,
}: {
  categoryName: string
  jwtToken: string
  workloadId: string
  metadata: any
}) => {
  return (
    <ModalSkeleton classes="!basis-[536px] md:!mt-0">
      <AllTasks
        categoryName={categoryName}
        jwtToken={jwtToken}
        workloadId={workloadId}
      />
    </ModalSkeleton>
  )
}

export default RunningWorkload
