import publicProvider from "@/lib/utils/publicProvider"
import STAKING_ABI from "@/public/abi/unmarshalStaking.json"
import { ReadContractTypes } from "@/types"
import { formatEther } from "viem"
// const readStakingContractData = async (chainId: number, address: string) => {
//   let data: any = {}
//   try {
//     const client = publicProvider(chainId)
//     const stakingContract: any = { address, abi: STAKING_CONTRACT }

//     const [lastTimeRewardApplicable, rewards]: any = await Promise.all([
//       client.readContract({
//         ...stakingContract,
//         functionName: "lastTimeRewardApplicable",
//       }),
//       client.readContract({
//         ...stakingContract,
//         functionName: "rewards",
//       }),
//     ])
//     data = {
//       rewards: Number(rewards),
//       lastTimeRewardApplicable,
//     }
//   } catch (error) {
//     console.log("stakingContract error: ", error)
//   }

//   return data
// }

export const readStakingContractData = async ({
  account,
  contractAddress,
  chainId,
}: ReadContractTypes) => {
  const stakingContract: any = {
    address: contractAddress,
    abi: STAKING_ABI,
  }
  const client = publicProvider(chainId)
  try {
    const [getStakerData, getCurrentRewards]: any = await Promise.all([
      client.readContract({
        ...stakingContract,
        functionName: "stakers",
        args: [account],
      }),
      client.readContract({
        ...stakingContract,
        functionName: "pendingRewards",
        args: [account],
      }),
    ])

    const [stakedAmount] = getStakerData

    return {
      stakedAmount: formatEther(stakedAmount),
      currentRewards: formatEther(getCurrentRewards),
    }
  } catch (error) {
    console.log("stakingContract error: ", error)
    return {
      stakedAmount: 0,
      currentRewards: 0,
    }
  }
}
export default readStakingContractData
