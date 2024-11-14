import { FunctionComponent } from "react"

export type TimeUnitLabelsType = {
  className?: string
  daysPlaceholder?: string
  emptyTimeUnitValues?: string
}

const TimeUnitLabels: FunctionComponent<TimeUnitLabelsType> = ({
  className = "",
  daysPlaceholder,
  emptyTimeUnitValues,
}) => {
  return (
    <div
      className={`font-satoshi-variable flex min-w-[174px] max-w-[232px] flex-1 flex-col items-start justify-start gap-[4px] text-left text-base text-white ${className}`}
    >
      <input
        className="font-satoshi-variable relative inline-block h-6 w-[35px] bg-[transparent] p-0 text-left text-base font-medium leading-[150%] text-gray-700 [border:none] [outline:none]"
        placeholder={daysPlaceholder}
        type="text"
      />
      <div className="border-gray-1000 flex flex-row items-center justify-center self-stretch rounded-lg border-[1px] border-solid px-[15px] py-[7px]">
        <div className="relative flex-1 font-medium leading-[140%]">
          {emptyTimeUnitValues}
        </div>
      </div>
    </div>
  )
}

export default TimeUnitLabels
