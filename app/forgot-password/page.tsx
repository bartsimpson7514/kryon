"use client"
import React, { useState } from "react"
import { useAuth, useSignIn } from "@clerk/nextjs"
import type { NextPage } from "next"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded) {
    return null
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/")
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true)
        setError("")
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true)
          setError("")
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId })
          setError("")
        } else {
          console.log(result)
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>
        <Button>Log in / Sign up</Button>
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent
          className="!max-w-[380px] backdrop-blur-[32px]"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="mb-5 !text-24 !font-medium text-light-50">
              Forgot Password {` `}?
            </DialogTitle>
          </DialogHeader>
          <div className="m-auto max-w-[500px]">
            <form
              className="flex flex-col gap-6"
              onSubmit={!successfulCreation ? create : reset}
            >
              {!successfulCreation && (
                <>
                  <Label htmlFor="email">
                    Please provide your email address
                  </Label>
                  <Input
                    className="!border-white-v-16 !bg-transparent"
                    type="email"
                    placeholder="e.g john@doe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Button>Send password reset code</Button>
                  {error && <p>{error}</p>}
                </>
              )}

              {successfulCreation && (
                <>
                  <Label htmlFor="password">Enter your new password</Label>
                  <Input
                    className="!border-white-v-16 !bg-transparent"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Label htmlFor="password">
                    Enter the password reset code that was sent to your email
                  </Label>
                  <Input
                    className="!border-white-v-16 !bg-transparent"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />

                  <Button>Reset</Button>
                  {error && <p>{error}</p>}
                </>
              )}

              {secondFactor && (
                <p>2FA is required, but this UI does not handle that</p>
              )}
            </form>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default ForgotPasswordPage
