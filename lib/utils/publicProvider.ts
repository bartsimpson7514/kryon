import { rpcNetworks } from "@/wagmiConfig/chainConfig"
import { createPublicClient, http } from "viem"

const publicProvider = (chainId: number) => {
  const network = rpcNetworks.filter((network) => network.id == chainId)[0]
  const publicClient = createPublicClient({
    chain: network,
    transport: http("https://rpc-testnet.unmarshal.ai"),
  })

  return publicClient
}
export default publicProvider
