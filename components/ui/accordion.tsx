import React, { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-5 rounded-lg border border-gray-700">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-t-lg bg-gray-800 p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg text-yellow-400">{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-yellow-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-yellow-400" />
        )}
      </button>
      {isOpen && <div className="rounded-b-lg bg-gray-900 p-4">{children}</div>}
    </div>
  )
}

export default Accordion
