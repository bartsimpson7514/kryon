import React, { useCallback, useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { useAppSelector } from "@/hooks/storeHooks"
import { selectWorkloadCategoryById } from "@/redux/features/apiSlice"
import { usePathname } from "next/navigation"
import isEmpty from "lodash.isempty"
import { UrlObject } from "url"
import { cn } from "@/lib/utils"

const BreadcrumbComponent = () => {
  const [breadcrumbSteps, setBreadcrumbSteps]: any = useState([])
  const router = usePathname()
  const subRoutesPathNames = router.split("/").slice(2)
  const [workloadName, workloadId, taskId = ""] = subRoutesPathNames
  const { selectedCategoryId } = useAppSelector((state) => state.workloadsSlice)

  const selectedCategory = useAppSelector((state) =>
    selectWorkloadCategoryById(state, selectedCategoryId || ""),
  )

  const getBreadcrumbList = useCallback(() => {
    const workloadTitle =
      selectedCategory?.workloads?.filter(
        (workload: { id: string }) =>
          workload.id?.toLowerCase() == workloadId.toLowerCase(),
      )[0]?.title || ""

    const breadcrumbs = [
      {
        name: "All Workloads",
        url: "/workloads",
      },
      {
        name: decodeURI(workloadName),
        url: `/workloads/${workloadName}`,
      },
      {
        name: workloadTitle,
        url: `/workload/${decodeURI(workloadName)}/${workloadId}`,
      },
      taskId && {
        name: taskId,
        url: "",
      },
    ].filter((item) => item)
    setBreadcrumbSteps(breadcrumbs)
  }, [selectedCategory, taskId, workloadName, workloadId])
  useEffect(() => {
    if (!isEmpty(selectedCategory)) {
      getBreadcrumbList()
    }
  }, [
    selectedCategory,
    selectedCategoryId,
    router,
    workloadName,
    getBreadcrumbList,
  ])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbSteps?.map(
          (
            breadcrumb: { url: string | UrlObject; name: string },
            index: number,
          ) => {
            return (
              <div
                key={breadcrumb.name}
                className="flex items-center justify-start"
              >
                <BreadcrumbItem>
                  <Link
                    href={breadcrumb.url}
                    className={cn(
                      index != breadcrumbSteps?.length - 1
                        ? "text-white-v-600"
                        : "text-white",
                      "transition-colors hover:text-white",
                    )}
                  >
                    {breadcrumb.name}
                  </Link>
                </BreadcrumbItem>
                {index != breadcrumbSteps?.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </div>
            )
          },
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbComponent
