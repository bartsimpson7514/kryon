// hooks/useContractRead.ts
import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"
import publicProvider from "@/lib/utils/publicProvider"

interface TxnHashStatusTypes {
  txnHash: `0x${string}`
  chainId: any
}
const useTxnHashStatus = ({ txnHash }: TxnHashStatusTypes) => {
  const { address, chainId } = useAccount()

  const getTransactionHashStatus = async () => {
    const client = publicProvider(chainId as number)

    try {
      const transactionStatus = await client.waitForTransactionReceipt({
        hash: txnHash,
      })
      console.log("useAllowanceRead -", transactionStatus)

      return transactionStatus
    } catch (error) {
      console.log("AccountContractRead error", error)

      return null
    }
  }

  return useQuery({
    queryKey: [address],
    queryFn: getTransactionHashStatus,
    retry: true,
    refetchOnMount: false,
    enabled: !!txnHash,
  })
}

export default useTxnHashStatus
