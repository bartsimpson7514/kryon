import React from "react"
import Image from "next/image"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ChevronRightIcon, ChevronUpIcon } from "lucide-react"

interface ActivityData {
  TaskIndex: number
  QuorumNumbers: string
  QuorumThresholdPercentage: number
  TaskCreatedBlock: number
  NumberToBeSquared: number
  ReferenceTaskIndex: number
  NumberSquared: number
  TaskResponsedBlock: number
  HashOfNonSigners: string
}

const generateDummyData = () => {
  const dummyData = []
  for (let i = 0; i < 2; i++) {
    dummyData.push({
      TaskIndex: i,
      QuorumNumbers: `0x00`,
      QuorumThresholdPercentage: 100,
      TaskCreatedBlock: 2325893 + i * 2,
      NumberToBeSquared: i,
      ReferenceTaskIndex: i,
      NumberSquared: i * i,
      TaskResponsedBlock: 2325893 + i * 2 + 1,
      HashOfNonSigners: "0x1016c....e6e",
    })
  }
  return dummyData
}

const activityData = generateDummyData()

const ActivityTable = ({ activities }: { activities: ActivityData[] }) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const handleAccordionToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col rounded-2xl border border-white-v-16 p-6 backdrop-blur-[32px]">
      <p className="mb-8 text-24">AVS Activities</p>
      <Table className="rounded-lg border-0 border-white-v-16 p-6 backdrop-blur-[32px]">
        <TableHeader>
          <TableRow className="!border-1 !text-white-v-600 hover:!bg-white-v-008">
            <TableHead></TableHead>
            <TableHead>Task Index</TableHead>
            <TableHead>Quorum Numbers</TableHead>
            <TableHead>Threshold (%)</TableHead>
            <TableHead>Created Block</TableHead>
            <TableHead>Number to be Squared</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, index) => (
            <React.Fragment key={index}>
              <TableRow className="cursor-pointer !border-0 text-16 font-medium text-white hover:!bg-white-v-008">
                <TableCell className="text-center">
                  {activeIndex === index ? (
                    <ChevronUpIcon
                      onClick={() => handleAccordionToggle(index)}
                      className="h-5 w-5 text-yellow-400"
                    />
                  ) : (
                    <ChevronRightIcon
                      onClick={() => handleAccordionToggle(index)}
                      className="h-5 w-5 text-yellow-400"
                    />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {activity.TaskIndex}
                </TableCell>
                <TableCell className="text-center">
                  {activity.QuorumNumbers}
                </TableCell>
                <TableCell className="text-center">
                  {activity.QuorumThresholdPercentage}%
                </TableCell>
                <TableCell className="text-center">
                  {activity.TaskCreatedBlock}
                </TableCell>
                <TableCell className="text-center">
                  {activity.NumberToBeSquared.toString()}
                </TableCell>
              </TableRow>
              {activeIndex === index && (
                <TableRow className="!border-0 text-16 font-medium text-white hover:!bg-white-v-008">
                  <TableCell colSpan={6} className="p-0">
                    <div className="rounded-lg border border-white-v-16 p-4 backdrop-blur-[32px]">
                      <p>Task Details</p>
                      <Table className="w-full">
                        <TableBody>
                          <TableRow className="!border-1 !text-white-v-600 hover:!bg-white-v-008">
                            <TableHead>Reference Task Index</TableHead>
                            <TableHead>Number Squared</TableHead>
                            <TableHead>Task Response Block</TableHead>
                            <TableHead>Hash Of Non-Signers</TableHead>
                          </TableRow>
                          <TableRow className="!border-0 text-16 font-medium text-white hover:!bg-white-v-008">
                            <TableCell className="text-center">
                              {activity.ReferenceTaskIndex}
                            </TableCell>
                            <TableCell className="text-center">
                              {activity.NumberSquared.toString()}
                            </TableCell>
                            <TableCell className="text-center">
                              {activity.TaskResponsedBlock}
                            </TableCell>
                            <TableCell className="text-center">
                              {activity.HashOfNonSigners}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const MetricsTable = () => {
  return (
    <div className="rounded-2xl border border-white-v-16 p-6 backdrop-blur-[32px]">
      <p className="mb-8 text-24">AVS stats</p>
      <div className="flex flex-col rounded-lg">
        <Table className="">
          <TableHeader>
            <TableRow className="!border-1 !text-white-v-600 hover:!bg-white-v-008">
              <TableHead className="!text-white-v-600">
                Total Operators
              </TableHead>
              <TableHead className="!text-white-v-600">Total Stakers</TableHead>
              <TableHead className="!text-white-v-600">
                Total ETH Value Restaked
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="!border-0 text-16 font-medium text-white hover:!bg-white-v-008">
              <TableCell className="text-left">1</TableCell>
              <TableCell className="text-left">1</TableCell>
              <TableCell className="text-center">1 ETH</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const OperatorsTable = () => {
  return (
    <div className="rounded-2xl border border-white-v-16 p-6 backdrop-blur-[32px]">
      <p className="mb-8 text-24">
        Delegate to one of these operators to restake your assets
      </p>
      <div className="flex flex-col rounded-lg">
        <Table className="">
          <TableHeader>
            <TableRow className="!border-1 !text-white-v-600 hover:!bg-white-v-008">
              <TableHead className="!text-white-v-600">Operators</TableHead>
              <TableHead className="!text-white-v-600">Stakers</TableHead>
              <TableHead className="!text-white-v-600">
                Total Value Restaked
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="!border-0 text-16 font-medium text-white hover:!bg-white-v-008">
              <TableCell className="text-left text-yellow-400">
                0x764Eb...26D8A
              </TableCell>
              <TableCell className="text-left">1</TableCell>
              <TableCell className="text-center">1 ETH</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const AVSDetails = ({ data }: any) => {
  // console.log("here", data)
  const { title, description_long, logo } = data

  return (
    <div className="flex justify-between space-x-10">
      <div className="flex flex-col items-start gap-8 xl:basis-[720px]">
        <div className="flex items-center gap-5">
          <Image
            src={logo}
            alt={title}
            width="80"
            height="80"
            className="backdrop-blur-[32px]"
          />
          <p className="font-nyght text-[40px] leading-tight text-white">
            {title}
          </p>
        </div>
        <Markdown
          className="!text-lg font-normal text-white-v-600 strong-child:!font-normal strong-child:!text-white para-child:mt-4 anchor-child:!text-[#0c93e4] anchor-child:!underline"
          remarkPlugins={[remarkGfm]}
        >
          {description_long}
        </Markdown>
        <ActivityTable activities={activityData} />
      </div>
      <div>
        {" "}
        {/* Adjust width as needed */}
        <MetricsTable />
        <br />
        <OperatorsTable />
      </div>
    </div>
  )
}
export default AVSDetails
