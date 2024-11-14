// app/components/SignUpForm.tsx

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface SignUpFormProps {
  signUpWithEmail: ({
    emailAddress,
    password,
  }: {
    emailAddress: string
    password: string
  }) => void
  clerkError: string
}

const SignupForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
          email: { value: string }
          password: { value: string }
        }
        const email = target.email.value
        const password = target.password.value
        signUpWithEmail({ emailAddress: email, password })
      }}
    >
      <div className="">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          className="!border-white-v-16 !bg-transparent"
          placeholder="Email address"
          type="email"
          required
        />
      </div>

      <div className="">
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          className="!border-white-v-16 !bg-transparent"
          placeholder="Password"
          type="password"
          required
        />
      </div>

      {clerkError && <p className="font-light text-red-500">{clerkError}</p>}
      <Button
        className="mb-6 h-12 w-full rounded-md bg-transparent text-sm font-light text-white-v-600 hover:bg-white hover:text-white"
        type="submit"
      >
        Create an account
      </Button>
    </form>
  )
}

export default SignupForm
