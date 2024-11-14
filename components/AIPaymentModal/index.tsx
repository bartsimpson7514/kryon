"use client"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AIForm from "./form"
import { Button } from "../ui/button"

export default function AIPaymentModal({ workLoadDetails }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> Launch AI Workload</Button>
      </DialogTrigger>
      <DialogContent
        className=" !max-w-[500px] !gap-0 space-y-9"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className=" text-24 font-medium text-white">
          Sketch to 3D
        </DialogTitle>

        <AIForm workLoadDetails={workLoadDetails} />
      </DialogContent>
    </Dialog>
  )
}
