import { rpcNetworks } from "@/wagmiConfig/chainConfig"
import { http, createConfig } from "@wagmi/core"

const providerInstance = (chainId: number) => {
  const network = rpcNetworks.filter(
    (network: { id: number }) => network.id == chainId,
  )[0]
  const providerConfigInstance = createConfig({
    chains: [network],
    transports: {
      [network.id]: http(),
    },
  })

  return providerConfigInstance
}

export default providerInstance
