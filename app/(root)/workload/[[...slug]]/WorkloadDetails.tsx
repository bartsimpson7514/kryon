"use client"
import React from "react"
import BreadcrumbComponent from "@/components/shared/Breadcrumbs"
import {
  useGetUserStatsQuery,
  useGetWorkloadByIdQuery,
} from "@/redux/features/apiSlice"
import { LoaderCircleIcon, TriangleAlertIcon } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { WORKLOAD_TYPES } from "@/constants"
import UnmarshalIndexerDetails from "@/components/workloads/UnmarshalIndexerDetails"
import AIWorkloadDetails from "@/components/workloads/AIWorkloadDetails"
import AVSDetails from "@/components/workloads/AVSDetails"

const RenderWorkloadDetails = ({
  data,
  users,
  isSignedIn,
  categoryName,
  jwtToken,
}: any) => {
  switch (data.id) {
    case WORKLOAD_TYPES.UNMARSHAL_INDEXER:
      return (
        <UnmarshalIndexerDetails
          data={data}
          users={users}
          isSignedIn={isSignedIn}
          categoryName={categoryName}
          jwtToken={jwtToken}
        />
      )
    case WORKLOAD_TYPES.AI_WORKLOAD:
      return (
        <AIWorkloadDetails
          data={data}
          isSignedIn={isSignedIn}
          categoryName={categoryName}
          jwtToken={jwtToken}
        />
      )
    default:
      return (
        <AVSDetails
          data={data}
          isSignedIn={isSignedIn}
          categoryName={categoryName}
          jwtToken={jwtToken}
        />
      )
  }
}

const WorkloadDetails = ({
  params,
  jwtToken,
}: {
  params: { slug: string[] }
  jwtToken: string
}) => {
  const { isSignedIn } = useUser()
  const [categoryName, workloadId] = params?.slug || []
  const { data, isLoading, isSuccess, isError } =
    useGetWorkloadByIdQuery(workloadId)
  const { data: users } = useGetUserStatsQuery(workloadId)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h3 className="flex items-center gap-1.5">
          <LoaderCircleIcon className="h-4 w-4 animate-spin text-white" />{" "}
          <span>Loading...</span>
        </h3>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h3 className="flex items-center gap-1.5">
          <TriangleAlertIcon className="h-4 w-4 text-error" />{" "}
          <span className="text-error">Workload details not found...</span>
        </h3>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <BreadcrumbComponent />
      </div>
      <div className="flex items-start gap-6 max-md:flex-col">
        {isSuccess && data?.id && (
          <RenderWorkloadDetails
            data={data}
            users={users}
            isSignedIn={isSignedIn}
            categoryName={categoryName}
            jwtToken={jwtToken}
          />
        )}
      </div>
    </div>
  )
}

export default WorkloadDetails
