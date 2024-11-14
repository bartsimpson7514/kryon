"use client"
import React from "react"
import SearchWorkload from "./SearchWorkload"
import CategoryList from "./CategoryList"
import Workloads from "./Workloads"
import { selectWorkloadCategories } from "@/redux/features/apiSlice"
import { useAppSelector } from "@/hooks/storeHooks"
import EllipsisGradient from "@/public/assets/icons/ellipse-gradient.svg"
import WorkloadList from "./cards"
const WorkLoadPanel = () => {
  const workloadsData = useAppSelector(selectWorkloadCategories)
  const { isSearching, searchedList, searchKey } = useAppSelector(
    (state) => state.workloadsSlice.searchStatus,
  )

  return (
    <div className="relative w-full">
      <div className="workload-panel bg-noiseImages bg-covers relative z-20  min-h-[200px] w-full space-y-6 bg-no-repeat pt-9 backdrop-blur-[32px]">
        <SearchWorkload />
        <div className="flex w-full flex-wrap items-center justify-center gap-4 pt-4 xl:gap-16 ">
          {workloadsData.length > 0 ? (
            workloadsData.map((item) => (
              <CategoryList key={item.id} category={item} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      {!searchKey ? (
        <Workloads />
      ) : (
        <div className=" relative z-10 mt-12 flex flex-col items-center justify-center space-y-16">
          <h1 className=" max-w-[540px] text-center font-nyght text-36-46 font-medium">
            {isSearching
              ? "Searching...."
              : `Search results (${searchedList.length})`}
          </h1>
          <div className="container mt-10 flex flex-wrap justify-center gap-8">
            {searchedList.map((workload: any, workloadIdx: any) => (
              <WorkloadList
                key={workload.category_id + workloadIdx}
                workload={workload}
                categoryName={""}
                workloadIdx={workloadIdx}
              />
            ))}
          </div>
        </div>
      )}
      <div className=" absolute left-1/2 top-0 z-0 h-[360px] w-[360px] -translate-x-1/2 sm:h-[440px] sm:w-[440px] lg:h-[800px] lg:w-[800px]">
        <EllipsisGradient />
      </div>
    </div>
  )
}

export default WorkLoadPanel
