"use client"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import Image from "next/image"
import EllipsisHeroImageBanner from "@/public/assets/icons/ellipse-hero-banner.svg"
const HeroBanner = () => {
  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="w-full max-w-[800px] space-y-6 text-center">
        <h1 className="font-nyght text-[40px] font-normal leading-[72px] text-white md:text-[56px] ">
          Ignite the Decentralized Revolution With Kryon Network
        </h1>
        <p className=" text-center font-satoshi text-16-24 font-normal text-white-v-900">
          Harness the power of advanced security (AVS), seamless Web 2.0
          integration, and a thriving community to build dApps that are
          scalable, secure, and truly decentralized
        </p>
      </div>
      <div className="bg-circle-hero-banners absolute left-1/2 top-0 z-0 h-[360px] w-[360px] -translate-x-1/2 sm:h-[440px] sm:w-[440px] lg:h-[800px] lg:w-[800px]">
        <EllipsisHeroImageBanner />
      </div>

      <div className="relative z-10 mt-10 flex items-center justify-center">
        <Button asChild>
          <Link href={"/workloads"}>Let&apos;s get started</Link>
        </Button>
      </div>
      <div className="w-full items-center justify-center lg:flex">
        <Image
          src="/assets/images/hero.png"
          alt={"hero image"}
          width="900"
          height="320"
        />
      </div>
    </div>
  )
}

export default HeroBanner
