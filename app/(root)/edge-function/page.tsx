import TimeUnitLabels from "./TimeUnitLabels"
import ContractAddressInputFields from "./ContractAddressInputFields"
import ValueInput from "./ValueInput"
import ModalSkeleton from "@/components/shared/modalSkeleton"

export default function Root() {
  return (
    // <form
    //   className={`m-0 box-border flex w-full flex-col items-start justify-start gap-[24px] overflow-hidden rounded-3xl bg-gray-200 p-6 leading-[normal] tracking-[normal] [backdrop-filter:blur(80px)] ${className}`}
    // >
    <ModalSkeleton classes="!w-[700px] min-w-fit bg-dark-10 backdrop-blur-[40px]">
      <header className="box-border flex max-w-full flex-row items-start justify-between gap-[20px] self-stretch px-0 pb-4 pt-0">
        <div className="flex flex-col items-start justify-start px-0 pb-0 pt-[5px]">
          <div className="flex flex-row items-start justify-start gap-[8px]">
            <img
              className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
              loading="lazy"
              alt=""
              src="/arrowleftsline.svg"
            />
            <div className="font-satoshi-variable text-khaki relative inline-block min-w-[114px] whitespace-nowrap text-left text-base font-medium leading-[150%]">
              Function details
            </div>
          </div>
        </div>
        <div className="mq675:hidden flex w-[392px] max-w-full flex-col items-start justify-start">
          <h3 className="font-satoshi-variable relative m-0 inline-block w-[278px] whitespace-nowrap text-center text-[24px] font-medium leading-[34px] text-white">{`New task - Edge Function `}</h3>
        </div>
        <img
          className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[40px]"
          loading="lazy"
          alt=""
          src="/closeline.svg"
        />
      </header>
      <section className="flex max-w-full flex-col items-start justify-start gap-[24px] self-stretch">
        <div className="box-border flex max-w-full flex-col items-start justify-start gap-[24px] self-stretch rounded-2xl bg-dark-18 p-4">
          <div className="font-satoshi-variable mq450:text-base mq450:leading-[22px] relative inline-block w-[154px] text-left text-xl font-medium leading-[140%] text-white">
            When to trigger?
          </div>
          <div className="mq825:flex-wrap flex flex-row items-start justify-start gap-[16px] self-stretch">
            <div className="box-border flex min-w-[183px] max-w-[232px] flex-1 flex-col items-start justify-center rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-2.5">
              <div className="flex flex-row items-center justify-between gap-[11.5px] self-stretch">
                <div className="flex flex-row items-center justify-start gap-[8px] py-0 pl-0 pr-[43px]">
                  <img
                    className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                    alt=""
                    src="/timeline.svg"
                  />
                  <div className="font-satoshi-variable relative inline-block min-w-[93px] text-left text-base font-medium leading-[21px] text-white">
                    Time interval
                  </div>
                </div>
                <img
                  className="relative h-5 w-5 shrink-0 overflow-hidden"
                  alt=""
                  src="/checkline.svg"
                />
              </div>
            </div>
            <div className="mq450:flex-1 box-border flex min-w-[183px] max-w-[232px] flex-[0.75] flex-row items-center justify-start gap-[8px] whitespace-nowrap rounded-lg border-[1px] border-solid border-white-v-16 py-2.5 pl-[15px] pr-[65px]">
              <img
                className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                loading="lazy"
                alt=""
                src="/shining2line.svg"
              />
              <div className="font-satoshi-variable relative inline-block min-w-[118px] text-left text-base font-medium leading-[21px] text-white">
                Cron Expression
              </div>
            </div>
            <div className="mq450:flex-1 box-border flex min-w-[183px] max-w-[232px] flex-[0.69] flex-row items-center justify-start gap-[8px] whitespace-nowrap rounded-lg border-[1px] border-solid border-white-v-16 py-2.5 pl-[15px] pr-[77px]">
              <img
                className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                alt=""
                src="/btcline.svg"
              />
              <div className="font-satoshi-variable relative inline-block min-w-[106px] text-left text-base font-medium leading-[21px] text-white">
                Onchain Event
              </div>
            </div>
            <div className="mq450:flex-1 box-border flex min-w-[183px] max-w-[232px] flex-[0.36] flex-row items-center justify-start gap-[8px] rounded-lg border-[1px] border-solid border-white-v-16 py-2.5 pl-[15px] pr-[143px]">
              <img
                className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                alt=""
                src="/settingsline.svg"
              />
              <div className="font-satoshi-variable relative inline-block min-w-[40px] text-left text-base font-medium leading-[21px] text-white">
                Block
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start self-stretch">
            <div className="flex flex-row flex-wrap items-start justify-start gap-[16px] self-stretch">
              <TimeUnitLabels daysPlaceholder="Days" emptyTimeUnitValues="3" />
              <TimeUnitLabels daysPlaceholder="Hours" emptyTimeUnitValues="0" />
              <TimeUnitLabels daysPlaceholder="Mins" emptyTimeUnitValues="0" />
              <TimeUnitLabels daysPlaceholder="Secs" emptyTimeUnitValues="0" />
            </div>
          </div>
          <div className="flex max-w-full flex-col items-start justify-start gap-[8px] self-stretch">
            <div className="flex flex-row items-start justify-start gap-[8px]">
              <input className="relative m-0 h-6 w-6 rounded" type="checkbox" />
              <div className="font-satoshi-variable relative inline-block min-w-[126px] text-left text-base font-medium leading-[150%] text-white-v-600">{`Start immediately `}</div>
            </div>
            <div className="box-border flex max-w-full flex-row flex-wrap items-start justify-start gap-[10px] self-stretch rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-1.5">
              <div className="mq825:min-w-full box-border flex min-w-[591px] max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-px">
                <div className="font-satoshi-variable relative self-stretch whitespace-nowrap text-left text-base font-medium leading-[140%] text-white">
                  30 July 2024, 12:00 AM
                </div>
              </div>
              <img
                className="relative h-6 w-6 shrink-0 overflow-hidden"
                loading="lazy"
                alt=""
                src="/calendarscheduleline.svg"
              />
            </div>
          </div>
        </div>
        <div className="box-border flex max-w-full flex-col items-start justify-start gap-[24px] self-stretch rounded-2xl bg-dark-18 p-4">
          <div className="font-satoshi-variable mq450:text-base mq450:leading-[22px] relative inline-block w-[145px] text-left text-xl font-medium leading-[140%] text-white">
            Pre-trigger filter
          </div>
          <div className="mq825:flex-wrap flex max-w-full flex-row items-start justify-start gap-[16px] self-stretch">
            <div className="mq825:flex-1 mq675:pr-[146px] mq675:box-border box-border flex min-w-[312px] max-w-full flex-[0.3817] flex-row items-center justify-start gap-[8px] rounded-lg border-[1px] border-solid border-gray-300 py-2.5 pl-[15px] pr-[292px]">
              <img
                className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                alt=""
                src="/codeboxline.svg"
              />
              <input
                className="font-satoshi-variable relative inline-block h-[21px] w-[calc(100%_-_331px)] min-w-[83px] flex-1 bg-[transparent] p-0 text-left text-base font-medium leading-[130%] text-white-v-600 [border:none] [outline:none]"
                placeholder="Typescript function"
                type="text"
              />
            </div>
            <div className="mq825:flex-1 box-border flex min-w-[312px] max-w-full flex-1 flex-col items-start justify-center rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-2.5">
              <div className="flex max-w-full flex-row items-center justify-between gap-[0px] self-stretch [row-gap:20px]">
                <div className="flex w-[428px] max-w-[calc(100%_-_20px)] flex-row items-center justify-start gap-[8px]">
                  <img
                    className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                    loading="lazy"
                    alt=""
                    src="/robot2line.svg"
                  />
                  <div className="font-satoshi-variable relative inline-block max-w-[calc(100%_-_32px)] flex-1 text-left text-base font-medium leading-[21px] text-white">
                    Solidity function
                  </div>
                </div>
                <img
                  className="relative h-5 w-5 shrink-0 overflow-hidden"
                  alt=""
                  src="/checkline-1.svg"
                />
              </div>
            </div>
          </div>
          <div className="flex w-[486px] max-w-full flex-row items-start justify-start gap-[4px]">
            <img
              className="relative h-5 w-5 shrink-0 overflow-hidden"
              loading="lazy"
              alt=""
              src="/errorwarningline.svg"
            />
            <div className="font-satoshi-variable relative inline-block max-w-[calc(100%_-_24px)] flex-1 text-left text-sm font-medium leading-[150%]">
              <span className="text-white-v-600">
                Your address is not on the Typescript Functions allowlist.
              </span>
              <span className="text-khaki [text-decoration:underline]">
                Apply for access
              </span>
            </div>
          </div>
          <div className="font-satoshi-variable mq450:text-base mq450:leading-[22px] relative text-left text-xl font-medium leading-[140%] text-white">
            Solidity function
          </div>
          <div className="flex max-w-full flex-col items-start justify-start gap-[4px] self-stretch">
            <div className="font-satoshi-variable relative inline-block min-w-[61px] text-left text-base font-medium leading-[150%] text-white-v-600">
              Network
            </div>
            <div className="box-border flex max-w-full flex-row items-start justify-start gap-[10px] self-stretch overflow-x-auto rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-1.5">
              <img
                className="relative h-6 min-h-[24px] w-6 shrink-0 rounded-[50%] object-cover"
                alt=""
                src="/ellipse-62@2x.png"
              />
              <div className="box-border flex w-[876px] max-w-[calc(100%_-_68px)] shrink-0 flex-col items-start justify-start px-0 pb-0 pt-px">
                <div className="font-satoshi-variable relative self-stretch text-left text-base font-medium leading-[140%] text-white">
                  Ethereum
                </div>
              </div>
              <img
                className="relative h-6 w-6 shrink-0 overflow-hidden"
                alt=""
                src="/arrowdownsline.svg"
              />
            </div>
          </div>
          <div className="flex max-w-full flex-col items-start justify-start gap-[4px] self-stretch">
            <div className="font-satoshi-variable relative inline-block w-[124px] text-left text-base font-medium leading-[150%] text-white-v-600">
              Contract address
            </div>
            <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-[7px]">
              <input
                className="font-satoshi-variable relative inline-block h-[22px] w-full min-w-[250px] max-w-full flex-1 bg-[transparent] p-0 text-left text-base font-medium leading-[140%] text-white [border:none] [outline:none]"
                placeholder="0x92D....Ae256"
                type="text"
              />
            </div>
            <div className="flex w-[282px] flex-col items-start justify-start gap-[16px]">
              <div className="flex flex-row items-start justify-start gap-[4px]">
                <input
                  className="relative m-0 h-5 w-5 shrink-0 overflow-hidden"
                  type="checkbox"
                />
                <div className="font-satoshi-variable text-palegreen relative inline-block min-w-[77px] text-left text-sm font-medium leading-[150%]">
                  ABI Fetched
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[8px] self-stretch">
                <input
                  className="relative m-0 h-6 w-6 rounded"
                  type="checkbox"
                />
                <div className="font-satoshi-variable relative flex-1 text-left text-base font-medium leading-[150%] text-white-v-600">
                  Do you want to add a custom ABI?
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-w-full flex-col items-start justify-start gap-[4px] self-stretch">
            <div className="font-satoshi-variable relative inline-block w-[125px] text-left text-base font-medium leading-[150%] text-white-v-600">
              Checker function
            </div>
            <div className="box-border flex max-w-full flex-row flex-wrap items-start justify-start gap-[10px] self-stretch rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-1.5">
              <div className="mq825:min-w-full box-border flex min-w-[591px] max-w-full flex-1 flex-col items-start justify-start px-0 pb-0 pt-px">
                <div className="font-satoshi-variable relative self-stretch text-left text-base font-medium leading-[140%] text-white">
                  Transfer (address: recipient, uint256: amount)
                </div>
              </div>
              <img
                className="relative h-6 w-6 shrink-0 overflow-hidden"
                alt=""
                src="/arrowdownsline-1.svg"
              />
            </div>
          </div>
          <div className="flex max-w-full flex-col items-start justify-start gap-[24px] self-stretch">
            <div className="font-satoshi-variable mq450:text-base mq450:leading-[22px] relative inline-block min-w-[99px] text-left text-xl font-medium leading-[140%] text-white">
              Arguments
            </div>
            <ContractAddressInputFields
              errorWarningLine="/errorwarningline-1.svg"
              pleaseUseCorrectTypeAddre="Please use correct type: address"
            />
            <ContractAddressInputFields
              errorWarningLine="/errorwarningline-2.svg"
              pleaseUseCorrectTypeAddre="Please use correct type: uint256"
            />
          </div>
        </div>
      </section>
      <section className="box-border flex max-w-full flex-row items-start justify-start self-stretch bg-dark-18 px-0 pb-4 pt-0">
        <div className="box-border flex max-w-full flex-1 flex-col items-start justify-start gap-[24px] rounded-2xl p-4">
          <div className="font-satoshi-variable mq450:text-base mq450:leading-[22px] relative inline-block w-[149px] shrink-0 text-left text-xl font-medium leading-[140%] text-white">
            What to trigger?
          </div>
          <div className="mq825:flex-wrap flex max-w-full shrink-0 flex-row items-start justify-start gap-[16px] self-stretch">
            <div className="mq825:flex-1 mq675:pr-[146px] mq675:box-border box-border flex min-w-[312px] max-w-full flex-[0.3817] flex-row items-center justify-start gap-[8px] rounded-lg bg-gray-600 py-3 pl-4 pr-[293px]">
              <img
                className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                alt=""
                src="/codeboxline-1.svg"
              />
              <input
                className="font-satoshi-variable relative inline-block h-[21px] w-[calc(100%_-_333px)] min-w-[83px] flex-1 bg-[transparent] p-0 text-left text-base font-medium leading-[130%] text-gray-500 [border:none] [outline:none]"
                placeholder="Typescript function"
                type="text"
              />
            </div>
            <div className="mq450:flex-wrap mq825:flex-1 box-border flex min-w-[312px] max-w-full flex-1 flex-row items-center justify-start gap-[8px] rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-2.5">
              <img
                className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                loading="lazy"
                alt=""
                src="/filelist3line.svg"
              />
              <div className="font-satoshi-variable relative inline-block min-w-[65px] max-w-full flex-1 text-left text-base font-medium leading-[21px] text-white">
                Transaction
              </div>
              <img
                className="relative h-5 w-5 shrink-0 overflow-hidden"
                alt=""
                src="/checkline-3.svg"
              />
            </div>
          </div>
          <div className="flex w-[486px] max-w-full shrink-0 flex-row items-center justify-start gap-[4px]">
            <img
              className="relative h-5 w-5 shrink-0 overflow-hidden"
              alt=""
              src="/errorwarningline-3.svg"
            />
            <div className="font-satoshi-variable relative inline-block max-w-[calc(100%_-_24px)] flex-1 text-left text-sm font-medium leading-[150%]">
              <span className="text-white-v-600">
                Your address is not on the Typescript Functions allowlist.
              </span>
              <span className="text-khaki [text-decoration:underline]">
                Apply for access
              </span>
            </div>
          </div>
          <div className="relative box-border h-px self-stretch border-t-[1px] border-solid border-gray-800" />
          <div className="flex max-w-full shrink-0 flex-col items-start justify-start gap-[24px] self-stretch">
            <div className="font-satoshi-variable mq450:text-base mq450:leading-[22px] relative inline-block w-[201px] text-left text-xl font-medium leading-[140%] text-white">
              Target Smart Contract
            </div>
            <div className="flex flex-col items-start justify-start gap-[4px] self-stretch">
              <div className="font-satoshi-variable relative inline-block min-w-[61px] text-left text-base font-medium leading-[150%] text-white-v-600">
                Network
              </div>
              <div className="flex flex-row items-center justify-center gap-[10px] self-stretch overflow-x-auto rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-1.5">
                <img
                  className="relative h-6 min-h-[24px] w-6 shrink-0 rounded-[50%] object-cover"
                  alt=""
                  src="/ellipse-62-1@2x.png"
                />
                <div className="font-satoshi-variable relative flex-1 text-left text-base font-medium leading-[140%] text-white">
                  Ethereum
                </div>
                <img
                  className="relative h-6 min-h-[24px] w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/arrowdownsline-2.svg"
                />
              </div>
            </div>
            <div className="flex h-[285px] max-w-full flex-col items-start justify-start gap-[16px] self-stretch">
              <div className="flex max-w-full flex-col items-start justify-start gap-[4px] self-stretch">
                <div className="font-satoshi-variable relative inline-block w-[124px] text-left text-base font-medium leading-[150%] text-white-v-600">
                  Contract address
                </div>
                <div className="box-border flex max-w-full flex-row items-center justify-center self-stretch rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-[7px]">
                  <input
                    className="font-satoshi-variable relative inline-block h-[22px] w-full min-w-[250px] max-w-full flex-1 bg-[transparent] p-0 text-left text-base font-medium leading-[140%] text-white [border:none] [outline:none]"
                    placeholder="0x92D....Ae256"
                    type="text"
                  />
                </div>
                <div className="flex flex-row items-center justify-start gap-[4px]">
                  <img
                    className="relative h-5 w-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/errorwarningline-4.svg"
                  />
                </div>
              </div>
              <div className="flex w-[282px] flex-row items-start justify-start gap-[8px]">
                <input
                  className="relative m-0 h-6 min-h-[24px] w-6 shrink-0 overflow-hidden rounded"
                  type="checkbox"
                />
                <div className="font-satoshi-variable relative flex-1 text-left text-base font-medium leading-[150%] text-white-v-600">
                  Do you want to add a custom ABI?
                </div>
              </div>
              <div className="box-border flex max-w-full flex-1 flex-row items-start justify-center self-stretch rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-4">
                <input
                  className="font-satoshi-variable relative inline-block h-[22px] w-full min-w-[250px] max-w-full flex-1 bg-[transparent] p-0 text-left text-base font-medium leading-[140%] text-white-v-600 [border:none] [outline:none]"
                  placeholder={`[{“inputs”:[{“internal type”:“address”, “name.....`}
                  type="text"
                />
              </div>
            </div>
            <div className="flex max-w-full flex-col items-start justify-start gap-[4px] self-stretch">
              <div className="font-satoshi-variable relative inline-block w-[193px] text-left text-base font-medium leading-[150%] text-white-v-600">
                Functions to be automated
              </div>
              <div className="box-border flex max-w-full flex-row items-center justify-center gap-[10px] self-stretch rounded-lg border-[1px] border-solid border-white-v-16 px-[15px] py-1.5">
                <div className="font-satoshi-variable relative inline-block max-w-[calc(100%_-_34px)] flex-1 text-left text-base font-medium leading-[140%] text-white">
                  approve ( address: spender, unit256:amount )
                </div>
                <img
                  className="relative h-6 w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/arrowdownsline-3.svg"
                />
              </div>
            </div>
          </div>
          <div className="relative box-border h-px self-stretch border-t-[1px] border-solid border-gray-800" />
          <div className="flex max-w-full flex-col items-start justify-start gap-[24px] self-stretch">
            <div className="font-satoshi-variable mq450:text-base mq450:leading-[22px] relative inline-block min-w-[99px] text-left text-xl font-medium leading-[140%] text-white">
              Arguments
            </div>
            <ValueInput
              addressSpender="Address spender"
              pleaseUseCorrectTypeAddre="Please use correct type: address"
            />
            <ValueInput
              addressSpender="Unit256 amount"
              pleaseUseCorrectTypeAddre="Please use correct type: unit256"
            />
          </div>
        </div>
      </section>
      <div className="flex flex-row items-start justify-center self-stretch">
        <button className="box-border flex w-60 cursor-pointer flex-row items-start justify-start whitespace-nowrap rounded-[10px] bg-[transparent] px-[76px] py-[9px] shadow-[0px_2px_16px_rgba(226,_178,_46,_0.24),_1px_1px_3px_#e09130_inset] [background:linear-gradient(96.56deg,_#e2d02c,_#e19030)] [border:none]">
          <div className="font-sf-pro relative flex-1 text-left text-base font-semibold leading-[140%] tracking-[-0.02em] text-black">
            Create task
          </div>
        </button>
      </div>
    </ModalSkeleton>
    // </form>
  )
}
