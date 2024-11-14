import React, { useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

type SliderProps = React.ComponentProps<typeof Slider>

import { CategoriesType } from "@/types"
import millify from "millify"
import { Badge } from "../ui/badge"

interface StakeFormType {
  callback: (value: number) => void
  sliderProps?: SliderProps
  className?: string
  stakeDetails: CategoriesType
  tokenBalance: number
  stakeValue: number
}
export default function StakeForm({
  className,
  stakeDetails,
  tokenBalance,
  callback,
  stakeValue,
  ...props
}: StakeFormType) {
  const { min, max } = stakeDetails.stake_config.range

  const maxValue = useMemo(() => {
    let maxRange
    if (tokenBalance < min) {
      maxRange = max
    } else {
      maxRange = tokenBalance < max ? tokenBalance : max
    }
    return maxRange
  }, [min, max, tokenBalance])

  const steps = useMemo(() => {
    const difference = (maxValue - min) / 3
    return [1, 2].map((acc) => min + difference * acc)
  }, [min, maxValue])

  useEffect(() => {
    callback(min)
  }, [stakeDetails])

  const handleSliderChange = (value: number) => {
    callback(value)
  }

  const handleButtonClick = (value: number) => {
    handleSliderChange(value)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <Slider
          onValueChange={(value) => handleSliderChange(value[0])}
          value={[stakeValue]}
          max={maxValue}
          min={min}
          className={cn(" w-[92%] max-w-[516px]", className)}
          {...props}
        />
        <div className="mt-2 flex w-full items-start justify-between">
          <button
            className="flex cursor-pointer flex-col items-center justify-center"
            onClick={() => handleButtonClick(min)}
          >
            <span className="h-2 w-[2px] bg-[#D9D9D9]"></span>
            <Badge variant={"secondary"}>{millify(min)}</Badge>
          </button>
          {steps.map((step) => (
            <button
              key={step}
              className="flex cursor-pointer flex-col items-center justify-center"
              onClick={() => handleButtonClick(step)}
            >
              <span className="h-2 w-[2px] bg-[#D9D9D9]"></span>
              <Badge variant={"secondary"}>{millify(step)}</Badge>
            </button>
          ))}
          <button
            className="flex cursor-pointer flex-col items-center justify-center"
            onClick={() => handleButtonClick(maxValue)}
          >
            <span className="h-2 w-[2px] bg-[#D9D9D9]"></span>
            <Badge variant={"secondary"}>{millify(maxValue)}</Badge>
          </button>
        </div>
      </div>
    </div>
  )
}
