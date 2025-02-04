import Link from "next/link"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "./components/ThemeToggle"
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Convertly - Your Ultimate Conversion Tool",
  description:
    "Convert videos and documents with ease. Download InstaReels, YouTube videos, and convert between PDF and Word formats.",
  keywords: "video downloader, document converter, InstaReels, YouTube, PDF to Word, Word to PDF",
  openGraph: {
    title: "Convertly - Your Ultimate Conversion Tool",
    description:
      "Convert videos and documents with ease. Download InstaReels, YouTube videos, and convert between PDF and Word formats.",
    url: "https://convertly.vercel.app",
    siteName: "Convertly",
    images: [
      {
        url: "https://convertly.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertly - Your Ultimate Conversion Tool",
    description:
      "Convert videos and documents with ease. Download InstaReels, YouTube videos, and convert between PDF and Word formats.",
    images: ["https://convertly.vercel.app/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <div className="container flex h-14 items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Convertly
                </span>
              </Link>
             
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="border-t bg-white dark:bg-gray-900">
            <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-300 md:text-left">
                  Built with ❤️ by{" "}
                  <a
                    href="https://github.com/convertly/convertly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Convertly
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

