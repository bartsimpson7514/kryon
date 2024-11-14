"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NewAvsForm from "@/components/avs/NewAvsForm"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import ReusableDialog from "@/components/avs/ReusableDialog"
import { AVS_BASE_URL } from "@/constants"

type AVS = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  avsname: string
  avsFramework: string
  supportedTokens: string[]
  taskType: string
  persistentTaskDockerImg: string
  taskModel: string
  taskResponseModel: string
  executionTaskLogic: string
  validationTaskLogic: string
  codebaseGithubUrl: string
}

const AvsList = () => {
  const [avsList, setAvsList] = useState<AVS[]>([])
  const [open, setOpen] = useState(false)

  const fetchAvsList = async () => {
    try {
      const response = await fetch(AVS_BASE_URL + "/avs")
      if (!response.ok) {
        throw new Error("Failed to fetch AVS list")
      }
      const data = await response.json()
      setAvsList(data.avs)
    } catch (error) {
      console.error("Error fetching AVS list:", error)
    }
  }

  useEffect(() => {
    fetchAvsList()
  }, [])

  return (
    <div>
      <ReusableDialog
        open={open}
        setOpen={setOpen}
        title="Create New AVS"
        triggerComponent={<Button>Create a New AVS</Button>}
      >
        <NewAvsForm
          onSuccess={() => {
            fetchAvsList()
            setOpen(false)
          }}
        />
      </ReusableDialog>
      <div className="flex flex-1 flex-col rounded-2xl border border-white-v-16 p-6 backdrop-blur-[32px]">
        <Table className="">
          <TableHeader>
            <TableRow className="!border-b border-white-v-16 !text-white-v-600 hover:!bg-white-v-008">
              <TableHead className="w-[100px] !text-white-v-600">
                Name
              </TableHead>
              <TableHead className="!text-white-v-600">Framework</TableHead>
              <TableHead className="!text-white-v-600">
                Supported Tokens
              </TableHead>
              <TableHead className="!text-white-v-600">Task Type</TableHead>
              <TableHead className="!text-white-v-600">Created At</TableHead>
              <TableHead className="!text-white-v-600">Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {avsList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="p-8 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <div>No AVS found.</div>
                    <div className="mt-4">
                      <Button onClick={() => setOpen(true)}>
                        Create a New AVS
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              avsList.map((avs) => (
                <TableRow
                  key={avs.ID}
                  className={`!border-0 !border-b border-white-v-16 text-16 font-medium text-white hover:!bg-white-v-008`}
                >
                  <TableCell className="w-1/5 font-medium text-yellow-400 underline">
                    <Link href={`/avs/${avs.ID}`} key={avs.ID} passHref>
                      {avs.avsname}
                    </Link>
                  </TableCell>
                  <TableCell>{avs.avsFramework}</TableCell>
                  <TableCell>{avs.supportedTokens.join(", ")}</TableCell>
                  <TableCell>{avs.taskType}</TableCell>
                  <TableCell>
                    {new Date(avs.CreatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(avs.UpdatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AvsList
