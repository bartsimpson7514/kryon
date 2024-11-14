import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const Tooltip = ({
  children,
  content,
  ...props
}: {
  children: React.ReactNode
  content: React.ReactNode
}) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <div>{children}</div>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="top"
          align="start"
          className={cn("text-yellow-400")}
          {...props}
        >
          {content}
          <TooltipPrimitive.Arrow />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
