"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface EpicPreLoaderProps {
  onLoadingComplete: () => void
}

export default function EpicPreLoader({ onLoadingComplete }: EpicPreLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading with a timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Delay the actual completion callback to allow for exit animations
      setTimeout(() => {
        onLoadingComplete()
      }, 1200) // Time for exit animation to complete
    }, 2500)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f2efeb]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              delay: 0.8, // Delay the background fade until elements have animated out
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <div className="flex flex-col items-center justify-center">
            {/* Elegant circle */}
            <motion.div
              className="relative mb-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 1.2,
                transition: {
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Outer circle */}
              <motion.div
                className="w-12 h-12 rounded-full border border-[#231f20]/30"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{
                  scale: 1.4,
                  opacity: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  boxShadow: "0 0 15px rgba(35, 31, 32, 0.15)",
                }}
              />

              {/* Inner circle */}
              <motion.div
                className="absolute w-6 h-6 rounded-full border border-[#231f20]/50"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              {/* Animated circle trace */}
              <motion.div
                className="absolute w-9 h-9 rounded-full"
                style={{
                  border: "1px solid rgba(35, 31, 32, 0.8)",
                  borderTopColor: "transparent",
                  borderRightColor: "transparent",
                }}
                animate={{ rotate: 360 }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
