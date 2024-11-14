"use client"
import Link from "next/link"
import React from "react"
import { navLinks } from "@/constants"
import { usePathname } from "next/navigation"
import MobileNav from "./MobileNav"
import LogoWithText from "@/public/assets/icons/logoWithText.svg"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import SignInPage from "@/components/auth/SignInPage"
import ConnectWalletBtn from "../ConnectWalletBtn"

const Navbar = () => {
  const pathname = usePathname()

  return (
    <header className="fixed z-50 w-full bg-transparent py-4 backdrop-blur-[10px]">
      <nav className="flex-between flex w-full gap-5 px-4 dark:shadow-none 2xl:px-20">
        <Link href={"/"} className="">
          <div className="flex flex-col gap-1">
            <LogoWithText />
          </div>
        </Link>
        <div className="flex-between gap-5">
          <div className="hidden flex-1 flex-row gap-6 p-2 transition-all duration-300 md:flex lg:gap-8">
            {navLinks.map((item) => {
              const isActive =
                (pathname.includes(item.route) && item.route.length > 1) ||
                pathname === item.route
              return (
                <Link
                  className={`${
                    isActive
                      ? "text-light950_dark-950 text-bold "
                      : "text-light600_dark-600 text-semibold "
                  } flex items-center justify-start  bg-transparent  tracking-[0.03px] transition-colors hover:text-white `}
                  href={item.route}
                  key={item.route}
                >
                  {item.label}
                </Link>
              )
            })}
            <ConnectWalletBtn label="Connect wallet" showAddress />
            <SignedOut>
              <SignInPage />
              {/* <Button>
                <Link href={"/sign-in"} className="">
                  Login/signup
                </Link>
              </Button> */}
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <MobileNav />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
