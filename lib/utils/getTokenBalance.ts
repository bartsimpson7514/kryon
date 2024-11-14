"use client"
import { getBalance } from "@wagmi/core"
import providerInstance from "./providerConfigInstance"
import { formatEther } from "viem"

const getTokenBalance = async ({ chainId, tokenAddress, account }: any) => {
  const balance = await getBalance(providerInstance(chainId), {
    address: account,
    token: tokenAddress,
  })

  return Number(formatEther(balance?.value)) || 0
}

export default getTokenBalance
