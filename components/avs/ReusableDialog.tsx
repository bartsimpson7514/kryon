// components/ui/ReusableDialog.tsx

import React from "react"
import {
  Dialog as BaseDialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ReusableDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  children: React.ReactNode
  triggerComponent?: React.ReactNode
}

const ReusableDialog: React.FC<ReusableDialogProps> = ({
  open,
  setOpen,
  title,
  children,
  triggerComponent,
}) => {
  return (
    <BaseDialog open={open} onOpenChange={setOpen}>
      <div className="my-4 flex justify-between">
        <DialogTrigger asChild>{triggerComponent || <></>}</DialogTrigger>
      </div>
      <DialogContent
        className="max-h-[80%] !max-w-[900px] !gap-0 space-y-9 overflow-auto"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="text-24 font-medium text-white">
          {title}
        </DialogTitle>
        {children}
      </DialogContent>
    </BaseDialog>
  )
}

export default ReusableDialog
