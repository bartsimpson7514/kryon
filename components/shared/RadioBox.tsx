"use client"

import React from "react"
import CheckLineIcon from "@/public/assets/icons/check-line.svg"
import { CategoriesType } from "@/types"
import millify from "millify"
import { Radio, RadioGroup } from "@headlessui/react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import Link from "next/link"

export default function RadioBox({
  items = [],
  selectedCategory,
  handleSelectCategory,
  runSelf,
  handleSwitch,
}: any) {
  const handleChange = (value: string) => {
    const category = items.filter(
      (item: { type: string }) =>
        item.type?.toLowerCase() == value?.toLowerCase(),
    )
    handleSelectCategory(category[0])
  }
  return (
    <fieldset>
      <RadioGroup
        value={selectedCategory.type}
        onChange={(value) => handleChange(value)}
        className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4"
      >
        {items.map((item: CategoriesType, index: string) => (
          <>
            <Radio
              key={item.type + index}
              value={item.type}
              aria-label={item.type}
              className="group relative flex cursor-pointer rounded-lg border border-white-v-16 p-4 shadow-sm focus:outline-none"
            >
              <div className="flex flex-1">
                <div className="flex flex-col">
                  <span className=" flex items-center justify-between text-sm font-medium text-white group-data-[checked]:text-white">
                    {item.type}
                    <CheckLineIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-white group-data-[checked]:text-white [.group:not([data-checked])_&]:invisible"
                    />
                  </span>
                  <span className=" mt-1 flex items-center text-16 text-white-v-500 group-data-[checked]:text-white">
                    {`For amounts between ${millify(item.stake_config.range.min)}-${millify(item.stake_config.range.max)}`}
                  </span>
                  <span className="mt-1 flex items-center text-sm text-green-100">
                    Infra fees - $
                    {item.type == "Verifier" && runSelf ? 0 : item.infra_cost}
                  </span>
                  {selectedCategory.type == "Verifier" &&
                    item.type == "Verifier" &&
                    runSelf && (
                      <Link
                        href="https://unmarshal.gitbook.io/unmarshal-verifier"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center text-sm text-blue-400 underline"
                      >
                        How To
                      </Link>
                    )}
                </div>
              </div>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-lg border border-transparent group-data-[focus]:border group-data-[checked]:border-white-v-600"
              />
            </Radio>
          </>
        ))}
      </RadioGroup>
      {selectedCategory.type == "Verifier" && (
        <div className="mt-2 flex items-center justify-end gap-2">
          <Switch
            id="runSelf"
            checked={runSelf}
            onCheckedChange={handleSwitch}
            className="!h-5 !w-10 data-[state=unchecked]:!bg-gray-400 data-[state=checked]:!bg-mustardGradient [&>span]:!h-4 [&>span]:!w-4 [&>span]:!bg-white"
          />
          <Label htmlFor="runSelf">Run Self</Label>
        </div>
      )}
    </fieldset>
  )
}
