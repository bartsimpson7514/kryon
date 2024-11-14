"use client"
import { FormEvent, useState } from "react"
import { useAuth, useSignUp } from "@clerk/nextjs"
import SignupForm from "@/components/auth/SignupForm"
import VerifyForm from "@/components/auth/VerifyForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AUTH_JWT_TEMPLATE } from "@/constants"
import { usePostJwtTokenMutation } from "@/redux/features/apiSlice"

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [clerkError, setClerkError] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState("")
  const { getToken } = useAuth()
  const [postJwtToken, isError] = usePostJwtTokenMutation()

  const signUpWithEmail = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string
    password: string
  }) => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      // change the UI to our pending section.
      setVerifying(true)
    } catch (err: any) {
      setClerkError(err.errors[0].message)
    }
  }

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2))
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })

        // post jwt token to server
        try {
          console.log("posting jwt token to server")
          await postJwtToken({ jwtToken: await getToken(AUTH_JWT_TEMPLATE) })
        } catch (error) {
          if (isError) {
            console.log(error)
          }
        }
        // router.push("/")
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2))
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="text-left">
          <div className="text-16 text-white-v-600">
            Don&apos;t have an account?{" "}
            <span className="ml-2 cursor-pointer text-yellow-200 underline">
              Create account
            </span>
          </div>
        </DialogTrigger>
        <DialogContent
          className="!max-w-[400px]"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="mb-5 !text-24 !font-medium text-light-50">
              Create new account
            </DialogTitle>
          </DialogHeader>
          {!verifying ? (
            <SignupForm
              signUpWithEmail={signUpWithEmail}
              clerkError={clerkError}
            />
          ) : (
            <VerifyForm
              handleVerify={handleVerify}
              code={code}
              setCode={setCode}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Signup
