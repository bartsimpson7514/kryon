import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import { rpcNetworks } from "./chainConfig"

import { cookieStorage, createStorage } from "wagmi"

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error("Project ID is not defined")

const metadata = {
  name: "Consensus Cloud",
  description: "Consensus Cloud",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [...rpcNetworks] as any,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
