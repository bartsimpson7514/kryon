import { toast } from "@/components/ui/use-toast"
import { type ClassValue, clsx } from "clsx"
import ERC20_ABI from "@/public/abi/ERC20.json"
import publicProvider from "@/lib/utils/publicProvider"
import { formatEther } from "viem"
import readStakingContractData from "./utils/readStakingContractData"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const walletActionError = (error: any) => {
  console.log("onError data", error)

  const errorMessage =
    error.toString().split("Details:")[1].split("Version:")[0] ||
    "Please try again!"
  toast({
    title: "Transaction Status",
    variant: "destructive",
    description: errorMessage,
  })
}

export const getAllowanceData = async ({
  tokenAddress,
  account,
  allowanceTarget,
  chainId,
}: any) => {
  const tokenContract: any = {
    address: tokenAddress?.toLowerCase(),
    abi: ERC20_ABI,
  }
  const client = publicProvider(chainId)

  try {
    console.log(
      "useAllowanceRead tokenAddress",
      tokenAddress,
      "chainId",
      chainId,
    )
    console.log(
      "useAllowanceRead account",
      account,
      "allowanceTarget",
      allowanceTarget,
    )

    const allocations = await client.readContract({
      ...tokenContract,
      functionName: "allowance",
      args: [account?.toLowerCase(), allowanceTarget?.toLowerCase()],
    })
    console.log("useAllowanceRead -", allocations)

    return Number(formatEther(BigInt(allocations as string)))
  } catch (error) {
    console.log("AccountContractRead error", error)

    return 0
  }
}

export const getTransactionHashStatus = async ({
  chainId,
  txnHash,
}: {
  chainId: number
  txnHash: `0x${string}`
}) => {
  const client = publicProvider(chainId as number)

  try {
    const transactionStatus = await client.waitForTransactionReceipt({
      hash: txnHash,
    })
    console.log("getTransactionHashStatus -", transactionStatus)

    return transactionStatus
  } catch (error) {
    console.log("getTransactionHashStatus error", error)

    return null
  }
}
export function shortenAddress(address: string | undefined, chars = 4) {
  if (!address) return
  try {
    const parsed = address
    const addrlength = address.length
    return `${parsed.substring(0, chars)}...${parsed.substring(Math.abs(addrlength - chars))}`
  } catch (error) {
    console.log(error)
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
}

export const getAllTasksStakeData = async (data: []) => {
  const result = data.map(async (task: any) => {
    try {
      const { workload, metadata } = task
      const { payment_details } = metadata
      const { metadata: workloadData } = workload

      const chainId = workloadData.payment_config.chain_id
      const address = payment_details.wallet_address
      const stakeContractAddress =
        workloadData.payment_config.stake_config.contract_address
      const stakerInfo = await readStakingContractData({
        account: address,
        contractAddress: stakeContractAddress,
        chainId,
      })
      return {
        ...task,
        stakerInfo,
      }
    } catch (error) {
      console.log("getAllTasksStakeData - ", error)
    }

    return task
  })

  const newList = await Promise.all(result)
  return newList
}
export const utcDateFormat = (timestamp: number) =>
  new Date(timestamp * 1000).toUTCString().replace("GMT", "UTC")

export function formatDateInDays(dateString: any) {
  const date = new Date(dateString)

  // Options for the time
  const timeOptions: any = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }
  const time = date.toLocaleString("en-US", timeOptions)

  // Options for the date
  const dateOptions: any = {
    day: "numeric",
    month: "short",
  }
  const formattedDate = date.toLocaleString("en-US", dateOptions)

  return `${time}, ${formattedDate}`
}

export function getRunningTime(dateString: string) {
  const now: any = new Date()
  const pastDate: any = new Date(dateString)

  const diffInSeconds = Math.floor((now - pastDate) / 1000)

  // const seconds = diffInSeconds % 60
  const minutes = Math.floor((diffInSeconds / 60) % 60)
  const hours = Math.floor((diffInSeconds / (60 * 60)) % 24)
  const days = Math.floor(diffInSeconds / (60 * 60 * 24))

  return `${days}d ${hours}h ${minutes}m`
}

export function formatUnixTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000) // Convert to milliseconds
  const options: any = { day: "numeric", month: "short", year: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

export function formatBytes(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) return "0 Bytes"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i]
}
