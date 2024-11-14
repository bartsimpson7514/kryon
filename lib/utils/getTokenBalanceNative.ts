"use client"
import { getBalance } from "@wagmi/core"
import providerInstance from "./providerConfigInstance"
import { formatEther } from "viem"

const getNativeBalance = async ({ chainId, account }: any) => {
  const balance = await getBalance(providerInstance(chainId), {
    address: account,
  })

  
  return Number(formatEther(balance.value)) || 0
}

export default getNativeBalance