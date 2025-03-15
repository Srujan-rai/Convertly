"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Instagram } from "lucide-react"
import DownloadForm from "../components/DownloadForm"
import { LoadingSpinner } from "../components/LoadingSpinner"

const Confetti = dynamic(() => import("../components/Confetti").then((mod) => mod.Confetti), {
  ssr: false,
  loading: () => <div>Loading celebration...</div>,
})

export default function InstaReelsDownloader() {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [format, setFormat] = useState("mp4") // Default to MP4

  const handleDownload = async (url: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://convertly-api.vercel.app/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: url, format }),
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `convertly.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    } catch (error) {
      console.error("Download failed:", error)
      setError("Download failed. Please check your URL and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-purple-200 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center">
      <div className="container max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            InstaReels Downloader
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Download your favorite InstaReels with ease!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <div className="flex justify-center mb-6">
            <Instagram className="w-16 h-16 text-pink-500" />
          </div>

          {/* Format Selection Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-center text-lg font-medium">
              Select Format:
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="block w-full p-3 border rounded-md dark:bg-gray-700 dark:text-white text-lg"
            >
              <option value="mp4">MP4 (Video)</option>
              <option value="mp3">MP3 (Audio)</option>
            </select>
          </div>

          {/* Download Form */}
          <DownloadForm
            onSubmit={handleDownload}
            placeholder="Paste InstaReels URL here..."
            buttonText={`Download as ${format.toUpperCase()}`}
          />

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </motion.div>

        {/* How to Use Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">How to Use:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 text-lg">
            <li>Copy the URL of the InstaReel you want to download.</li>
            <li>Paste the URL into the input field above.</li>
            <li>Select the desired format (MP4 or MP3).</li>
            <li>Click the "Download" button.</li>
            <li>Wait for the download to complete.</li>
            <li>Enjoy your downloaded InstaReel! 🎉</li>
          </ol>
        </motion.div>
      </div>

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}

      {showConfetti && <Confetti />}
    </div>
  )
}

