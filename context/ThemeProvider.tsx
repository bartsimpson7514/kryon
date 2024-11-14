"use client"
import NextTopLoader from "nextjs-toploader"
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react"

interface ThemeContextType {
  mode: string
  setMode: (mode: string) => void
}
interface Props {
  children: React.ReactNode
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: Props) {
  const [mode, setMode] = useState<string>()
  const handleChangeTheme = useCallback(() => {
    if (localStorage.theme === "light" && localStorage.theme) {
      setMode("light")
      document.documentElement.classList.remove("dark")
    } else {
      setMode("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])
  useEffect(() => {
    handleChangeTheme()
  }, [mode, handleChangeTheme])

  if (!mode) {
    return (
      <NextTopLoader
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={2}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 8px #2299DD,0 0 3px #2299DD"
      />
    )
  }
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export default ThemeProvider
