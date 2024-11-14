"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import CodeEditor from "@/components/avs/CodeEditor"
import { toast } from "@/components/ui/use-toast"
import { FormSchema, templates } from "./formSchema"
import {
  AvsFrameworkField,
  AvsNameField,
  SupportedTokensField,
  TaskTypeField,
} from "./FormFields"
import { useRouter } from "next/navigation"
import { NextPage } from "next"
import { AVS_BASE_URL } from "@/constants"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Info } from "lucide-react"

interface Props {
  onSuccess: () => void
}

const NewAvsForm: NextPage<Props> = ({ onSuccess }: Props) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>("SquaringProblem")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      validationTaskLogic: templates[selectedTemplate],
    },
  })

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
    form.setValue("validationTaskLogic", templates[template])
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(AVS_BASE_URL + "/avs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          supportedTokens: [data.supportedTokens],
        }),
      })

      if (!response.ok) {
        const errorDetails = await response.json()
        console.error("Error:", errorDetails)
        setError("An error occurred during deployment. Please try again.")
      } else {
        const result = await response.json()
        console.log("Success:", result)
        toast({
          title: "Status",
          variant: "success",
          description: "Started Generating AVS",
          action: <></>,
        })
        router.push(`/avs/${result.ID}`)
        onSuccess()
      }
    } catch (error) {
      console.error("Error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AvsNameField control={form.control} />
        <AvsFrameworkField control={form.control} />
        <SupportedTokensField control={form.control} />
        <TaskTypeField control={form.control} />
        {/* Validation Logic */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div className="flex w-[400px] justify-between">
              <FormField
                name="language"
                render={() => (
                  <FormItem className="w-[180px]">
                    <FormLabel>AVS Language</FormLabel>
                    <Select
                      defaultValue="Go"
                      onValueChange={handleTemplateChange}
                    >
                      <SelectTrigger className="text-sm text-white-v-600">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
                        <SelectGroup>
                          <SelectItem value="Go">Go</SelectItem>
                          <SelectItem value="Javascript">Javascript</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="template"
                render={() => (
                  <FormItem className={"w-[180px]"}>
                    <FormLabel>AVS Template</FormLabel>
                    <Select
                      defaultValue="SquaringProblem"
                      onValueChange={handleTemplateChange}
                    >
                      <SelectTrigger className="text-sm text-white-v-600">
                        <SelectValue
                          placeholder="Select Template"
                          className="w-[300px]"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full bg-transparent backdrop-blur-[32px]">
                        <SelectGroup>
                          <SelectItem value="SquaringProblem">
                            Number Squaring
                          </SelectItem>
                          <SelectItem value="KeeperNetwork">
                            Keeper Network
                          </SelectItem>
                          <SelectItem value="TrainingAIModels">
                            Training AI/ML Models
                          </SelectItem>
                          <SelectItem value="BlockchainDataIndexing">
                            Blockchain Data Indexing
                          </SelectItem>
                          <SelectItem value="PredictionMarkets">
                            Prediction Markets
                          </SelectItem>
                          <SelectItem value="IntentSolver">
                            Intent Solver
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <a
              href="https://kryon.gitbook.io/kryon.network"
              target="_blank"
              rel="noreferrer"
            >
              <Info className="text-yellow-500" size={24} />
            </a>
          </div>
          <FormField
            control={form.control}
            name="validationTaskLogic"
            render={({ field }) => (
              <CodeEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating AVS..." : "Create AVS"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default NewAvsForm
