"use client"
import React, { useEffect, useState } from "react"
import ModalSkeleton from "../shared/modalSkeleton"
import AllTasks from "./AllTasks"
import { useAccount } from "wagmi"
import isEmpty from "lodash.isempty"
import readStakingContractData from "@/lib/utils/readStakingContractData"

const RunningWorkload = ({
  categoryName,
  jwtToken,
  workloadId,
  metadata,
}: {
  categoryName: string
  jwtToken: string
  workloadId: string
  metadata: any
}) => {
  const { isConnected, address, chainId } = useAccount()
  const [stakerInfo, setStakerInfo] = useState<any>({})
  const { stake_config } = metadata.payment_config

  const getAccountStakedData = async () => {
    const stakerInfo = await readStakingContractData({
      account: address as any,
      contractAddress: stake_config?.contract_address,
      chainId: chainId as any,
    })

    setStakerInfo(stakerInfo)
  }
  useEffect(() => {
    if (!isEmpty(metadata) && address) {
      getAccountStakedData()
    }
  }, [metadata.payment_config, address])
  return (
    <ModalSkeleton classes="!basis-[536px] md:!mt-0">
      {isConnected && (
        <div className="space-y-4">
          <p className="text-24 font-medium leading-8">Earning stats</p>

          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2 rounded-lg border border-white-v-16 p-4">
              <p className="text-16 font-medium text-white-v-600">
                Current Staked
              </p>
              <p className="text-24 font-medium text-green-100">
                {stakerInfo?.stakedAmount}&nbsp;Marsh
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-lg border border-white-v-16 p-4">
              <p className="text-16 font-medium text-white-v-600">Rewards</p>
              <p className="text-24 font-medium">
                {isEmpty(stakerInfo)
                  ? "0.0"
                  : Number(stakerInfo?.currentRewards).toFixed(2)}
                &nbsp;Marsh
              </p>
            </div>
          </div>
        </div>
      )}
      <AllTasks
        categoryName={categoryName}
        jwtToken={jwtToken}
        workloadId={workloadId}
      />
    </ModalSkeleton>
  )
}

export default RunningWorkload
