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

const IndexerUserStats = ({ userStats, apr }: any) => {
  return (
    <Table className="">
      <TableHeader>
        <TableRow className="!border-0 !text-white-v-600 hover:!bg-white-v-008">
          <TableHead className="w-[100px] !text-white-v-600">
            Wallet Address
          </TableHead>
          <TableHead className="!text-white-v-600">User type</TableHead>
          <TableHead className="!text-white-v-600">MARSH Staked</TableHead>
          <TableHead className="!text-white-v-600">Rewards</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userStats &&
          userStats?.length &&
          userStats.map((stat: any, index: number) => (
            <TableRow
              key={stat.user + index}
              className="!border-0 text-16 font-medium text-white hover:!bg-white-v-008"
            >
              <TableCell className="w-2/5 font-medium">
                {stat.metadata?.payment_details?.wallet_address &&
                  `${stat.metadata.payment_details.wallet_address.slice(0, 5)}...${stat.metadata.payment_details.wallet_address.slice(-5)}`}
              </TableCell>
              <TableCell>
                <Badge
                  variant={"outline"}
                  className="!rounded-md !border-0 !bg-white-v-008 text-16 font-medium"
                >
                  {stat.metadata?.payment_details?.category}
                </Badge>
              </TableCell>
              <TableCell>
                {Number(
                  stat.metadata?.payment_details?.stake_details?.amount / 1e18,
                ).toLocaleString()}{" "}
                MARSH
              </TableCell>
              <TableCell>
                {Number(
                  ((stat.metadata?.payment_details?.stake_details?.amount /
                    1e18) *
                    apr || 0) / 100,
                ).toLocaleString()}{" "}
                MARSH
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default IndexerUserStats
