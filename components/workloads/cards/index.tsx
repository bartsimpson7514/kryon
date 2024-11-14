"use client"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { selectWorkloadCategoryById } from "@/redux/features/apiSlice"
import { useSelector } from "react-redux"
import LockIcon from "@/public/assets/icons/lock.svg"

export default function WorkloadList({
  workload,
  workloadIdx,
  categoryName,
}: any) {
  const bgImages = ["bg-indexer", "bg-notification", "bg-edgefn"]
  const {
    title,
    tags,
    description,
    apr,
    status,
    id,
    popularity,
    category_id,
    logo,
  } = workload
  // const { getToken } = useAuth()
  const category = useSelector((state) =>
    selectWorkloadCategoryById(state, category_id),
  )

  // useEffect(() => {
  //   const getAuthToken = async () => {
  //     const token = await getToken(AUTH_JWT_TEMPLATE)

  //   }
  //   getAuthToken()
  // }, [])

  return (
    <div
      className={`${status?.toLowerCase() != "live" ? "relative rounded-2xl border border-yellow-16" : ""}`}
    >
      {status?.toLowerCase() != "live" && (
        <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center ">
          <LockIcon />
          <Badge
            variant="secondary"
            className="mt-3 !border !border-yellow-16 !bg-black/[0.56] px-3 py-2"
          >
            Unlocking soon !
          </Badge>
        </div>
      )}
      <div
        key={id}
        className={cn(
          `${status?.toLowerCase() != "live" ? "relative blur-md" : "group transition-all duration-300 hover:max-h-max hover:-translate-y-6 hover:scale-110 hover:border hover:border-yellow-40 hover:shadow-mustard240 hover:duration-200"} relative z-30 flex max-h-[295px] w-[328px] animate-scale flex-col gap-4 rounded-2xl border border-yellow-16 bg-white-v-008 p-6 backdrop-blur-[32px]`,
        )}
      >
        <div className="flex-1">
          <div className="mb-4">
            <Image
              src={logo}
              alt={title}
              width="46"
              height="46"
              aria-hidden="true"
            />
          </div>

          <div className="">
            <h3 className="mb-4 text-24 font-medium leading-7 text-white">
              <p className="line-clamp-1 focus:outline-none" title={title}>
                {/* Extend touch target to entire panel */}
                {title}
              </p>
            </h3>
            <div className="mb-4 flex">
              {tags.map((tag: any) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="mr-2 rounded-lg !bg-yellow-10 !px-2 !text-yellow-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="mb-4 mt-2 line-clamp-2 overflow-hidden text-sm text-white-v-900">
              {description}
            </p>
            <div className="flex items-center justify-between">
              <p className=" text-14 font-bold text-white">APR: {apr}%</p>
              <p
                className={cn(
                  popularity?.toLowerCase() == "new" && "glow-on-hover",
                  "  mt-2 rounded-lg bg-white-v-008 px-2 py-1 text-14 text-white",
                )}
              >
                {popularity}
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
          >
            <Badge
              variant="outline"
              className={`rounded-md ${status != "Live" ? "bg-brown-800" : "bg-green-900"} !px-2 !py-[0.0125rem] !text-sm`}
            >
              {status == "Live" && (
                <div className="mr-1 h-2 w-2 rounded-lg bg-white" />
              )}
              {status?.toUpperCase()}
            </Badge>
          </div>

          <div
            aria-hidden="true"
            className={`pointer-events-none absolute ${workloadIdx % 2 == 0 ? "bottom-0" : "top-0"} right-0 text-gray-300 group-hover:text-gray-400`}
          >
            <Image
              src={`/assets/icons/${bgImages[Math.floor(Math.random() * 2)]}.svg`}
              alt="icon"
              height={150}
              width={150}
            />
          </div>
        </div>

        <Button
          variant={"link"}
          asChild
          className={`hidden !max-h-10 w-1/2 flex-col group-hover:flex`}
        >
          <Link
            href={`/workload/${decodeURI(categoryName || category.name)}/${id}`}
          >
            Explore Now
          </Link>
        </Button>
      </div>
    </div>
  )
}
