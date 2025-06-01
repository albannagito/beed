"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface OverlaySectionProps {
  children: ReactNode
  className?: string
  backgroundImage?: string
  overlayColor?: string
  zIndex?: number
}

export default function OverlaySection({
  children,
  className,
  backgroundImage,
  overlayColor = "rgba(35, 31, 32, 0.7)",
  zIndex = 20,
}: OverlaySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Transform values for the section coming up
  const y = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1])
  const rotate = useTransform(scrollYProgress, [0, 0.5], [2, 0])

  // Background parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <motion.section
      ref={ref}
      className={cn("relative min-h-screen w-full overflow-hidden", className)}
      style={{
        y,
        zIndex,
      }}
      initial={{ y: "100%" }}
    >
      {/* Background image with parallax effect */}
      {backgroundImage && (
        <motion.div className="absolute inset-0 w-full h-full" style={{ y: backgroundY }}>
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: overlayColor }} />
        </motion.div>
      )}

      {/* Content with animations */}
      <motion.div className="relative z-10 h-full w-full" style={{ opacity, scale, rotate }}>
        {children}
      </motion.div>
    </motion.section>
  )
}
