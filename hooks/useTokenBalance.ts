// hooks/useContractRead.ts
import { skipToken, useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import getTokenBalance from "@/lib/utils/getTokenBalance"
import { useMemo } from "react"
import getNativeBalance from "@/lib/utils/getTokenBalanceNative"

interface TokenBalanceTypes {
  tokenAddress: `0x${string}` | string | undefined
}
const useTokenBalance = ({ tokenAddress }: TokenBalanceTypes) => {
  const { address, chainId, isReconnecting } = useAccount()
  const isArgs = useMemo(
    () => (address && chainId && tokenAddress ? true : false),
    [address, chainId, tokenAddress, isReconnecting],
  )

  return useQuery({
    queryKey: [address, tokenAddress],
    queryFn: isArgs
      ? () => getNativeBalance({ chainId, tokenAddress, account: address })
      : skipToken,
    retry: true,
    refetchOnMount: true,
    enabled: isArgs,
  })
}

export default useTokenBalance
