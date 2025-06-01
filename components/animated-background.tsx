"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  className?: string
  patternOpacity?: number
  patternColor?: string
  children: React.ReactNode
}

export default function AnimatedBackground({
  className,
  patternOpacity = 0.03,
  patternColor = "#3fbfbc",
  children,
}: AnimatedBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Subtle rotation of the pattern as user scrolls
  const patternRotate = useTransform(scrollYProgress, [0, 1], [0, 3])

  // Subtle scale of the pattern as user scrolls
  const patternScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <motion.div ref={ref} className={cn("relative overflow-hidden bg-[#f2efeb]", className)}>
      {/* Animated pattern background */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          rotate: patternRotate,
          scale: patternScale,
        }}
      >
        {/* Grid pattern */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={patternColor}
                strokeWidth="0.5"
                strokeOpacity={patternOpacity}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Circles pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <motion.div
            className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full border border-[#3fbfbc]/5"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[30%] right-[30%] w-[200px] h-[200px] rounded-full border border-[#3fbfbc]/5"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Diagonal lines */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 overflow-hidden opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="100"
              x2="100"
              y2="0"
              stroke={patternColor}
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <motion.line
              x1="20"
              y1="100"
              x2="100"
              y2="20"
              stroke={patternColor}
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            />
            <motion.line
              x1="40"
              y1="100"
              x2="100"
              y2="40"
              stroke={patternColor}
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
