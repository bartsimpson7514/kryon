"use client"
import { useEffect, useState } from "react"

export const useThemeMode = () => {
  const [mode, setMode] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Your logic to obtain the initial theme mode, such as reading from local storage
    const storedMode = localStorage.getItem("themeMode") || "light"
    setMode(storedMode as "light" | "dark")
  }, [])

  useEffect(() => {
    // Apply class name based on theme mode
    if (mode === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }

    // Update local storage when theme mode changes
    localStorage.setItem("themeMode", mode)
  }, [mode])

  return mode
}
