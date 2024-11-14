// hooks/useContractRead.ts
import { useQuery } from "@tanstack/react-query"
import publicProvider from "@/lib/utils/publicProvider"

const useWaitTxnHash = ({ txnHash, chainId }: any) => {
  const getTransactionHashConfirm = async () => {
    const client = publicProvider(chainId)

    try {
      const txnHashConfirm = await client.waitForTransactionReceipt({
        hash: txnHash,
      })
      console.log("txnHashConfirm -", txnHashConfirm)

      return txnHashConfirm
    } catch (error) {
      console.log("getTransactionHashConfirm error", error)

      return undefined
    }
  }

  return useQuery({
    queryKey: [txnHash],
    queryFn: getTransactionHashConfirm,
    enabled: !!txnHash,
  })
}

export default useWaitTxnHash
