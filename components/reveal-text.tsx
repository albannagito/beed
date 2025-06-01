"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface RevealTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right"
}

export default function RevealText({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  direction = "up",
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once })

  // Split text into words
  const words = children.split(" ")

  // Set initial and animate values based on direction
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { y: 100, opacity: 0 }
      case "down":
        return { y: -100, opacity: 0 }
      case "left":
        return { x: 100, opacity: 0 }
      case "right":
        return { x: -100, opacity: 0 }
      default:
        return { y: 100, opacity: 0 }
    }
  }

  const getAnimate = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 }
      case "left":
      case "right":
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="flex flex-wrap">
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em] whitespace-pre"
            initial={getInitial()}
            animate={isInView ? getAnimate() : getInitial()}
            transition={{
              duration,
              delay: delay + i * 0.1,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
