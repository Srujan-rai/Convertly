"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export function Confetti() {
  const [windowDimension, setWindowDimension] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const updateDimension = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", updateDimension)
    updateDimension()
    return () => window.removeEventListener("resize", updateDimension)
  }, [])

  if (!isClient) return null

  return (
    <ReactConfetti width={windowDimension.width} height={windowDimension.height} recycle={false} numberOfPieces={300} />
  )
}

