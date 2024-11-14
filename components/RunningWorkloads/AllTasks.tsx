import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TASK_STATUS_CLASS } from "@/constants"
import { shortenAddress } from "@/lib/utils"
import { useGetAllTasksQuery } from "@/redux/features/apiSlice"
import isEmpty from "lodash.isempty"
import Link from "next/link"
import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

const AllTasks = ({
  categoryName,
  jwtToken,
  workloadId,
}: {
  categoryName: string
  jwtToken: string
  workloadId: string
}) => {
  const { data: allUserTasks } = useGetAllTasksQuery({
    id: workloadId,
    jwtToken,
  })

  const allTasks = isEmpty(allUserTasks)
    ? []
    : Object.values(allUserTasks.entities)

  return (
    <div className=" space-y-4">
      <p className="text-24 font-medium leading-8 !text-white-v-50">
        My active workloads
      </p>
      <div className=" overflow-hidden rounded-lg border border-white-v-16">
        <ScrollArea className="max-h-[500px] !overflow-auto">
          <Table className=" relative ">
            <TableHeader className="sticky top-0 rounded-t-xl">
              <TableRow className=" w-full !border-0 bg-white-v-008  text-16-24 font-medium !text-white-v-600 backdrop-blur-[0s2px]">
                <TableHead className=" w-64 rounded-tl-lg !text-white-v-600">
                  Task ID
                </TableHead>
                <TableHead className="!text-white-v-600">Status</TableHead>
                <TableHead className="rounded-tr-lg text-right !text-white-v-600">
                  Role
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTasks.length > 0 ? (
                allTasks.map((task: any) => (
                  // <TableRow  key={task.id} className="text-16-24 font-medium">
                  <Link
                    key={task.id}
                    className=" table-row w-full border-b border-white-v-16 text-16-24 font-medium transition-colors hover:bg-white-v-16  dark:hover:bg-white-v-16 "
                    href={`/tasks/${categoryName}/${task.workload_id}/${task.id}?category=${task?.metadata?.payment_details?.category}`}
                  >
                    <TableCell className="font-medium text-white">
                      {shortenAddress(task?.id, 8)?.toUpperCase()}
                    </TableCell>
                    <TableCell
                      className={TASK_STATUS_CLASS[task?.status?.toLowerCase()]}
                    >
                      {task.status}
                    </TableCell>
                    <TableCell className="text-right">
                      {task?.metadata?.payment_details?.category}
                    </TableCell>
                  </Link>
                  // </TableRow>
                ))
              ) : (
                <TableRow col-span="3" className="text-16-24 font-medium">
                  <td className="w-full p-3 text-16 font-medium text-white-v-600">
                    No Active tasks
                  </td>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}

export default AllTasks
