"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollLinesProps {
  className?: string
  lineColor?: string
  lineWidth?: number
  lineCount?: number
  direction?: "horizontal" | "vertical" | "diagonal"
  position?: "left" | "right" | "top" | "bottom" | "center"
}

export default function ScrollLines({
  className,
  lineColor = "#3fbfbc",
  lineWidth = 1,
  lineCount = 3,
  direction = "horizontal",
  position = "left",
}: ScrollLinesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Create an array of line indices
  const lines = Array.from({ length: lineCount }, (_, i) => i)

  // Create all possible transform values at the top level
  // We'll create a fixed number of transforms to avoid conditional hook calls
  const lineProgress0 = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const lineProgress1 = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const lineProgress2 = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const lineProgress3 = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const lineProgress4 = useTransform(scrollYProgress, [0, 0.9], [0, 1])

  // Array of pre-declared progress transforms
  const lineProgresses = [lineProgress0, lineProgress1, lineProgress2, lineProgress3, lineProgress4]

  // Position styles based on the position prop
  const getPositionStyles = () => {
    switch (position) {
      case "left":
        return "left-0 top-1/2 -translate-y-1/2"
      case "right":
        return "right-0 top-1/2 -translate-y-1/2"
      case "top":
        return "top-0 left-1/2 -translate-x-1/2"
      case "bottom":
        return "bottom-0 left-1/2 -translate-x-1/2"
      case "center":
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      default:
        return "left-0 top-1/2 -translate-y-1/2"
    }
  }

  return (
    <div ref={ref} className={cn("absolute pointer-events-none", getPositionStyles(), className)}>
      {lines.map((i) => {
        // Use the pre-declared progress transform for this line
        // If we have more lines than pre-declared transforms, reuse the last one
        const lineProgress = i < lineProgresses.length ? lineProgresses[i] : lineProgresses[lineProgresses.length - 1]

        // Set dimensions based on direction
        let lineStyles = {}

        if (direction === "horizontal") {
          lineStyles = {
            width: lineProgress,
            height: `${lineWidth}px`,
            marginBottom: i < lineCount - 1 ? "20px" : "0",
          }
        } else if (direction === "vertical") {
          lineStyles = {
            height: lineProgress,
            width: `${lineWidth}px`,
            marginRight: i < lineCount - 1 ? "20px" : "0",
          }
        } else {
          // diagonal
          lineStyles = {
            width: lineProgress,
            height: `${lineWidth}px`,
            rotate: "45deg",
            transformOrigin: "left center",
            marginBottom: i < lineCount - 1 ? "30px" : "0",
          }
        }

        return (
          <motion.div
            key={i}
            className="bg-current"
            style={{
              ...lineStyles,
              backgroundColor: lineColor,
              opacity: 0.6 - i * 0.15, // Decreasing opacity for each line
            }}
          />
        )
      })}
    </div>
  )
}
