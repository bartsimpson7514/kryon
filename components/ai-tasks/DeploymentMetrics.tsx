"use client"
import LineChartCard from "@/components/chartCard"
import { useGetTaskInfraQuery } from "@/redux/features/apiSlice"
import React from "react"
import isEmpty from "lodash.isempty"

const DeploymentMetrics = ({ taskId, jwtToken }: any) => {
  const { data: deploymentCharts, isError } = useGetTaskInfraQuery({
    id: taskId,
    jwtToken,
  })

  if (isError || isEmpty(deploymentCharts)) {
    return <></>
  }

  return (
    <div className="mt-6 w-full">
      <h2 className=" mb-4 text-24 font-medium text-white-v-50">
        Deployment metrics AI
      </h2>
      <div className="space-y-10">
        <div className=" flex flex-wrap gap-4 max-sm:flex-col">
          {deploymentCharts.cpu_usage && (
            <LineChartCard
              data={deploymentCharts.cpu_usage}
              title={"CPU utilization"}
            />
          )}
          {deploymentCharts.ram_usage && (
            <LineChartCard
              data={deploymentCharts?.ram_usage}
              title={"RAM utilization"}
              tickFormatMd={true}
            />
          )}
          {deploymentCharts.disk_usage && (
            <LineChartCard
              data={deploymentCharts?.disk_usage}
              title={"DISK utilization"}
              tickFormatMd={true}
            />
          )}
          {deploymentCharts.gpu_usage && (
            <LineChartCard
              data={deploymentCharts?.gpu_usage}
              title={"GPU utilization"}
              tickFormatMd={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DeploymentMetrics
