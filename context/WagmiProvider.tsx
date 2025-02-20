"use client"

import React, { ReactNode } from "react"
import { config, projectId } from "@/wagmiConfig"

import { createWeb3Modal } from "@web3modal/wagmi/react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { State, WagmiProvider } from "wagmi"

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error("Project ID is not defined")

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  themeMode: "dark",

  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
})

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
