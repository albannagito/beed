"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ScrollingBannerProps {
  text: string[]
  className?: string
  speed?: number
  isLoading?: boolean // Add isLoading prop to match other content
}

export default function ScrollingBanner({
  text,
  className,
  speed = 15,
  isLoading = false, // Default to false
}: ScrollingBannerProps) {
  // Create a repeated array of text to ensure continuous scrolling
  const repeatedText = [...text, ...text, ...text]

  // Detect mobile using window width directly
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      // Set initial state
      setIsMobile(window.innerWidth < 768)

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Use extremely fast speed on mobile (0.5 seconds for a complete cycle)
  const mobileSpeed = 0.5
  const desktopSpeed = speed

  return (
    <div className={cn("relative overflow-hidden w-full pb-1 md:pb-6", className)}>
      <motion.div
        className="flex whitespace-nowrap"
        initial={{
          x: "0%",
          opacity: 0,
        }}
        animate={
          !isLoading
            ? {
                x: "-50%",
                opacity: 1,
              }
            : {
                x: "0%",
                opacity: 0,
              }
        }
        transition={{
          x: {
            duration: isMobile ? mobileSpeed : desktopSpeed,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
          opacity: {
            duration: 1.5,
            delay: 1.2, // Small delay to appear after hero text
            ease: "easeInOut",
          },
        }}
      >
        {repeatedText.map((word, index) => (
          <motion.span
            key={index}
            className={cn(
              "text-5xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mx-3 md:mx-6",
              index % 2 === 0 ? "text-[#f2efeb]" : "text-[#3fbfbc]",
            )}
            initial={{
              opacity: 0,
            }}
            animate={
              !isLoading
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1.5,
              delay: 1.2 + 0.05 * index, // Slightly increased stagger for more noticeable fade-in sequence
              ease: "easeInOut",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
