import { SUPPORTED_CHAIN_IDS } from "@/constants/web3Constants"
import { mainnet, bsc, bscTestnet } from "wagmi/chains"
import {unmarshalTestnet } from "./marsh"

const sepolia: any = {
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532,
    },
    ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    ensUniversalResolver: {
      address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
      blockCreated: 5_317_080,
    },
  },
  testnet: true,
}

const rpcNetworks = [mainnet, sepolia, bsc, bscTestnet, unmarshalTestnet]

const CHAINS: object[] = rpcNetworks.filter((item) =>
  SUPPORTED_CHAIN_IDS.includes(item.id),
)
export { rpcNetworks, CHAINS }
