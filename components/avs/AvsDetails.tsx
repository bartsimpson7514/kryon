"use client"

import React, { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import DeployToChainForm from "@/components/avs/DeployToChainForm"
import WhitelistToMarketplaceForm from "@/components/avs/WhitelistToMarketplaceForm"
import ReusableDialog from "@/components/avs/ReusableDialog"
import Accordion from "@/components/ui/accordion"
import formatJsonWithColor from "@/lib/utils/formatJsonWithColor"
import { AVS_BASE_URL } from "@/constants"

interface AvsData {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  avsname: string
  chain: string
  status: string
  avsFramework: string
  supportedTokens: string[]
  taskType: string
  persistentTaskDockerImg: string
  taskModel: string
  taskResponseModel: string
  executionTaskLogic: string
  validationTaskLogic: string
  codebaseGithubUrl: string
  marketplaceUrl: string
  executionLayerContracts?: Record<string, any>
  frameworkContracts?: Record<string, any>
}

const LoadingSkeleton = () => (
  <div className="animate-pulse p-5">
    <div className="mb-4 h-4 w-3/4 rounded bg-gray-400"></div>
    <div className="mb-4 h-4 w-1/2 rounded bg-gray-400"></div>
    <div className="mb-4 h-4 w-1/6 rounded bg-gray-400"></div>
    <div className="mb-4 h-4 w-full rounded bg-gray-400"></div>
    <div className="mb-4 h-4 w-5/6 rounded bg-gray-400"></div>
    <div className="mb-4 h-4 w-2/3 rounded bg-gray-400"></div>
  </div>
)

const TerminalCard = ({
  avsname,
  supportedTokens,
}: {
  avsname: string
  supportedTokens: string[]
}) => (
  <div className="mx-auto max-w-5xl rounded-lg bg-gray-900 p-5 font-sans text-white shadow-lg">
    <div className="flex justify-center align-bottom">
      <div>
        <h1 className="text-2xl text-yellow-400">{avsname}</h1>
        <div className="mt-5 rounded-lg bg-black p-4 font-mono shadow-lg">
          <p>
            <span>{"~> "}</span>
            <span className="text-green-400">
              kryon-cli avs create --avs-name {avsname} --avsframework
              eigenlayer --strategy {supportedTokens.join(", ")}
            </span>
          </p>
          <br />
          <p>Generating AVS...</p>
          <LoadingSkeleton />
        </div>
      </div>
    </div>
  </div>
)

const DataTable = ({ avsData }: { avsData: AvsData }) => (
  <section className="mb-5 mt-5">
    <table className="min-w-full rounded bg-gray-800 shadow">
      <tbody>
        <tr className="border-b border-gray-700">
          <td className="p-2 font-bold">Chain</td>
          <td className="p-2 text-yellow-400">{avsData.chain}</td>
        </tr>
        <tr className="border-b border-gray-700">
          <td className="p-2 font-bold">Framework</td>
          <td className="p-2 text-yellow-400">{avsData.avsFramework}</td>
        </tr>
        <tr className="border-b border-gray-700">
          <td className="p-2 font-bold">Status</td>
          <td className="p-2 text-yellow-400">{avsData.status}</td>
        </tr>
        <tr className="border-b border-gray-700">
          <td className="p-2 font-bold">Supported Tokens</td>
          <td className="p-2 text-yellow-400">
            {avsData.supportedTokens.join(", ")}
          </td>
        </tr>
        <tr className="border-b border-gray-700">
          <td className="p-2 font-bold">Task Type</td>
          <td className="p-2 text-yellow-400">{avsData.taskType}</td>
        </tr>
        <tr className="border-b border-gray-700">
          <td className="p-2 font-bold">GitHub link</td>
          <td className="p-2 text-yellow-400">
            <a
              href={avsData.codebaseGithubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-yellow-400 underline"
            >
              {avsData.codebaseGithubUrl}
            </a>
          </td>
        </tr>
        {avsData.marketplaceUrl && (
          <tr className="border-b border-gray-700">
            <td className="p-2 font-bold">Marketplace Url</td>
            <td className="p-2 text-yellow-400">
              <a
                href={avsData.marketplaceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-yellow-400 underline"
              >
                {avsData.marketplaceUrl}
              </a>
            </td>
          </tr>
        )}
        <tr className="border-b border-gray-700">
          <td className="p-2 font-bold">Created At</td>
          <td className="p-2 text-yellow-400">
            {new Date(avsData.CreatedAt).toLocaleString()}
          </td>
        </tr>
        <tr>
          <td className="p-2 font-bold">Updated At</td>
          <td className="p-2 text-yellow-400">
            {new Date(avsData.UpdatedAt).toLocaleString()}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
)

const AvsDetails = ({ avsId }: any) => {
  const [avsData, setAvsData] = useState<AvsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deployDialogOpen, setDeployDialogOpen] = useState(false)
  const [whitelistDialogOpen, setWhitelistDialogOpen] = useState(false)

  // Use useCallback to avoid re-creating the function on every render
  const fetchAvsData = useCallback(async () => {
    try {
      const response = await fetch(`${AVS_BASE_URL}/avs/${avsId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: AvsData = await response.json()
      setAvsData(data)
      setLoading(false)
    } catch (error: any) {
      setError(`Error fetching AVS data: ${error?.message}`)
      setLoading(false)
    }
  }, [avsId])

  useEffect(() => {
    fetchAvsData()

    let intervalId: NodeJS.Timeout | null = null
    if (avsData && avsData.status === "Generating") {
      intervalId = setInterval(() => {
        fetchAvsData()
      }, 5000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [avsId, avsData?.status])

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl rounded-lg bg-gray-900 p-5 font-sans text-white shadow-lg">
        <LoadingSkeleton />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!avsData) {
    return <p className="text-red-500">Error: unable to load AVS data.</p>
  }

  if (avsData.status === "Generating") {
    return (
      <TerminalCard
        avsname={avsData.avsname}
        supportedTokens={avsData.supportedTokens}
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-gray-900 p-5 font-sans text-white shadow-lg">
      <div className="flex justify-between align-bottom">
        <h1 className="text-2xl text-yellow-400">{avsData.avsname}</h1>
        <div>
          <div className="flex justify-between space-x-2 align-middle">
            <Button
              variant="outline"
              className="border-mustard-800"
              onClick={() => setWhitelistDialogOpen(true)}
            >
              Add to marketplace
            </Button>
            <Button onClick={() => setDeployDialogOpen(true)}>Deploy</Button>
          </div>
        </div>
      </div>
      <DataTable avsData={avsData} />
      <Accordion title="How to run AVS locally?">
        <p>
          Please visit the github link provided above and go through the README
          file for further instructions.
        </p>
      </Accordion>
      {avsData.frameworkContracts && (
        <Accordion title="Framework Contracts">
          <pre
            className="overflow-auto rounded-lg bg-gray-800 p-4 shadow-inner"
            dangerouslySetInnerHTML={{
              __html: formatJsonWithColor(avsData.frameworkContracts),
            }}
          ></pre>
        </Accordion>
      )}
      {avsData.executionLayerContracts && (
        <Accordion title="Execution Layer Contracts">
          <pre
            className="overflow-auto rounded-lg bg-gray-800 p-4 shadow-inner"
            dangerouslySetInnerHTML={{
              __html: formatJsonWithColor(avsData.executionLayerContracts),
            }}
          ></pre>
        </Accordion>
      )}
      {/* ReusableDialog component for DeployToChainForm */}
      <ReusableDialog
        open={deployDialogOpen}
        setOpen={setDeployDialogOpen}
        title="Deploy to Chain"
        triggerComponent={<></>} // No button trigger as the dialog is controlled programmatically
      >
        <DeployToChainForm
          avsId={avsId}
          onSuccess={() => {
            console.log("Deployment successful")
            fetchAvsData()
            setDeployDialogOpen(false)
          }}
        />
      </ReusableDialog>

      {/* ReusableDialog component for WhitelistToMarketplaceForm */}
      <ReusableDialog
        open={whitelistDialogOpen}
        setOpen={setWhitelistDialogOpen}
        title="Whitelist to Marketplace"
        triggerComponent={<></>} // No button trigger as the dialog is controlled programmatically
      >
        <WhitelistToMarketplaceForm
          avsId={avsId}
          onSuccess={() => {
            fetchAvsData()
            console.log("Whitelisting successful")
            setWhitelistDialogOpen(false)
          }}
        />
      </ReusableDialog>
    </div>
  )
}

export default AvsDetails
