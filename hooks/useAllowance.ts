// hooks/useContractRead.ts
import { useQuery } from "@tanstack/react-query"
import ERC20_ABI from "@/public/abi/ERC20.json"
import { useAccount } from "wagmi"
import publicProvider from "@/lib/utils/publicProvider"
import { formatEther } from "viem"

const useAllowanceRead = ({
  account,
  tokenAddress,
  chainId,
  allowanceTarget,
}: any) => {
  const { address } = useAccount()

  const getAllowanceData = async () => {
    const tokenContract: any = {
      address: tokenAddress?.toLowerCase(),
      abi: ERC20_ABI,
    }
    const client = publicProvider(chainId)

    try {
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

  return useQuery({
    queryKey: [address?.toLowerCase()],
    queryFn: getAllowanceData,
  })
}

export default useAllowanceRead
