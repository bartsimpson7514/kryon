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
import { Input } from "@/components/ui/input"
import { toast } from "../ui/use-toast"
import { AVS_BASE_URL } from "@/constants"

const FormSchema = z.object({
  marketplace: z.string().min(1, "Marketplace is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  categoryId: z.string().min(1, "Category is required"),
  // socialLinks: z.object({
  //   twitter: z.string().url("Invalid URL format").optional().or(z.literal("")),
  //   telegram: z.string().url("Invalid URL format").optional().or(z.literal("")),
  //   discord: z.string().url("Invalid URL format").optional().or(z.literal("")),
  // }),
  logo: z.string().url("Invalid URL format").optional().or(z.literal("")),
})

interface WhitelistToMarketplaceFormProps {
  onSuccess: () => void
  avsId: number
}

const WhitelistToMarketplaceForm: React.FC<WhitelistToMarketplaceFormProps> = ({
  onSuccess,
  avsId,
}) => {
  const [whitelisting, setWhitelisting] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      marketplace: "",
      description: "",
      categoryId: "",
      // socialLinks: {
      //   twitter: "",
      //   telegram: "",
      //   discord: "",
      // },
      logo: "https://app.kryon.network/assets/icons/logoWithText.svg",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(JSON.stringify(data, null, 2))

    try {
      setWhitelisting(true)
      const response = await fetch(`${AVS_BASE_URL}/avs/${avsId}/marketplace`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      console.log("Whitelisting successful")
      toast({
        title: "Status",
        variant: "success",
        description: "Successfully added to marketplace",
        action: <></>,
      })
      onSuccess()
    } catch (error) {
      console.error("Error during whitelisting:", error)
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to add to marketplace",
        action: <></>,
      })
    } finally {
      setWhitelisting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Marketplace Selection */}
        <FormField
          control={form.control}
          name="marketplace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marketplace</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full text-sm text-white-v-600">
                    <SelectValue placeholder="Select Marketplace" />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
                    <SelectGroup>
                      <SelectItem value="kryon">Kryon Marketplace</SelectItem>
                      <SelectItem value="eigenlayer">
                        Eigenlayer Marketplace
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Describe your AVS"
                  className="w-full text-sm text-white-v-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Selection */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full text-sm text-white-v-600">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
                    <SelectGroup>
                      <SelectItem value="0dcb106d-08c0-4961-8041-100c177a358b">
                        AI Workloads
                      </SelectItem>
                      <SelectItem value="0b8d7528-3549-4d88-a778-31889164c9b7">
                        Community Projects
                      </SelectItem>
                      <SelectItem value="0a71c34b-cb0f-4c83-a79d-02863e135729">
                        Decentralized Storage
                      </SelectItem>
                      <SelectItem value="06fe8242-c619-4399-8c11-8280a57d0e26">
                        Custom Workloads
                      </SelectItem>
                      <SelectItem value="027be9f3-3961-44ac-a99b-ab905263f1d3">
                        Blockchain Validation
                      </SelectItem>
                      <SelectItem value="020e4470-c1db-47e1-9a1c-5c23df9481c8">
                        Web3 Services
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Commented out Social Links */}
        {/* <FormField
          control={form.control}
          name="socialLinks.twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="Twitter Link"
                  className="w-full text-sm text-white-v-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialLinks.telegram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="Telegram Link"
                  className="w-full text-sm text-white-v-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialLinks.discord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="Discord Link"
                  className="w-full text-sm text-white-v-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Logo URL */}
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="Logo URL"
                  className="w-full text-sm text-white-v-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="submit"
            disabled={whitelisting}
            className="bg-green-500 text-white hover:bg-green-700"
          >
            {whitelisting ? "Whitelisting..." : "Whitelist"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default WhitelistToMarketplaceForm
