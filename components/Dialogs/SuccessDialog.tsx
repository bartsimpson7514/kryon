"use client"
import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CheckIcon from "@/public/assets/icons/check-icon.svg"
import { Button } from "../ui/button"
interface SuccessDialog {
  openModal: boolean
  closeModal?: () => void
}
const SuccessDialog = ({ openModal, closeModal }: SuccessDialog) => {
  const [open, setOpen] = useState<boolean>(openModal)

  const handleOpenChange = () => {
    closeModal?.()
    setOpen(false)
  }
  useEffect(() => {
    setOpen(openModal)
  }, [openModal])
  return (
    <Dialog open={open} onOpenChange={() => handleOpenChange()}>
      <DialogContent className=" max-w-[600px]">
        <DialogTitle className="hidden">Transaction success dialog</DialogTitle>
        <div className=" flex flex-col items-center justify-center gap-10">
          <div className="rounded-[80px] bg-white-v-16 p-[16px]">
            <span className=" flex h-20 w-20 items-center justify-center gap-10 rounded-[80px]  bg-white">
              <CheckIcon className=" h-9  w-[50px] text-black" />
            </span>
          </div>
          <h4 className=" text-center  font-nyght text-36-46 font-medium  text-white">
            Wo-hoo! Your request has been processed successfully!
          </h4>
          <p className="text-16 font-medium text-white-v-500">
            We’ll keep you posted on the further updates.
          </p>

          <DialogTrigger asChild>
            <Button className=" shadow-mustard250  ">Great, thanks</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessDialog
