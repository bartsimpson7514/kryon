import { FunctionComponent } from "react"

export type ValueInputType = {
  className?: string
  addressSpender?: string
  pleaseUseCorrectTypeAddre?: string
}

const ValueInput: FunctionComponent<ValueInputType> = ({
  className = "",
  addressSpender,
  pleaseUseCorrectTypeAddre,
}) => {
  return (
    <div
      className={`font-satoshi-variable flex max-w-full flex-col items-start justify-start gap-[4px] self-stretch text-left text-base text-white-v-600 ${className}`}
    >
      <div className="relative inline-block w-[122px] font-medium leading-[150%]">
        {addressSpender}
      </div>
      <div className="border-gray-1000 box-border flex max-w-full flex-row items-center justify-center self-stretch rounded-lg border-[1px] border-solid px-[15px] py-[7px]">
        <input
          className="font-satoshi-variable relative inline-block h-[22px] w-full min-w-[250px] max-w-full flex-1 bg-[transparent] p-0 text-left text-base font-medium leading-[140%] text-white-v-600 [border:none] [outline:none]"
          placeholder="Enter a value"
          type="text"
        />
      </div>
      <div className="text-lightcoral relative inline-block w-[234px] font-medium leading-[150%]">
        {pleaseUseCorrectTypeAddre}
      </div>
    </div>
  )
}

export default ValueInput
