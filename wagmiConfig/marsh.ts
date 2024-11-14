import { CHAIN_ID, STAKING_ADDRESS } from "@/constants/web3Constants"
import { Chain } from "viem"

export const unmarshalTestnet = {
  id: 11224,
  name: "Unmarshal Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Unmarshal Token",
    symbol: "MARSH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.unmarshal.ai"],
      webSocket: ["wss://rpc-testnet.unmarshal.ai"],
    },
    public: {
      http: ["https://rpc-testnet.unmarshal.ai"],
      webSocket: ["wss://rpc-testnet.unmarshal.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "Unmarshal Explorer",
      url: "https://testnet.unmarshal.ai",
    },
  },
  contracts: {
    multicall3: {
      address: STAKING_ADDRESS[CHAIN_ID.MARSH_TESTNET] as `0x${string}`,
      blockCreated: 248547,
    },
  },
  testnet: true,
} as const satisfies Chain

export default unmarshalTestnet
