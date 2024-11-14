import { FunctionComponent } from "react"

export type ContractAddressInputFieldsType = {
  className?: string
  errorWarningLine?: string
  pleaseUseCorrectTypeAddre?: string
}

const ContractAddressInputFields: FunctionComponent<
  ContractAddressInputFieldsType
> = ({ className = "", errorWarningLine, pleaseUseCorrectTypeAddre }) => {
  return (
    <div
      className={`font-satoshi-variable flex max-w-full flex-col items-start justify-start self-stretch text-left text-base text-gray-900 ${className}`}
    >
      <div className="flex max-w-full flex-col items-start justify-start gap-[4px] self-stretch">
        <div className="relative inline-block w-[124px] font-medium leading-[150%]">
          Contract address
        </div>
        <div className="border-gray-1000 box-border flex max-w-full flex-row items-center justify-center self-stretch rounded-lg border-[1px] border-solid px-[15px] py-[7px]">
          <input
            className="font-satoshi-variable relative inline-block h-[22px] w-full min-w-[250px] max-w-full flex-1 bg-[transparent] p-0 text-left text-base font-medium leading-[140%] text-gray-400 [border:none] [outline:none]"
            placeholder="Enter value"
            type="text"
          />
        </div>
        <div className="text-palegoldenrod flex w-[228px] flex-row items-center justify-start gap-[4px] text-sm">
          <img
            className="relative h-5 w-5 shrink-0 overflow-hidden"
            alt=""
            src={errorWarningLine}
          />
          <div className="relative flex-1 font-medium leading-[150%]">
            {pleaseUseCorrectTypeAddre}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractAddressInputFields
