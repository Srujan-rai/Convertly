"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Download, Youtube, FileType } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type React from "react" // Added import for React
import Script from "next/script"

export default function Home() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Welcome to Convertly"

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Convertly",
    url: "https://convertly.vercel.app",
    description: "Your all-in-one solution for downloads and conversions",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://convertly.vercel.app/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    ],
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
      >
        {typedText}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-2xl text-center mb-12 text-gray-700 dark:text-gray-300"
      >
        Your all-in-one solution for downloads and conversions
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <FeatureCard
          icon={<Download className="h-10 w-10" />}
          title="InstaReels Downloader"
          description="Download your favorite InstaReels"
          href="/instareels"
        />
        <FeatureCard
          icon={<Youtube className="h-10 w-10" />}
          title="YouTube Downloader"
          description="Save YouTube videos offline"
          href="/youtube"
        />
        <FeatureCard
          icon={<FileType className="h-10 w-10" />}
          title="Document Converter"
          description="Convert between file formats"
          href="/convert"
        />
      </div>
      <Script id="home-jsonld" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Convertly",
            "url": "https://convertly.vercel.app",
            "description": "Your all-in-one solution for downloads and conversions",
            "potentialAction": [
              {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://convertly.vercel.app/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            ]
          }
        `}
      </Script>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: { icon: React.ReactNode; title: string; description: string; href: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={href}>
        <Card className="h-full bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <motion.div
              className="mb-4 text-purple-500 dark:text-purple-400"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

