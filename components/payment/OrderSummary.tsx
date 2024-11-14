import React from "react"
interface OrderSummaryType {
  // token: TokenType
  apr: number
  stakeTokens: number
  nativeFee: number
  infraCost: number | string
  // chainFeesDetails: { fee: number; symbol: string }
}
const OrderSummary = ({
  apr,
  infraCost,
  stakeTokens,
  nativeFee,
}: OrderSummaryType) => {
  return (
    <div className=" ">
      <h4 className=" mb-3 text-16-24 font-medium text-white-v-600">
        Order summary
      </h4>
      <div className=" flex w-full flex-col gap-2 rounded-lg border border-dashed border-white-v-03 p-4">
        <div className="flex items-center justify-between">
          <span className="text-16-24 font-medium text-white-v-600">
            Number of marsh put in staking contract
          </span>
          <span className="text-16-24 font-medium text-white-v-600 ">
            {stakeTokens} MARSH
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-16-24 font-medium text-white-v-600">
            Infra fees
          </span>
          <span className="text-16-24 font-medium text-white-v-600 ">
            {Number(Number(infraCost) / nativeFee).toFixed(2)} MARSH
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-16-24 font-medium text-white-v-600">
            Potential Returns
          </span>
          <span className="text-16-24 font-medium text-white-v-600 ">
            {Number((stakeTokens * (apr || 0)) / 100)} MARSH ({apr || ""}% APR)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-16-24 font-medium text-white">
            Total (to pay)
          </span>
          <span className="text-16-24 font-medium text-white ">
            {stakeTokens} MARSH +{" "}
            {Number(Number(infraCost) / nativeFee).toFixed(2)} MARSH
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
