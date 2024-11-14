"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSignIn } from "@clerk/nextjs"
import SignupPage from "./SignupPage"
import ForgotPasswordPage from "./ForgotPassword"
import Image from "next/image"
import { useAuth } from "@clerk/nextjs"
import { AUTH_JWT_TEMPLATE } from "@/constants"
import { usePostJwtTokenMutation } from "@/redux/features/apiSlice"

interface TitleType {
  titleText?: string
}

const SignInPage: React.FC<TitleType> = ({
  titleText = "Log in / Sign up",
}: TitleType) => {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [clerkError, setClerkError] = useState("")
  const [type, setType] = useState("password")
  const { getToken } = useAuth()
  const [postJwtToken, isError] = usePostJwtTokenMutation()

  const signInWithEmail = async ({
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
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      })
      if (result.status === "complete") {
        console.log(result)
        await setActive({ session: result.createdSessionId })
        try {
          console.log("posting jwt token to server")
          await postJwtToken({ jwtToken: await getToken(AUTH_JWT_TEMPLATE) })
        } catch (error) {
          if (isError) {
            console.log(error)
          }
        }
      } else {
        console.log(result)
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2))
      setClerkError(err.errors[0].message)
    }
  }

  const handleToggle = () => {
    if (type === "password") {
      setType("text")
    } else {
      setType("password")
    }
  }

  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>
        <Button>{titleText}</Button>
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent
          className="!max-w-[400px] backdrop-blur-[32px]"
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="mb-5 !text-24 !font-medium text-light-50">
              Sign in to Kryon Network
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-10 rounded-2xl text-base font-medium leading-6 text-white text-opacity-70">
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                const target = e.target as typeof e.target & {
                  email: { value: string }
                  password: { value: string }
                }
                const email = target.email.value
                const password = target.password.value
                signInWithEmail({ emailAddress: email, password })
              }}
            >
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  required
                  placeholder="Email address"
                  type="email"
                  name="email"
                  className="!border-white-v-16 !bg-transparent"
                />
              </div>
              <div className="relative">
                <label htmlFor="password">Password</label>
                <Input
                  required
                  placeholder="Enter password"
                  name="password"
                  type={type}
                  className="!border-white-v-16 !bg-transparent"
                />
                <span
                  className="absolute right-0 top-9 mr-4 flex h-4 w-4 items-center justify-around"
                  onClick={handleToggle}
                >
                  {type == "text" ? (
                    <Image
                      alt="eyeOpen"
                      src={`/assets/icons/eyeOpen.svg`}
                      layout="fill"
                    />
                  ) : (
                    <Image
                      alt="eyeClose"
                      src={`/assets/icons/eyeClose.svg`}
                      layout="fill"
                    />
                  )}
                </span>
              </div>

              {clerkError && (
                <p className="font-light text-red-500">{clerkError}</p>
              )}

              <div className="flex flex-col gap-3">
                <Button type="submit">Sign in</Button>

                <ForgotPasswordPage />
              </div>
            </form>
            {/* <div className="text-16 text-white-v-600">
              Don't have an account already?{" "}
              <Link className="ml-2 text-yellow-200 underline" href="/sign-up">
                Create account
              </Link>
            </div> */}
            <SignupPage />
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default SignInPage
