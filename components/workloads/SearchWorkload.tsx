"use client"
import React, { useCallback, useMemo } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import debounce from "lodash.debounce"
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks"
import { selectWorkloadCategories } from "@/redux/features/apiSlice"
import { searchHandlerAction } from "@/redux/features/workloadsSlice"
const SearchWorkload = () => {
  const workloadsData = useAppSelector(selectWorkloadCategories)
  const dispatch = useAppDispatch()
  const { searchKey } = useAppSelector(
    (state) => state.workloadsSlice.searchStatus,
  )
  const allWorkloads = useMemo(() => {
    return workloadsData.reduce((acc, item) => {
      return acc.concat(item.workloads)
    }, [])
  }, [workloadsData])
  const searchHandler = useCallback(
    (value: string) => {
      const searchedList = allWorkloads.filter(
        (workload: { title: string }) => {
          return workload?.title
            ?.toLowerCase()
            .includes(value?.toLowerCase()?.trim())
        },
      )

      const list = value ? searchedList : []
      dispatch(
        searchHandlerAction({
          isSearching: false,
          searchedList: list,
          searchKey: value,
        }),
      )
    },
    [allWorkloads],
  )

  const debouncedSetSearchKey = useMemo(
    () => debounce((value: string) => searchHandler(value), 500),
    [allWorkloads],
  ) // 300ms debounce

  const handleChange = (value: string) => {
    dispatch(
      searchHandlerAction({
        isSearching: !!value,
        searchKey: value,
        searchedList: [],
      }),
    )
    debouncedSetSearchKey(value)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <Command className=" w-full max-w-[360px] rounded-lg !border-0 !border-b-0 !bg-white-v-008">
        <CommandInput
          value={searchKey}
          onValueChange={handleChange}
          placeholder="Search by workload name/type"
          className="  !bg-transparent !text-16 !font-medium !text-white-v-600 placeholder:!text-white-v-600"
        />
        <CommandList className="hidden border-0">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export default SearchWorkload
