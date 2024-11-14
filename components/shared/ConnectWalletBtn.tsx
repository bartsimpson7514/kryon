"use client"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import React, { useEffect, useMemo } from "react"
import { Button } from "../ui/button"
import { shortenAddress } from "@/lib/utils"
import { useAccount, useSwitchChain } from "wagmi"
import Image from "next/image"
interface ConnectWalletType {
  label?: string
  showAddress?: boolean
}
const ConnectWalletBtn = ({ label, showAddress }: ConnectWalletType) => {
  const modal = useWeb3Modal()
  const { switchChain } = useSwitchChain()

  const { address, isConnecting, isConnected, chainId } = useAccount()

  const walletStatus = useMemo(() => {
    if (isConnected) return "Connected"
    if (isConnecting) return "Connecting…"
    return label ? label : "Connect Wallet"
  }, [address, isConnecting, isConnected, label])

  // Handle chain switching after connection
  useEffect(() => {
    const handleChainSwitch = async () => {
      if (isConnected && chainId !== 11224) {
        try {
          await switchChain?.({ chainId: 11224 })
        } catch (switchError: any) {
          console.log(switchError)
        }
      }
    }

    handleChainSwitch()
  }, [isConnected, chainId, switchChain])

  const handleConnect = () => {
    try {
      modal.open()
    } catch (error) {
      console.error("Error opening modal:", error)
    }
  }

  return (
    <Button
      onClick={isConnected ? () => modal.open() : handleConnect}
      type="button"
    >
      {showAddress && address ? (
        <p className="flex items-center justify-center gap-2">
          <Image
            src="/assets/icons/wallet.png"
            alt="wallet_icon"
            height={20}
            width={20}
          />
          {shortenAddress(address as `0x${string}`)}
        </p>
      ) : (
        walletStatus
      )}
    </Button>
  )
}

export default ConnectWalletBtn
