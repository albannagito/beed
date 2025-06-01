"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import AnimatedBackground from "./animated-background"
import ScrollLines from "./scroll-lines"

interface ElegantSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  title?: string
  subtitle?: string
  linePosition?: "left" | "right" | "top" | "bottom" | "center"
  lineDirection?: "horizontal" | "vertical" | "diagonal"
  lineCount?: number
  patternOpacity?: number
}

export default function ElegantSection({
  children,
  className,
  id,
  title,
  subtitle,
  linePosition = "left",
  lineDirection = "horizontal",
  lineCount = 3,
  patternOpacity = 0.03,
}: ElegantSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Subtle animations for the title and subtitle
  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const subtitleY = useTransform(scrollYProgress, [0.1, 0.4], [30, 0])
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])

  // Always create these values even if title/subtitle aren't provided
  // This ensures consistent hook calls across renders
  const placeholderY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const placeholderOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section id={id} className={cn("relative overflow-hidden transition-all duration-500", className)}>
      <AnimatedBackground className={cn("py-20 md:py-32", className)} patternOpacity={patternOpacity}>
        <div ref={ref} className="container mx-auto px-4 relative">
          {/* Animated lines */}
          <ScrollLines position={linePosition} direction={lineDirection} lineCount={lineCount} />

          {/* Section header */}
          <div className="text-center mb-16 relative">
            {title ? (
              <motion.h2
                className="text-sm font-medium tracking-widest mb-3 text-[#3fbfbc]"
                style={{ y: titleY, opacity: titleOpacity }}
              >
                {title}
              </motion.h2>
            ) : (
              // Hidden placeholder to maintain consistent hook calls
              <motion.div className="hidden" style={{ y: placeholderY, opacity: placeholderOpacity }} />
            )}

            {subtitle ? (
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-[#231f20]"
                style={{ y: subtitleY, opacity: subtitleOpacity }}
              >
                {subtitle}
              </motion.h3>
            ) : (
              // Hidden placeholder to maintain consistent hook calls
              <motion.div className="hidden" style={{ y: placeholderY, opacity: placeholderOpacity }} />
            )}
          </div>

          {/* Section content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {children}
          </motion.div>
        </div>
      </AnimatedBackground>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-30"></div>
      </div>
    </section>
  )
}
