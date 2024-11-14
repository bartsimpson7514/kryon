"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import VMType from "./vm-type"
import { Input } from "@/components/ui/input"
import PaymentTransferAction from "./PaymentTransferAction"
import { useAuth } from "@clerk/nextjs"
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi"
import { useCallback, useEffect, useMemo, useState } from "react"
import ConnectWalletBtn from "../shared/ConnectWalletBtn"
import { parseEther } from "viem"
import {
  useCreateTaskMutation,
  useUpdateTaskTxHashMutation,
} from "@/redux/features/apiSlice"
import { AUTH_JWT_TEMPLATE } from "@/constants"
import isEmpty from "lodash.isempty"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "../ui/use-toast"
import { Button } from "../ui/button"
import Link from "next/link"

const FormSchema = z.object({
  vmtype: z
    .string({
      required_error: "Please select an vmtype to display.",
    })
    .trim(),
  image: z
    .string({
      required_error: "Please enter a name for the image",
    })
    .trim(),
  containerPort: z
    .string({
      required_error: "Enter a valid port number",
    })
    .transform((v) => Number(v) || 0),
  replicas: z
    .string({
      required_error: "Replicas is required",
    })
    .transform((v) => Number(v) || 0),
  cost: z.string(),
})

export default function AIForm({ workLoadDetails }: any) {
  const queryClient = useQueryClient()
  const {
    data: transferTxhash,
    isPending: isTransferPending,
    sendTransaction,
  } = useSendTransaction()

  const { getToken } = useAuth()
  const [formData, setFormData] = useState({})
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { payment_config: paymentConfig } = workLoadDetails.metadata
  const { isConnected, address, chainId } = useAccount()

  const nativeFee: any = useMemo(
    () =>
      Number(
        parseFloat(paymentConfig.infra_cost) / paymentConfig.eth_price,
      ).toFixed(5),
    [paymentConfig.eth_price, paymentConfig.infra_cost],
  )
  const [cost, setCost] = useState(nativeFee)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vmtype: "kv1",
      cost: nativeFee,
    },
  })

  const [
    createTask,
    { data: taskResponse, isLoading: taskApiLoading, isError },
  ] = useCreateTaskMutation()

  const [updateTaskTxHash] = useUpdateTaskTxHashMutation()

  const getRequestData = useMemo(() => {
    return (formData: any) => ({
      workload_id: workLoadDetails.id,
      metadata: {
        payment_details: {
          wallet_address: address as `0x${string}`,
          infra_fee: parseEther(
            (
              Number(paymentConfig?.infra_cost) * Number(formData?.replicas)
            ).toString(),
          ),
        },
        deployment_config: {
          image: formData?.image,
          vm_type: formData?.vmtype,
          port: formData?.containerPort,
          replicas: formData?.replicas,
        },
      },
    })
  }, [address, workLoadDetails.id, formData])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2))
    setFormData(data)

    const aiRequestData: any = getRequestData(data)

    await createTask({
      createTaskRequestData: aiRequestData,
      jwtToken: await getToken(AUTH_JWT_TEMPLATE),
    })
  }

  const onError = (error: any) => {
    console.log("onerror txn ", error)
    const errorMessage =
      error.toString().split("Details:")[1].split("Version:")[0] ||
      "Please try again!"
    toast({
      title: "Transaction Status",
      variant: "destructive",
      description: errorMessage,
      action: <></>,
    })
  }

  const onTransferSuccess = async (data: any) => {
    console.log("transfer success data: ", data)
    console.log("Task response id", taskResponse.id)
    try {
      await updateTaskTxHash({
        transaction_hash: data,
        taskId: taskResponse?.id,
        jwtToken: await getToken(AUTH_JWT_TEMPLATE),
      })

      setOpenModal(true)

      toast({
        title: "Transaction Status",
        description: "Your transaction has been submitted ",
        action: (
          <Button variant={"link"}>
            <Link
              target="_blank"
              href={`https://testnet.bscscan.com/tx/${data}`}
            >
              {" "}
              View Transaction
            </Link>
          </Button>
        ),
      })
    } catch (err) {
      console.log("updateTaskTxHash error: ", err)
    }
  }

  const handleTransferEvent = useCallback(
    async (ethValue: any) => {
      if (chainId && address) {
        sendTransaction(
          {
            to: paymentConfig.recipient,
            value: parseEther(ethValue),
          },
          { onSuccess: onTransferSuccess, onError },
        )
      }
    },
    [taskResponse, nativeFee, chainId, address, onError],
  )

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: transferTxhash,
  })

  const mutation = useMutation({
    mutationFn: handleTransferEvent,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [address] })
    },
  })

  useEffect(() => {
    if (!isEmpty(taskResponse) && !isError) {
      console.log("taskResponse", taskResponse.id)
      mutation.mutate(cost)
    }
  }, [taskResponse, isError, cost])

  const handleReplicaChange = (evt: any) => {
    const dv: any = parseFloat(nativeFee) * (parseFloat(evt.target.value) || 1)
    if (!isNaN(dv)) {
      setCost(dv?.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0])
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* // Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Name</FormLabel>
              <FormControl>
                <Input placeholder="image" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* // Container Port */}
        <FormField
          control={form.control}
          name="containerPort"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Container Port</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Port to run container on"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* // VM Type */}
        <FormField
          control={form.control}
          name="vmtype"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>VM Type</FormLabel>
              <VMType field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Replicas */}
        <FormField
          control={form.control}
          name="replicas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Replicas</FormLabel>
              <FormControl onChange={handleReplicaChange}>
                <Input
                  placeholder="Replicas"
                  {...field}
                  name="replicas"
                  type="number"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* Cost estimation */}
        <FormField
          control={form.control}
          name="cost"
          render={() => (
            <FormItem>
              <FormLabel className="!text-16">
                Cost estimation: {` `}
                <span className="text-16 font-medium text-white">
                  ${(paymentConfig.eth_price * cost).toFixed(2)} = {cost} MARSH
                </span>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Create Deployment</Button> */}
        {isConnected ? (
          <PaymentTransferAction
            taskApiLoading={taskApiLoading}
            isTransferPending={isTransferPending}
            isConfirmed={isConfirmed}
            openModal={openModal}
          />
        ) : (
          <ConnectWalletBtn label="Connect wallet & Pay" />
        )}
      </form>
    </Form>
  )
}
