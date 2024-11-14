"use client"
import React, { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import RadioBox from "@/components/shared/RadioBox"
import ArrowExternalLinkIcon from "@/public/assets/icons/arrow-external.svg"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CheckIcon from "@/public/assets/icons/check-icon.svg"

import { Button } from "../ui/button"
import { WorkLoadDetailsType } from "@/types"
import StakeForm from "./StakeForm"
import useTokenBalance from "@/hooks/useTokenBalance"
import OrderSummary from "./OrderSummary"
import { useAccount } from "wagmi"
import PaymentStakeAction from "./PaymentStakeAction"
import { useUser } from "@clerk/nextjs"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks"
import { setTransactionStatus } from "@/redux/features/workloadsSlice"
import Link from "next/link"
import { useGetAllTasksQuery } from "@/redux/features/apiSlice"
import isEmpty from "lodash.isempty"

interface PaymentModalTypes {
  workLoadDetails: WorkLoadDetailsType
  jwtToken: string
}

const PaymentModal = ({ workLoadDetails, jwtToken }: PaymentModalTypes) => {
  const { isSignedIn } = useUser()
  const dispatch = useAppDispatch()
  const { payment_config: paymentConfig } = workLoadDetails.metadata
  const { txnStatus } = useAppSelector((state) => state.workloadsSlice)
  const { isConnected } = useAccount()
  const { category, stake_config } = workLoadDetails.metadata.payment_config
  const [stakeValue, setStakeValue] = useState<number>(0)

  const [selectedCategory, setSelectedCategory] = useState(category[0])
  const [runSelf, setRunSelf] = useState(false)
  const { data: tokenBalance } = useTokenBalance({
    tokenAddress: stake_config?.token_address,
  })

  const { data: allUserTasks } = useGetAllTasksQuery({
    id: workLoadDetails.id,
    jwtToken,
  })

  const allTasks = isEmpty(allUserTasks)
    ? []
    : Object.values(allUserTasks.entities)

  const disableLaunchButton = allTasks.some((task: any) => {
    return task?.status?.toLowerCase() == "running"
  })

  const handleSwitch = () => {
    setRunSelf((prev) => {
      return !prev
    })
  }

  const updateStakeValue = (stakeValue: number) => {
    setStakeValue(stakeValue)
  }
  const handleSelectCategory = (item: any) => {
    setSelectedCategory(item)
  }

  const isEnoughBalance = useMemo(() => {
    const { min } = selectedCategory.stake_config.range
    return Number(tokenBalance) > min
  }, [tokenBalance, selectedCategory])

  const nativeFee: any = useMemo(
    () =>
      Number(
        Number(selectedCategory.infra_cost) / paymentConfig.eth_price,
      ).toFixed(2),
    [paymentConfig.eth_price, selectedCategory],
  )

  const handleDialogContent = () => {
    dispatch(setTransactionStatus("idle"))
  }
  const handleClick = (e: any) => {
    return !isSignedIn ? e.preventDefault() : handleDialogContent()
  }

  return (
    !disableLaunchButton && (
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={(e) => handleClick(e)}>Launch and Earn</Button>
        </DialogTrigger>
        <DialogContent
          className=" !max-w-[608px] !gap-0 space-y-9"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {txnStatus == "success" ? (
            <DialogDescription>
              <div className=" flex flex-col items-center justify-center gap-10">
                <div className="rounded-[80px] bg-white-v-16 p-[16px]">
                  <span className=" flex h-20 w-20 items-center justify-center gap-10 rounded-[80px]  bg-white">
                    <CheckIcon className=" h-9 w-[50px] text-black" />
                  </span>
                </div>
                <h4 className=" text-center  font-nyght text-36-46 font-medium  text-white">
                  Wo-hoo! Your request has been processed successfully!
                </h4>
                <p className="text-16 font-medium text-white-v-500">
                  We’ll keep you posted on the further updates.
                </p>

                <DialogTrigger asChild>
                  <Button className="shadow-mustard250">Great, thanks</Button>
                </DialogTrigger>
              </div>
            </DialogDescription>
          ) : (
            <>
              <DialogTitle className=" text-24 font-medium text-white">
                Unmarshal Indexer
              </DialogTitle>
              <div className="flex flex-col">
                {/* <DialogDescription>
                <p className="text-16 font-medium text-white-v-600">
                  Details: {workLoadDetails.description_long}
                </p>
              </DialogDescription> */}

                <RadioBox
                  items={category}
                  selectedCategory={selectedCategory}
                  handleSelectCategory={handleSelectCategory}
                  runSelf={runSelf}
                  handleSwitch={handleSwitch}
                />
              </div>

              <div className="flex w-full justify-between">
                {isConnected && (
                  <div className="flex items-center gap-2">
                    <span className=" text-14 font-medium text-white-v-500">
                      Wallet balance:
                    </span>
                    <span className=" text-16 font-medium text-white">
                      {tokenBalance?.toLocaleString()} MARSH
                    </span>
                  </div>
                )}
                <Link
                  href="https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x2FA5dAF6Fe0708fBD63b1A7D1592577284f52256"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Badge className="ml-auto flex justify-start !border-white-v-16 !bg-transparent text-16 !text-yellow-400">
                    Buy more MARSH
                    <ArrowExternalLinkIcon />
                  </Badge>
                </Link>
              </div>

              <StakeForm
                stakeValue={stakeValue}
                callback={updateStakeValue}
                stakeDetails={selectedCategory}
                tokenBalance={tokenBalance || 0}
              />
              <div>
                <OrderSummary
                  apr={workLoadDetails?.apr}
                  stakeTokens={stakeValue}
                  nativeFee={paymentConfig.eth_price}
                  infraCost={
                    runSelf && selectedCategory?.type == "Verifier"
                      ? 0
                      : selectedCategory.infra_cost
                  }
                />
                {!isConnected || isEnoughBalance ? (
                  <></>
                ) : (
                  <p className="mt-2 text-14 text-error">
                    You don&apos;t have enough balance{" "}
                  </p>
                )}
              </div>
              <PaymentStakeAction
                nativeFee={nativeFee}
                stakeConfig={stake_config}
                isEnoughBalance={isEnoughBalance}
                stakeAmount={stakeValue}
                workLoadId={workLoadDetails.id}
                selectedCategory={selectedCategory}
                selfRunVerifier={
                  runSelf && selectedCategory?.type == "Verifier"
                }
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    )
  )
}

export default PaymentModal
