import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TASK_STATUS_CLASS } from "@/constants"
import { formatDateInDays } from "@/lib/utils"
import isEmpty from "lodash.isempty"
import { useGetTaskInfraQuery } from "@/redux/features/apiSlice"
import Link from "next/link"
import { Loader2Icon } from "lucide-react"
import { Button } from "../ui/button"
import ArrowExternalIcon from "@/public/assets/icons/arrow-external.svg"

const TaskIdDetails = ({ task, jwtToken }: any) => {
  const { isLoading, data: taskData } = useGetTaskInfraQuery({
    id: task.id,
    jwtToken,
  })

  if (isEmpty(task)) {
    return <></>
  }

  const dataInDays = formatDateInDays(task?.created_at)

  return (
    <>
      <div className="flex justify-start gap-5">
        <p className="text-24 font-medium text-white-v-50">{task.id}</p>
        <Button
          variant="outline"
          className="!h-8 !py-1 text-yellow-400 backdrop-blur-sm"
        >
          Endpoint <ArrowExternalIcon />
        </Button>
      </div>

      <div className=" w-full overflow-hidden rounded-lg border border-white-v-16 backdrop-blur-sm">
        <Table className=" relative w-full table-fixed">
          <TableHeader className=" rounded-t-xl">
            <TableRow className=" w-full  !border-0 bg-white-v-008 text-16-24 font-medium  !text-white-v-600">
              <TableHead className=" w-1/3 rounded-tl-lg ">
                Deployment key
              </TableHead>
              <TableHead>Created date & time</TableHead>
              <TableHead>Healthy replicas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="">Service endpoint</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={task.id} className="text-16-24 font-medium">
              <TableCell className="font-medium text-white">
                {task.id}
              </TableCell>
              <TableCell>{dataInDays}</TableCell>
              <TableCell>{task?.replicas || 0}</TableCell>
              <TableCell
                className={TASK_STATUS_CLASS[taskData?.status?.toLowerCase()]}
              >
                {(isLoading || taskData.status != "Running") && <Loader2Icon />}
                {taskData?.status}
              </TableCell>
              <TableCell className="overflow-hidden">
                {taskData && (
                  <Link
                    href={taskData?.endpoint}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline"
                  >
                    {taskData?.endpoint}
                  </Link>
                )}
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default TaskIdDetails
