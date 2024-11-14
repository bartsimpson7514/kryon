;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}
import { SocialLinkProps } from "@/types"
import { NavLinks } from "@/types"

export const AUTH_JWT_TEMPLATE = { template: "auth", leewayInSeconds: 86400 }

export const AVS_BASE_URL = "https://kryon.dev.unmarshal.com"

export const WORKLOAD_TYPES = {
  UNMARSHAL_INDEXER: "322565b4-0638-4c82-bdf4-618749475617",
  AI_WORKLOAD: "e87ce6bf-9d77-4322-a202-985a9a922ae4",
}

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
]

export const navLinks: NavLinks[] = [
  {
    route: "/avs",
    label: "AVS",
  },
  {
    route: "https://www.kryon.network/",
    label: "Website",
  },
  {
    route: "/docs",
    label: "Docs",
  },
]

export const socialLinks: SocialLinkProps[] = [
  {
    name: "twitter",
    url: "https://webpack.js.org/concepts",
  },
  {
    name: "telegram",
    url: "https://webpack.js.org/concepts",
  },
  {
    name: "website",
    url: "https://webpack.js.org/concepts",
  },
  {
    name: "discord",
    url: "https://webpack.js.org/concepts",
  },
  {
    name: "youtube",
    url: "https://webpack.js.org/concepts",
  },
]

export const TASK_STATUS_CLASS: any = {
  running: " text-green-100",
  deploying: "text-yellow-300",
  terminated: "text-error",
}
