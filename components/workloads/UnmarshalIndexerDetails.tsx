import React from "react"
import { Badge } from "@/components/ui/badge"
import IndexerUserStats from "@/components/workloads/indexerUserStats"
import PaymentModal from "@/components/payment"
import RunningWorkloads from "@/components/RunningWorkloads"
import Image from "next/image"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const UnmarshalIndexerDetails = ({
  data,
  users,
  isSignedIn,
  categoryName,
  jwtToken,
}: any) => {
  const { title, description_long, apr, logo, metadata } = data

  return (
    <div className="flex flex-wrap justify-between gap-6">
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
        <Badge
          className="!inline-flex !border !border-white-v-24"
          variant="outline"
        >
          <span>Expected APR {apr}%</span>
        </Badge>
        <Markdown
          className="!text-lg font-normal text-white-v-600 strong-child:!font-normal strong-child:!text-white para-child:mt-4 anchor-child:!text-[#0c93e4] anchor-child:!underline"
          remarkPlugins={[remarkGfm]}
        >
          {description_long}
        </Markdown>
        <div className="mb-12">
          {isSignedIn && (
            <PaymentModal workLoadDetails={data} jwtToken={jwtToken} />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col rounded-2xl border border-white-v-16 p-6 backdrop-blur-[32px]">
        <p className="mb-8 text-24">Top 5 Users</p>
        <IndexerUserStats userStats={users} apr={apr} />
      </div>
      {isSignedIn && (
        <RunningWorkloads
          categoryName={decodeURI(categoryName) ?? ""}
          jwtToken={jwtToken}
          workloadId={data.id}
          metadata={metadata}
        />
      )}
    </div>
  )
}

export default UnmarshalIndexerDetails
