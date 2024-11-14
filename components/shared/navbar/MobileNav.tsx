"use client"
import React from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import LogoWithText from "@/public/assets/icons/logoWithText.svg"
import SignInPage from "@/components/auth/SignInPage"
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"

const NavContent = () => {
  const pathname = usePathname()

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {navLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route

        return (
          <SheetClose asChild key={item.route}>
            <Link
              className={`${
                isActive
                  ? "text-light950_dark-950 text-bold "
                  : "text-light500_dark-700 text-semibold "
              } flex items-center justify-start bg-transparent tracking-[0.03px] `}
              href={item.route}
            >
              {item.label}
            </Link>
          </SheetClose>
        )
      })}
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </section>
  )
}
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="Menu"
          width={36}
          height={36}
          className="invert-colors md:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className=" background-light900_dark900 border-none"
      >
        <Link href={"/"} className="flex items-center gap-1">
          <div className="flex flex-col gap-1">
            <LogoWithText />
          </div>
        </Link>
        <div className="">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
