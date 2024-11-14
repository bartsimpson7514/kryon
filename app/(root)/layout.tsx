"use client"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks"
import { selectWorkloadCategories } from "@/redux/features/apiSlice"
import { setCategoryId } from "@/redux/features/workloadsSlice"
import { usePathname } from "next/navigation"

const WorkloadsLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const pathNames = usePathname()
  const workloadsData = useAppSelector(selectWorkloadCategories)
  useEffect(() => {
    if (workloadsData.length) {
      const categoryName = pathNames.split("/")[2]
      const categoryId =
        workloadsData.filter(
          (category) =>
            category.name.toLowerCase() ==
            decodeURI(categoryName).toLowerCase(),
        )[0]?.id || workloadsData[0].id

      // const categoryId = workloadsData[0].id

      dispatch(setCategoryId({ categoryId }))
    }
  }, [workloadsData, dispatch])

  return <>{children}</>
}

export default WorkloadsLayout
