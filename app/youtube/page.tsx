"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DownloadForm from "../components/DownloadForm"
import { LoadingSpinner } from "../components/LoadingSpinner"
import dynamic from "next/dynamic"
import { Youtube } from "lucide-react"
import Script from "next/script"

const Confetti = dynamic(() => import("../components/Confetti").then((mod) => mod.Confetti), {
  ssr: false,
  loading: () => <div>Loading celebration...</div>,
})

export default function YouTubeDownloader() {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async (url: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("https://convertly-api.vercel.app/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: url }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = "youtube_video.mp4"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 10000) // Hide confetti after 5 seconds
    } catch (error) {
      console.error("Download failed:", error)
      setError("Download failed. Please check your URL and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YouTube Downloader",
    url: "https://convertly.vercel.app/youtube",
    description: "Download your favorite YouTube videos with ease",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-yellow-100 dark:from-gray-900 dark:to-red-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
            YouTube Downloader
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Download your favorite YouTube videos with ease</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <div className="flex justify-center mb-6">
              <Youtube className="w-16 h-16 text-red-500" />
            </div>
            <DownloadForm
              onSubmit={handleDownload}
              placeholder="Enter YouTube URL"
              buttonText="Download YouTube Video"
            />
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">How to use:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Copy the URL of the YouTube video you want to download</li>
              <li>Paste the URL into the input field above</li>
              <li>Click the "Download YouTube Video" button</li>
              <li>Wait for the download to complete</li>
              <li>Enjoy your downloaded YouTube video!</li>
            </ol>
          </div>
        </motion.div>
      </div>
      <Script id="youtube-jsonld" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "YouTube Downloader",
            "url": "https://convertly.vercel.app/youtube",
            "description": "Download your favorite YouTube videos with ease",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any"
          }
        `}
      </Script>
      {isLoading && <LoadingSpinner />}
      {showConfetti && <Confetti />}
    </div>
  )
}

