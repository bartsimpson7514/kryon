// app/components/VerifyForm.tsx
import { FormEvent } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void
  code: string
  setCode: (value: string) => void
}

const VerifyForm = ({ handleVerify, code, setCode }: VerifyFormProps) => {
  return (
    <div className="flex flex-col ">
      <p className="mb-6 text-xl font-light text-white">Verification Code</p>
      <form onSubmit={handleVerify}>
        <Input
          value={code}
          className="border-1 mb-3 block w-full 
          !border-white-v-16 
          !bg-transparent text-sm font-light !text-white focus:border-white-v-600"
          id="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
        />

        <Button
          className="bg-trasparent h-12 w-full rounded-md text-sm font-light text-white hover:bg-white-v-16 hover:text-white-v-600"
          type="submit"
        >
          Complete sign up
        </Button>
      </form>
    </div>
  )
}

export default VerifyForm
