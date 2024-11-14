import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import isEmpty from "lodash.isempty"

const TaskChainDetails = ({ chainDetails }: { chainDetails: [] }) => {
  if (isEmpty(chainDetails)) {
    return <></>
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-white-v-16 backdrop-blur-[32px]">
      <Table>
        <TableHeader className=" rounded-t-xl">
          <TableRow className="w-full !border-0 bg-white-v-008 text-16-24 font-medium  !text-white-v-600">
            <TableHead className="rounded-tl-lg !text-white-v-600">
              Chain
            </TableHead>
            <TableHead className="!text-white-v-600">Top block</TableHead>
            <TableHead className="!text-white-v-600">Top TX</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chainDetails.map((chain: any) => (
            <TableRow
              key={chain.top_block}
              className="!border-b-0 text-16-24 font-medium"
            >
              <TableCell className="font-medium text-white">
                <div className="flex items-center gap-2">
                  <img
                    src={chain?.logo}
                    alt={chain?.chain}
                    width={28}
                    height={28}
                  />
                  <span className="capitalize">{chain?.chain}</span>
                </div>
              </TableCell>
              <TableCell>{chain.top_block}</TableCell>
              <TableCell>{chain.transaction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TaskChainDetails
