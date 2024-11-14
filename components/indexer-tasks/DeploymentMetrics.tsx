"use client"
import LineChartCard from "@/components/chartCard"
import { useGetTaskInfraQuery } from "@/redux/features/apiSlice"
import React from "react"
import TaskChainDetails from "./TaskChainDetails"
import isEmpty from "lodash.isempty"

interface DeploymentMetricsTypes {
  taskId: string
  jwtToken: string
  taskCategory: string
}

const DeploymentMetrics = ({
  taskId,
  jwtToken,
  taskCategory = "Creator",
}: DeploymentMetricsTypes) => {
  const { data: deploymentCharts, isError } = useGetTaskInfraQuery({
    id: taskId,
    jwtToken,
  })

  if (isError || isEmpty(deploymentCharts)) {
    return <></>
  }

  const role: any = {
    Verifier: [
      "Block delay",
      "Data accuracy",
      "API success accruacy",
      "API failure accruacy",
    ],
    Creator: [
      "CPU utilization",
      "RAM utilization",
      "DISK utilization",
      "API utilization",
    ],
  }

  // "active_nodes": 4,
  // "network_uptime": 99.92867547069876,
  // "total_data_processed": "529TB",
  // "resource_allocation": "AutoScaling",

  const operatorMetrics = [
    { key: "active_nodes", text: "Active Nodes" },
    {
      key: "network_uptime",
      text: "Network Uptime",
    },
    {
      key: "total_data_processed",
      text: "Total Data Processed",
    },
    {
      key: "resource_allocation",
      text: "Resource Allocation",
    },
  ]

  const RenderOperatorDeploymentMetrics = () => {
    return (
      <div className="mb-10 px-4 sm:col-span-2 lg:w-1/2 lg:px-0">
        {/* <dt className="text-sm/6 font-medium text-gray-900">Attachments</dt> */}
        <dd className="mt-2 text-base text-white">
          <ul
            role="list"
            className="divide-y divide-white-v-16 rounded-md border border-white-v-16"
          >
            {operatorMetrics.map((item) => {
              return (
                <li
                  key={item.key}
                  className="flex items-center justify-between py-4 pl-4 pr-5"
                >
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-gray-400"
              /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">{item.text}</span>
                    </div>
                  </div>
                  <div className="ml-4 shrink-0">
                    {deploymentCharts[item.key]}
                    {` `}
                    {item.key == "network_uptime" && (
                      <span className="font-bold">%</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </dd>
      </div>
    )
  }

  const RenderGraphMetrics = () => {
    return (
      <div className="space-y-10">
        <div className="flex flex-wrap justify-start gap-4 max-sm:flex-col">
          {deploymentCharts.cpu_usage && (
            <LineChartCard
              data={deploymentCharts.cpu_usage}
              title={role[taskCategory][0]}
            />
          )}
          {deploymentCharts.ram_usage && (
            <LineChartCard
              data={deploymentCharts?.ram_usage}
              title={role[taskCategory][1]}
              tickFormatMd={true}
            />
          )}
          {deploymentCharts.disk_usage && (
            <LineChartCard
              data={deploymentCharts?.disk_usage}
              title={role[taskCategory][2]}
              tickFormatMd={true}
            />
          )}
          {deploymentCharts.api_calls_served && (
            <LineChartCard
              data={deploymentCharts?.api_calls_served}
              title={role[taskCategory][3]}
              tickFormatMd={true}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className=" mt-6 w-full">
      <h2 className=" mb-4 mt-8 text-24 font-medium text-white-v-50">
        Deployment metrics
      </h2>
      {["Verifier", "Creator"].includes(taskCategory) ? (
        <RenderGraphMetrics />
      ) : (
        <RenderOperatorDeploymentMetrics />
      )}
      {isEmpty(deploymentCharts) ? (
        <></>
      ) : (
        <TaskChainDetails chainDetails={deploymentCharts.chain_stats} />
      )}
    </div>
  )
}

export default DeploymentMetrics
