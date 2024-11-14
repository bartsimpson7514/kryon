import React from "react"
import AIPaymentModal from "@/components/AIPaymentModal"
import AIRunningWorkloads from "@/components/aiRunningWorkloads"
import Image from "next/image"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

const AIWorkloadDetails = ({
  data,
  isSignedIn,
  categoryName,
  jwtToken,
}: any) => {
  const { title, description_long, logo, metadata } = data

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
        <Markdown
          className="!text-lg font-normal text-white-v-600 strong-child:!font-normal strong-child:!text-white para-child:mt-4 anchor-child:!text-[#0c93e4] anchor-child:!underline"
          remarkPlugins={[remarkGfm]}
        >
          {description_long}
        </Markdown>
        <div className="mb-12">
          {isSignedIn && <AIPaymentModal workLoadDetails={data} />}
        </div>
      </div>
      {isSignedIn && (
        <AIRunningWorkloads
          categoryName={decodeURI(categoryName) ?? ""}
          jwtToken={jwtToken}
          workloadId={data.id}
          metadata={metadata}
        />
      )}
    </div>
  )
}

export default AIWorkloadDetails
