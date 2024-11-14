import { ReactSVGElement } from "react"

export interface NavLinks {
  [x: string]: string | StaticImport
  route: string
  label: string
}

export interface ParamsProps {
  params: { id: string }
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined }
}

export interface URLProps {
  params: { id: string }
  searchParams: { [key: string]: string | undefined }
}

export interface TokenProps {
  name: string
  chainId: number | string
  symbol: string
  decimals: number
  logoUri?: string
}
export interface SocialLinkProps {
  url: string
  name: string
}

export type SOCIALTYPE =
  | "twitter"
  | "telegram"
  | "website"
  | "github"
  | "discord"
  | "youtube"

export interface IDOSteps {
  name: string
  description: string
  href: string
  status: string
  linkText: string
  imageUrl: string
  darkImageUrl: string
}

export interface FeaturesPropsType {
  name: string
  description: string
  icon: object | ReactSVGElement | string | any
}

export interface TicketAllocation extends React.HTMLAttributes<HTMLDivElement> {
  tokenSymbol: string
  publicPrice: number
  pricePerTicket: number
  numberOfTickets?: number
}

export interface CHAIN_ID_TYPE {
  ETHEREUM: number
  MAINNET: number
  BSC: number
  BSC_TESTNET: number
  SEPOLIA: number
  MARSH_TESTNET: number
}

export interface ReadAllowanceTypes {
  account: `0x${string}`
  contractAddress: string
  chainId: number
  allowanceTarget: `0x${string}`
}

export interface TokenType {
  address: `0x${string}`
  decimal: number
  symbol: string
  price: number
  [key: string]: any
}
export interface CategoriesType {
  infra_cost: number | string
  stake_config: {
    range: {
      min: number
      max: number
    }
  }
  type: string
  [key: string]: any
}

export interface CreateTaskRequest {
  workload_id: string
  metadata: {
    payment_details: {
      wallet_address: `0x${string}`
      category?: string | "Creator" | "Operator" | "Verifier"
      infra_fee: bigint
      stake_details?: {
        amount: bigint
      }
    }
    deployment_config?: {
      image: string
      vm_type: string
      port: string
    }
  }
}
export interface GetTaskByIdRequest {
  id: string
  jwtToken: string
}
export interface putTaskTxHashRequest {
  transaction_hash: string
}
export interface StakeConfigType {
  token_address: `0x${string}`
  contract_address: `0x${string}`
  decimal: number
  symbol: string
}

interface PaymentConfigTypes {
  eth_price: number
  category: CategoriesType[]
  stake_config: StakeConfigType
  chain_id: number
  rpc_url: string
  to_address: `0x${string}`
}
export interface WorkLoadDetailsType {
  id: string
  created_at: string
  category_id: string
  title: string
  description: string
  description_long: string
  status: string | "Live"
  start_time: string
  tags: string[]
  apr: any
  logo: string
  popularity: string
  metadata: {
    payment_config: PaymentConfigTypes
  }
  stats: []
}
export type workloadId = string

export interface ReadContractTypes {
  account: string
  contractAddress: string
  chainId: number
}
