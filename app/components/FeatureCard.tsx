"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type React from "react"

interface FeatureCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

export default function FeatureCard({ title, description, href, icon }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden rounded-xl shadow-lg"
    >
      <Link href={href} className="block p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="relative z-10">
          <div className="text-purple-500 dark:text-purple-400 mb-4 text-3xl">{icon}</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}

