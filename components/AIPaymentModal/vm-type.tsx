import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function VMType({ field }: any) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a VM" />
      </SelectTrigger>
      <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
        <SelectGroup>
          <SelectItem value="kv1">
            KV1 (CPU: 2 cores, Mem: 8GB, Storage: 128GB)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
