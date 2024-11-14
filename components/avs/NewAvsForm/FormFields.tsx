import React from "react"
import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const AvsNameField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="avsName"
    render={({ field }) => (
      <FormItem>
        <FormLabel>AVS Name</FormLabel>
        <FormControl>
          <Input placeholder="AVS Name" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const AvsFrameworkField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="avsFramework"
    render={({ field }) => (
      <FormItem>
        <FormLabel>AVS Framework</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full text-sm text-white-v-600">
              <SelectValue placeholder="Select AVS Framework" />
            </SelectTrigger>
            <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
              <SelectGroup>
                <SelectItem value="Eigenlayer">EigenLayer</SelectItem>
                <SelectItem value="Symbiotic">Symbiotic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const SupportedTokensField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="supportedTokens"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Supported Tokens</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full text-sm text-white-v-600">
              <SelectValue placeholder="Select Supported Tokens" />
            </SelectTrigger>
            <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
              <SelectGroup>
                <SelectItem value="stETH">stETH</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const TaskTypeField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="taskType"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Task Type</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full text-sm text-white-v-600">
              <SelectValue placeholder="Select Task Type" />
            </SelectTrigger>
            <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
              <SelectGroup>
                <SelectItem value="persistent">Persistent</SelectItem>
                <SelectItem value="onDemand">On-Demand</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
