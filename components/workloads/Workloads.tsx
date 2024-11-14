import React from "react"
import WorkloadList from "@/components/workloads/cards"
import { useAppSelector } from "@/hooks/storeHooks"
import { selectWorkloadCategoryById } from "@/redux/features/apiSlice"
import isEmpty from "lodash.isempty"

const Workloads = () => {
  const { selectedCategoryId } = useAppSelector((state) => state.workloadsSlice)
  const selectedCategory = useAppSelector((state) =>
    selectWorkloadCategoryById(state, selectedCategoryId || ""),
  )

  if (isEmpty(selectedCategory)) {
    return (
      <div className=" relative z-10 mt-12 flex flex-col items-center justify-center space-y-16">
        <h1 className=" max-w-[540px] text-center font-nyght text-36-46 font-medium">
          Set up indexers, oracle providers, subgraphs, etc.
        </h1>
        <div className="container mt-10 flex flex-wrap justify-center gap-8">
          <h4>No workloads</h4>
        </div>
      </div>
    )
  }

  return (
    <div className=" relative z-10 mt-12 flex flex-col items-center justify-center space-y-16">
      <h1 className=" max-w-[540px] text-center font-nyght text-36-46 font-medium">
        Set up indexers, oracle providers, subgraphs, etc.
      </h1>
      <div className="container mt-10 flex flex-wrap items-start justify-center gap-8">
        {isEmpty(selectedCategory.workloads) ? (
          <h4>No workloads</h4>
        ) : (
          selectedCategory.workloads.map((workload: any, workloadIdx: any) => (
            <WorkloadList
              key={workload.category_id + workloadIdx}
              workload={workload}
              categoryName={selectedCategory?.name || ""}
              workloadIdx={workloadIdx}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Workloads
