"use client"
import React, { useMemo } from "react"
import TaskIdDetails from "./TaskIdDetails"
import DeploymentMetrics from "./DeploymentMetrics"
import BreadcrumbComponent from "@/components/shared/Breadcrumbs"
import { useGetAllTasksQuery } from "@/redux/features/apiSlice"
import isEmpty from "lodash.isempty"
import { FileWarningIcon, LoaderCircleIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

const IndexerTasks = ({
  params,
  jwtToken,
}: {
  params: { slug: string[] }
  jwtToken: string
}) => {
  const [, workloadId, taskId] = params?.slug || []

  const searchParams = useSearchParams()
  const taskCategory = searchParams.get("category")

  // storeRef.current?.dispatch(
  //   apiSlice.endpoints.getWorkloadCategories.initiate(workloadId),
  // )

  const {
    data: allUserTasks,

    isLoading: isTasksApiLoading,
  } = useGetAllTasksQuery({ id: workloadId, jwtToken })

  const task = useMemo(
    () => (allUserTasks?.entities ? allUserTasks?.entities[taskId] : {}),
    [allUserTasks, taskId],
  )

  if (isTasksApiLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h3 className="flex items-center gap-1.5">
          <LoaderCircleIcon className="h-4 w-4 animate-spin text-white" />{" "}
          <span>Loading...</span>
        </h3>
      </div>
    )
  }
  if (isEmpty(task)) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 ">
        <h3 className="flex items-center gap-1.5">
          <FileWarningIcon className="h-4 w-4  text-white" />{" "}
          <span>No task details found.</span>
        </h3>
        <Button asChild>
          <Link href={"/"}>back to workloads</Link>
        </Button>
      </div>
    )
  }
  return (
    <>
      <div className="mb-8">
        <BreadcrumbComponent />
      </div>
      <TaskIdDetails task={task} />
      <DeploymentMetrics
        taskId={taskId}
        jwtToken={jwtToken}
        taskCategory={taskCategory ?? "Creator"}
      />
    </>
  )
}

export default IndexerTasks
