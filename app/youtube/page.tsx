"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DownloadForm from "../components/DownloadForm"
import { LoadingSpinner } from "../components/LoadingSpinner"
import dynamic from "next/dynamic"
import { Youtube, Music } from "lucide-react"
import Script from "next/script"

const Confetti = dynamic(
  () => import("../components/Confetti").then((mod) => mod.Confetti),
  {
    ssr: false,
    loading: () => <div>Loading celebration...</div>,
  }
)

export default function YouTubeDownloader() {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [downloadType, setDownloadType] = useState("video") // "video" or "mp3"

  const handleDownload = async (url: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("http://127.0.0.1:5000/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send both the link and the selected type to the backend
        body: JSON.stringify({ link: url, type: downloadType }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = downloadType === "mp3" ? "youtube_audio.mp3" : "youtube_video.mp4"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 10000)
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
    description:
      "Download your favorite YouTube videos or extract MP3 audio with ease",
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
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Download your favorite YouTube videos or extract MP3 audio with ease
          </p>
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
              buttonText={
                downloadType === "mp3"
                  ? "Download MP3"
                  : "Download YouTube Video"
              }
            />

            {/* New, attractive format selection */}
            <div className="mt-6 flex justify-center space-x-4">
              <motion.button
                onClick={() => setDownloadType("video")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-5 py-3 rounded-lg border-2 transition-colors duration-300 ${
                  downloadType === "video"
                    ? "bg-gradient-to-r from-red-500 to-yellow-800 border-transparent"
                    : "bg-transparent border-gray-300 dark:border-gray-500"
                }`}
              >
                <Youtube
                  className={`mr-2 ${
                    downloadType === "video"
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                />
                <span
                  className={`font-semibold ${
                    downloadType === "video"
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Video
                </span>
              </motion.button>

              <motion.button
                onClick={() => setDownloadType("mp3")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-5 py-3 rounded-lg border-2 transition-colors duration-300 ${
                  downloadType === "mp3"
                    ? "bg-gradient-to-r from-red-500 to-yellow-800 border-transparent"
                    : "bg-transparent border-gray-300 dark:border-gray-500"
                }`}
              >
                <Music
                  className={`mr-2 ${
                    downloadType === "mp3"
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                />
                <span
                  className={`font-semibold ${
                    downloadType === "mp3"
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  MP3
                </span>
              </motion.button>
            </div>

            {error && (
              <p className="text-red-500 mt-4 text-center">{error}</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
              How to use:
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Copy the URL of the YouTube video you want to download</li>
              <li>Paste the URL into the input field above</li>
              <li>
                Select your desired format by clicking one of the attractive
                options above
              </li>
              <li>Click the download button</li>
              <li>Wait for the download to complete</li>
              <li>Enjoy your downloaded file!</li>
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
            "description": "Download your favorite YouTube videos or extract MP3 audio with ease",
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
