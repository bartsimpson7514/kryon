"use client"

import { useRef } from "react"
import { AppStore, makeStore } from "./store"
import { Provider } from "react-redux"
import { apiSlice } from "./features/apiSlice"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current?.dispatch(
      apiSlice.endpoints.getWorkloadCategories.initiate(""),
    )
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
