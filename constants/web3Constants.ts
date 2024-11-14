import { CHAIN_ID_TYPE } from "@/types"

export const CHAIN_ID: CHAIN_ID_TYPE = {
  MAINNET: 1,
  ETHEREUM: 1,
  BSC: 56,
  BSC_TESTNET: 97,
  MARSH_TESTNET: 11224,
  SEPOLIA: 11155111,
}

export const EXPLORER_LINK = "https://testnet.bscscan.com/tx"

export const SUPPORTED_CHAIN_IDS = [
  CHAIN_ID.BSC_TESTNET,
  CHAIN_ID.MARSH_TESTNET,
]

export const STAKING_ADDRESS: any = {
  [CHAIN_ID.MAINNET]: process.env.NEXT_PUBLIC_ETHEREUM_STAKING_ADDRESS,
  [CHAIN_ID.BSC]: process.env.NEXT_PUBLIC_BSC_STAKING_ADDRESS,
  [CHAIN_ID.BSC_TESTNET]: process.env.NEXT_PUBLIC_BSC_STAKING_ADDRESS_TESTNET,
  [CHAIN_ID.MARSH_TESTNET]:
    process.env.NEXT_PUBLIC_MARSH_STAKING_ADDRESS_TESTNET,
}

export const MARSH: any = {
  [CHAIN_ID.BSC_TESTNET]: {
    symbol: "MARSH",
    address: process.env.NEXT_PUBLIC_BSC_TESTNET_MARSH_TOKEN_ADDRESS,
    name: "Unmarshal",
    decimals: 18,
    chainId: CHAIN_ID.BSC_TESTNET,
    logoURI:
      "https://assets.coingecko.com/coins/images/14554/standard/img_circle_256x256.png?1696514237",
  },
  [CHAIN_ID.MAINNET]: {
    symbol: "MARSH",
    address: process.env.NEXT_PUBLIC_MAINNET_MARSH_TOKEN_ADDRESS,
    name: "Unmarshal",
    decimals: 18,
    chainId: CHAIN_ID.MAINNET,
    logoURI:
      "https://assets.coingecko.com/coins/images/14554/standard/img_circle_256x256.png?1696514237",
  },
  [CHAIN_ID.MARSH_TESTNET]: {
    symbol: "MARSH",
    address: process.env.NEXT_PUBLIC_MAINNET_MARSH_TOKEN_ADDRESS,
    name: "Unmarshal",
    decimals: 18,
    chainId: CHAIN_ID.MARSH_TESTNET,
    logoURI:
      "https://assets.coingecko.com/coins/images/14554/standard/img_circle_256x256.png?1696514237",
  },
}

export const CHAIN_LOGO: any = {
  ethereum: "/assets/icons/ethereum-logo.svg",
  bsc: "/assets/icons/bsc-logo.svg",
}
