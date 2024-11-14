import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"

interface Props {
  title: string
  linkUrl: string
  linkTitle: string
  description: string
}
const NoResult = ({ title, linkUrl, linkTitle, description }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      {/* <Image
        src="/assets/images/light-illustration.png"
        alt="no result icon"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="no result icon"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      /> */}
      <h1 className=" h2-bold text-dark200_light900 mt-8">{title}</h1>
      <p className=" body-regular  text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={linkUrl}>
        <Button className="paragraph-medium bg-primary-500 hover:bg-primary-500 dark:bg-primary-500 mt-5 min-h-[45px] rounded-lg px-4 py-3  text-light-900 dark:text-light-900  ">
          {linkTitle}
        </Button>
      </Link>
    </div>
  )
}

export default NoResult
