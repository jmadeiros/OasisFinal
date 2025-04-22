"use client"

import { useState, useEffect } from "react"

export function useMacOS() {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    // Only run on the client side
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase()
      setIsMac(userAgent.indexOf("mac") !== -1)
    }
  }, [])

  return isMac
}
