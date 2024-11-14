import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Badge } from "../ui/badge"

const AIUserStats = ({ userStats }: any) => {
  return (
    <Table className="">
      <TableHeader>
        <TableRow className="!border-0 !text-white-v-600 hover:!bg-white-v-008">
          <TableHead className="w-[100px] !text-white-v-600">
            User name
          </TableHead>
          <TableHead className="!text-white-v-600">VM Type</TableHead>
          <TableHead className="!text-white-v-600">Port</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userStats &&
          userStats?.length &&
          userStats.map((stat: any) => (
            <TableRow
              key={stat.user}
              className="!border-0 text-16 font-medium text-white hover:!bg-white-v-008"
            >
              <TableCell className="w-2/5 font-medium">{stat.user}</TableCell>
              <TableCell>
                <Badge
                  variant={"outline"}
                  className="!rounded-md !border-0 !bg-white-v-008 text-16 font-medium"
                >
                  {stat.metadata?.deployment_config?.vm_type}
                </Badge>
              </TableCell>
              <TableCell>{stat.metadata?.deployment_config?.port}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default AIUserStats
