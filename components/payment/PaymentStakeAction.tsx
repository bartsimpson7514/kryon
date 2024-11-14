"use client"
import React, { useCallback, useEffect, useMemo } from "react"
import { Button } from "../ui/button"
import { useAccount, useWriteContract } from "wagmi"
import Link from "next/link"
import STAKING_ABI from "@/public/abi/unmarshalStaking.json"
import { parseEther } from "viem"
import { Loader2Icon } from "lucide-react"
import { toast } from "../ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CategoriesType, StakeConfigType } from "@/types"
import { DialogTrigger } from "../ui/dialog"
import ConnectWalletBtn from "../shared/ConnectWalletBtn"
import {
  useCreateTaskMutation,
  useUpdateTaskTxHashMutation,
} from "@/redux/features/apiSlice"
import isEmpty from "lodash.isempty"
import { CHAIN_ID, STAKING_ADDRESS } from "@/constants/web3Constants"
import { useAuth } from "@clerk/nextjs"
import { AUTH_JWT_TEMPLATE } from "@/constants"
import { useAppDispatch } from "@/hooks/storeHooks"
import { setTransactionStatus } from "@/redux/features/workloadsSlice"

interface PaymentStakeTypes {
  stakeConfig: StakeConfigType
  stakeAmount: number
  nativeFee: number
  isEnoughBalance: boolean
  workLoadId: string
  selectedCategory: CategoriesType
  selfRunVerifier: boolean
}
const PaymentStakeAction = ({
  stakeConfig,
  isEnoughBalance,
  stakeAmount,
  nativeFee,
  workLoadId,
  selectedCategory,
  selfRunVerifier,
}: PaymentStakeTypes) => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { isConnected, address, chainId } = useAccount()
  const { getToken } = useAuth()

  const {
    data: stakeTxnData,
    isPending,
    writeContract,
    error: stakeWriteError,
  } = useWriteContract()
  // const { isPending: approvePending, writeContract: approveWriteContract } =
  //   useWriteContract()

  // function stringToBytes32(str: string): string {
  //   const bytes = toUtf8Bytes(str)
  //   return zeroPadBytes(bytes, 32)
  // }

  // function uuidToByte32(uuid: string): string {
  //   const cleanUuid = uuid.replace(/-/g, "")
  //   return stringToBytes32(cleanUuid)
  // }

  // const {
  //   data: allowance,
  //   isLoading: allowanceLoading,
  //   isFetching,
  //   refetch,
  // } = useAllowanceRead({
  //   account: address?.toLowerCase(),
  //   tokenAddress: stakeConfig.token_address,
  //   allowanceTarget: stakeConfig.contract_address,
  //   chainId,
  // })

  const requestData = useMemo(() => {
    return {
      workload_id: workLoadId,
      metadata: {
        payment_details: {
          wallet_address: address as `0x${string}`,
          category: selectedCategory?.type,
          infra_fee: selfRunVerifier
            ? parseEther(Number(0).toString())
            : parseEther(Number(selectedCategory?.infra_cost).toString()),
          infra_provider: selfRunVerifier ? "self" : "kryon",
          stake_details: {
            amount: parseEther(Number(stakeAmount).toString()),
          },
        },
      },
    }
  }, [address, selectedCategory, stakeAmount, workLoadId])

  const [
    createTask,
    { data: taskResponse, isLoading: taskApiLoading, isError },
  ] = useCreateTaskMutation()

  const [updateTaskTxHash] = useUpdateTaskTxHashMutation()

  // const onApproveSuccess = async (data: any) => {
  //   refetch()
  //   toast({
  //     title: "Transaction Status",
  //     description: "Your transaction has been submitted ",
  //     action: (
  //       <Button variant={"link"}>
  //         <Link
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           href={`${EXPLORER_LINK}/${data}`}
  //         >
  //           {" "}
  //           View Transaction
  //         </Link>
  //       </Button>
  //     ),
  //   })
  //   const txnConfirmStatus = await getTransactionHashStatus({
  //     chainId: Number(chainId),
  //     txnHash: data,
  //   })
  //   refetch()
  //   if (txnConfirmStatus.status == "success") {
  //     console.log("staking ")

  //     writeContract(
  //       {
  //         abi: STAKING_ABI,
  //         address: stakeConfig.contract_address,
  //         functionName: "stake",
  //         value: parseEther(Number(nativeFee).toString()),
  //         args: [
  //           uuidToByte32(taskResponse?.id),
  //           parseEther(Number(stakeAmount).toString()),
  //         ],
  //       },
  //       { onSuccess: stakeSuccess, onError },
  //     )
  //   }
  // }

  const stakeSuccess = async (data: any) => {
    try {
      await updateTaskTxHash({
        transaction_hash: data,
        taskId: taskResponse?.id,
        jwtToken: await getToken(AUTH_JWT_TEMPLATE),
      })

      dispatch(setTransactionStatus("success"))

      toast({
        title: "Transaction Status",
        description: "Your transaction has been submitted ",
        action: (
          <Button variant={"link"}>
            <Link
              target="_blank"
              href={`https://testnet.unmarshal.ai/tx/${data}`}
            >
              {" "}
              View Transaction
            </Link>
          </Button>
        ),
      })
    } catch (err) {
      console.log("updateTaskTxHash error: ", err)
    }
  }

  const onError = (error: any) => {
    console.log("onerror txn ", error)
    const errorMessage =
      error.toString().split("Details:")[1].split("Version:")[0] ||
      "Please try again!"
    toast({
      title: "Transaction Status",
      variant: "destructive",
      description: errorMessage,
      action: <></>,
    })
  }

  // const handleStakeEvent = useCallback(async () => {
  //   if (chainId && address) {
  //     const value = BigInt(stakeAmount)

  //     // if (parseEther(`${allowance || 0}`) < value) {
  //     if (Number(allowance) < stakeAmount) {
  //       approveWriteContract(
  //         {
  //           abi: ERC20_ABI,
  //           address: stakeConfig.token_address,
  //           functionName: "approve",
  //           args: [stakeConfig.contract_address, parseEther(value.toString())],
  //         },
  //         { onSuccess: onApproveSuccess, onError },
  //       )
  //     } else {
  //       writeContract(
  //         {
  //           abi: STAKING_ABI,
  //           address: stakeConfig.contract_address,
  //           functionName: "stake",
  //           value: parseEther(Number(nativeFee).toString()),
  //           args: [
  //             uuidToByte32(taskResponse?.id),
  //             parseEther(Number(stakeAmount).toString()),
  //           ],
  //         },
  //         { onSuccess: stakeSuccess, onError },
  //       )
  //     }
  //   }
  // }, [
  //   allowance,
  //   stakeConfig,
  //   taskResponse,
  //   nativeFee,
  //   chainId,
  //   address,
  //   onApproveSuccess,
  //   approveWriteContract,
  //   stakeAmount,
  //   onError,
  // ])

  const handleNativeStake = useCallback(async () => {
    const value = BigInt(stakeAmount)
    if (!chainId || !address) {
      console.error("Wallet not connected")
      return
    }

    try {
      const infraFees = selfRunVerifier ? 0 : nativeFee
      const stakeAmountWei =
        parseEther(value.toString()) + parseEther(Number(infraFees).toString())

      console.log(STAKING_ADDRESS[CHAIN_ID.MARSH_TESTNET])

      // For native token staking, we just need to send the value directly
      writeContract(
        {
          abi: STAKING_ABI,
          address: STAKING_ADDRESS[CHAIN_ID.MARSH_TESTNET] as `0x${string}`,
          functionName: "stake",
          value: stakeAmountWei, // Send the stake amount as value
        },
        {
          onSuccess: stakeSuccess,
          onError: (error) => {
            console.error("Staking failed:", error)
            onError(error)
          },
        },
      )
    } catch (error) {
      console.error("Error preparing stake transaction:", error)
      onError(error)
    }
  }, [chainId, address, stakeAmount, stakeConfig, stakeSuccess, onError])

  const mutation = useMutation({
    mutationFn: handleNativeStake,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [address] })
    },
  })

  useEffect(() => {
    if (!isEmpty(taskResponse) && !isError) {
      console.log("taskResponse", taskResponse.id)
      mutation.mutate()
    }
  }, [taskResponse, isError])

  useEffect(() => {
    console.log("stakeTxnData hash", stakeTxnData)
    console.log("stakeTxnData stakeWriteError", stakeWriteError)
  }, [stakeTxnData, stakeWriteError])

  return (
    <div className="flex w-full flex-col items-start justify-start gap-1.5">
      <div className="flex gap-3 self-end">
        <DialogTrigger asChild>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </DialogTrigger>
        {isConnected && isEnoughBalance ? (
          <Button
            disabled={
              isPending || taskApiLoading
              // isFetching ||
              // allowanceLoading ||
              // approvePending
            }
            onClick={async () => {
              createTask({
                createTaskRequestData: requestData,
                jwtToken: await getToken(AUTH_JWT_TEMPLATE),
              })
            }}
          >
            {isPending || taskApiLoading ? (
              // isFetching ||
              // allowanceLoading ||
              // approvePending
              <div className="flex items-center gap-1.5">
                <Loader2Icon className=" h-5 w-4 animate-spin" />
                {/* <span>{approvePending ? "approving..." : "processing..."}</span> */}
                <span>processing...</span>
              </div>
            ) : (
              "Pay"
            )}
          </Button>
        ) : (
          <ConnectWalletBtn label="Connect wallet & Pay" />
        )}
      </div>
    </div>
  )
}

export default PaymentStakeAction
