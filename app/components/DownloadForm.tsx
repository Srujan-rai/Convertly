"use client"

import { useState, type React } from "react"

interface DownloadFormProps {
  onSubmit: (url: string) => Promise<void>
  placeholder: string
  buttonText: string
}

export default function DownloadForm({ onSubmit, placeholder, buttonText }: DownloadFormProps) {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg font-semibold text-lg transition duration-200 ease-in-out ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:from-purple-600 hover:to-pink-600"
        }`}
      >
        {isLoading ? "Processing..." : buttonText}
      </button>
    </form>
  )
}

