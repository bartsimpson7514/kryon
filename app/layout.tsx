import type { Metadata } from "next"
import localFont from "next/font/local"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"
import AppLayout from "./AppLayout"
import ThemeProvider from "@/context/ThemeProvider"
import { ReduxProvider } from "@/redux/provider"
import { headers } from "next/headers"
import { cookieToInitialState } from "wagmi"
import Web3ModalProvider from "@/context/WagmiProvider"
import { config } from "@/wagmiConfig"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

import { ClerkProvider } from "@clerk/nextjs"

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
})
const nyghtSerif = localFont({
  src: [
    {
      path: "../public/fonts/NyghtSerif-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/NyghtSerif-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NyghtSerif-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NyghtSerif-Dark.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nyght-serif",
})
export const metadata: Metadata = {
  title: "Kryon.Network",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"))

  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          satoshi.variable,
          nyghtSerif.variable,
          "background-light900_dark900",
        )}
      >
        <body className="font-satoshi font-normal">
          <NextTopLoader
            color="#E18F30"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #E18F30,0 0 5px #E18F30"
          />
          <ReduxProvider>
            <ThemeProvider>
              <Web3ModalProvider initialState={initialState}>
                <AppLayout>{children}</AppLayout>
                <Toaster />
              </Web3ModalProvider>
            </ThemeProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
