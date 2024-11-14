"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
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
import { Button } from "@/components/ui/button"
import { toast } from "../ui/use-toast"
import ConnectWalletBtn from "../shared/ConnectWalletBtn"
import { useAccount } from "wagmi"
import { AVS_BASE_URL } from "@/constants"

const FormSchema = z.object({
  frameworkChain: z.string().min(1, "Framework chain is required").trim(),
  executionLayerChain: z
    .string()
    .min(1, "Execution Layer chain is required")
    .trim(),
})

interface props {
  onSuccess: () => void
  avsId: number
}

export default function DeployToChainForm({ onSuccess, avsId }: props) {
  const [deploying, setDeploying] = useState(false)
  const { isConnected } = useAccount()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      frameworkChain: "",
      executionLayerChain: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!isConnected) {
      toast({
        title: "Wallet Status",
        variant: "destructive",
        description: "Please connect your wallet first",
        action: <></>,
      })
      return
    }

    console.log(JSON.stringify(data, null, 2))

    try {
      setDeploying(true)
      const response = await fetch(`${AVS_BASE_URL}/avs/${avsId}/deploy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        toast({
          title: "Deployment Error",
          variant: "destructive",
          description: "Failed to deploy. Please try again.",
          action: <></>,
        })
        return
      }
      console.log("Deployment successful")
      toast({
        title: "Deployment Status",
        variant: "success",
        description: "Deployment successful",
        action: <></>,
      })
      onSuccess()
    } catch (error) {
      console.error("Error during deployment:", error)
      toast({
        title: "Deployment Error",
        variant: "destructive",
        description: "There was an error during deployment. Please try again.",
        action: <></>,
      })
    } finally {
      setDeploying(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Framework Chain Selection */}
        <FormField
          control={form.control}
          name="frameworkChain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Framework Chain</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full text-sm text-white-v-600">
                    <SelectValue placeholder="Select Framework Chain" />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
                    <SelectGroup>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="holesky">Holesky</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Execution Layer Chain Selection */}
        <FormField
          control={form.control}
          name="executionLayerChain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Execution Layer Chain</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full text-sm text-white-v-600">
                    <SelectValue placeholder="Select Execution Layer Chain" />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
                    <SelectGroup>
                      <SelectItem value="holesky">Holesky</SelectItem>
                      <SelectItem value="kryon">Kryon</SelectItem>
                      <SelectItem value="new-chain">New Chain</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          {!isConnected ? (
            <ConnectWalletBtn label="Connect Wallet" />
          ) : (
            <Button
              type="submit"
              disabled={deploying || !isConnected}
              className="bg-green-500 text-white hover:bg-green-700"
            >
              {deploying ? "Deploying..." : "Deploy to Chain"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
