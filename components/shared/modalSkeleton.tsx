import React from "react"

const ModalSkeleton = (props: any) => {
  const { classes, children } = props
  return (
    <div
      className={`mt-5 flex flex-col gap-8 rounded-2xl border border-white-v-16 bg-white-v-008 p-6 backdrop-blur-[40px] xl:basis-[500px] ${classes}`}
    >
      {children}
    </div>
  )
}

export default ModalSkeleton
