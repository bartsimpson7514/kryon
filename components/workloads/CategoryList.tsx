import { cn } from "@/lib/utils"
import React, { useCallback, useMemo } from "react"
import AiWorkloadsIcon from "@/public/assets/icons/ai-workloads.svg"
import BlockchainValidationIcon from "@/public/assets/icons/blockchain-validation.svg"
import CommunityProjectsIcon from "@/public/assets/icons/community-projects.svg"
import CustomWorkloadsIcon from "@/public/assets/icons/custom-workloads.svg"
import DecentralizedStorageIcons from "@/public/assets/icons/decentralized-storage.svg"
import Web3ServicesIcon from "@/public/assets/icons/web3-services.svg"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks"
import {
  resetSearchStatus,
  setCategoryId,
} from "@/redux/features/workloadsSlice"
import Link from "next/link"
interface WorkloadListTypes {
  category: { [key: string]: any; name: string; id: string }
}

const CategoryList = ({ category }: WorkloadListTypes) => {
  const { name, id } = category
  const { selectedCategoryId, searchStatus } = useAppSelector(
    (state) => state.workloadsSlice,
  )

  const dispatch = useAppDispatch()

  const categoriesIcon: any = {
    "ai-workloads": <AiWorkloadsIcon />,
    "blockchain-validation": <BlockchainValidationIcon />,
    "community-projects": <CommunityProjectsIcon />,
    "custom-workloads": <CustomWorkloadsIcon />,
    "decentralized-storage": <DecentralizedStorageIcons />,
    "web3-services": <Web3ServicesIcon />,
  }
  const activeCategory = useMemo(
    () =>
      !searchStatus.searchKey &&
      id?.toLowerCase() == selectedCategoryId?.toLowerCase(),
    [selectedCategoryId, category, id, searchStatus],
  )

  const handleCategoryClick = useCallback(() => {
    dispatch(resetSearchStatus())
    dispatch(setCategoryId({ categoryId: id }))
  }, [id, dispatch])
  return (
    <Link
      href={`/workloads/${name}`}
      className="group flex flex-col items-center justify-center gap-2 transition-all duration-300 "
      onClick={handleCategoryClick}
    >
      <span
        className={cn(
          activeCategory
            ? "bg-white text-[#101010]"
            : "bg-white-v-16 text-white-v-600",
          "flex h-10 w-10 items-center justify-center rounded-lg px-[3px] py-[1px] transition-all duration-300 group-hover:bg-white group-hover:text-[#101010]",
        )}
      >
        {categoriesIcon[name.replace(" ", "-").toLowerCase()]}
      </span>
      <p className=" text-center text-16 font-medium text-white-v-600 transition-colors group-hover:text-white">
        {name}
      </p>
      <span
        className={cn(
          activeCategory ? "animate-fadeIn " : " opacity-0",
          " h-[2px] w-14 bg-white ",
        )}
      />
    </Link>
  )
}

export default CategoryList
