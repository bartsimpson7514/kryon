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
import { formatDateInDays, getRunningTime } from "@/lib/utils"
import isEmpty from "lodash.isempty"
const TaskIdDetails = ({ task }: { task: any }) => {
  if (isEmpty(task)) {
    return <></>
  }
  const { stakerInfo } = task
  const dataInDays = formatDateInDays(task?.created_at)

  return (
    <div className=" w-full overflow-hidden rounded-lg border border-white-v-16 backdrop-blur-sm">
      <Table className=" relative w-full">
        <TableHeader className=" rounded-t-xl">
          <TableRow className=" w-full  !border-0 bg-white-v-008 text-16-24 font-medium  text-white-v-600">
            <TableHead className=" w-1/3 rounded-tl-lg !text-white-v-600">
              Task ID
            </TableHead>
            <TableHead className="!text-white-v-600">
              Start date & time
            </TableHead>
            <TableHead className="!text-white-v-600">Status</TableHead>
            <TableHead className="!text-white-v-600">Running time</TableHead>
            <TableHead className="">Staked amount</TableHead>
            <TableHead className="rounded-tr-lg text-right !text-white-v-600">
              Current rewards
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {task?.map((task: any) => ( */}
          <TableRow key={task.id} className="text-16-24 font-medium">
            <TableCell className="font-medium text-white">{task.id}</TableCell>
            <TableCell>{dataInDays}</TableCell>
            <TableCell
              className={TASK_STATUS_CLASS[task?.status?.toLowerCase()]}
            >
              {task.status}
            </TableCell>
            <TableCell>{getRunningTime(task?.created_at)}</TableCell>
            <TableCell>{stakerInfo?.stakedAmount}</TableCell>

            <TableCell className="text-right">
              {Number(stakerInfo?.currentRewards).toFixed(3)}
            </TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </div>
  )
}

export default TaskIdDetails
