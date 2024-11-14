"use client"
import React from "react"
import { Button } from "../ui/button"
import { Loader2Icon } from "lucide-react"
import { DialogTrigger } from "../ui/dialog"
import SuccessDialog from "../Dialogs/SuccessDialog"

interface PaymentTransferTypes {
  taskApiLoading: boolean
  isTransferPending: boolean
  isConfirmed: boolean
  openModal: boolean
}
const PaymentTransferAction = ({
  taskApiLoading,
  isTransferPending,
  isConfirmed,
  openModal,
}: PaymentTransferTypes) => {
  // const [
  //   createTask,
  //   { data: taskResponse, isLoading: taskApiLoading, isError },
  // ] = useCreateTaskMutation()

  // const [updateTaskTxHash] = useUpdateTaskTxHashMutation()

  return (
    <div className="flex w-full flex-col items-start justify-start gap-1.5">
      <div className="flex gap-3 self-end">
        <DialogTrigger asChild>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </DialogTrigger>

        <Button disabled={taskApiLoading || isTransferPending} type="submit">
          {taskApiLoading ? (
            <div className="flex items-center gap-1.5">
              <Loader2Icon className=" h-5 w-4 animate-spin" />
              <span>
                {taskApiLoading && "processing..."}
                {(isTransferPending || isConfirmed) && "Transferring..."}
              </span>
            </div>
          ) : (
            "Make Payment"
          )}
        </Button>
      </div>
      <SuccessDialog openModal={openModal} />
    </div>
  )
}

export default PaymentTransferAction
