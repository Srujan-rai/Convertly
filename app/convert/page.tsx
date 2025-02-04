"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "../components/LoadingSpinner"
import Script from "next/script"

type File = File & {
  name: string
}

export default function DocumentConverter() {
  const [files, setFiles] = useState<File[]>([])
  const [conversionType, setConversionType] = useState<"pdf-to-doc" | "doc-to-pdf">("pdf-to-doc")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files) as File[])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    files.forEach((file) => formData.append("files", file))
    formData.append("conversionType", conversionType)

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Conversion failed")
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `converted_files.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Conversion failed:", error)
      setError("Conversion failed. Please try again.")
    }

    setIsLoading(false)
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Document Converter",
    url: "https://convertly.vercel.app/convert",
    description: "Convert your documents between PDF and Word formats",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
            Document Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Convert your documents between PDF and Word formats
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center space-x-4">
                  <Button
                    type="button"
                    onClick={() => setConversionType("pdf-to-doc")}
                    variant={conversionType === "pdf-to-doc" ? "default" : "outline"}
                    className="flex-1"
                  >
                    PDF to Word
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setConversionType("doc-to-pdf")}
                    variant={conversionType === "doc-to-pdf" ? "default" : "outline"}
                    className="flex-1"
                  >
                    Word to PDF
                  </Button>
                </div>

                <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept={conversionType === "pdf-to-doc" ? ".pdf" : ".doc,.docx"}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Drag and drop your files here, or click to select files
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {conversionType === "pdf-to-doc" ? "PDF files only" : "DOC or DOCX files only"}
                    </p>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Selected Files:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || files.length === 0}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <span>Convert and Download</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">How to use:</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Select the conversion type (PDF to Word or Word to PDF)</li>
                <li>Drag and drop your files or click to select them</li>
                <li>Click the "Convert and Download" button</li>
                <li>Wait for the conversion to complete</li>
                <li>Download your converted files as a zip archive</li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
        <Script id="convert-jsonld" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Document Converter",
              "url": "https://convertly.vercel.app/convert",
              "description": "Convert your documents between PDF and Word formats",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any"
            }
          `}
        </Script>
      </div>
    </div>
  )
}

