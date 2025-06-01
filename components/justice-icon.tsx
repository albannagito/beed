"use client"

import { motion } from "framer-motion"
import { Scale } from "lucide-react"

interface JusticeIconProps {
  className?: string
  delay?: number
}

export default function JusticeIcon({ className, delay = 0 }: JusticeIconProps) {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  }

  const leftScaleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: delay + 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const rightScaleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: delay + 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.div variants={iconVariants} className="relative">
        <Scale className="h-16 w-16 text-[#3fbfbc]" />
        <motion.div
          className="absolute top-[6px] left-[4px] w-[20px] h-[2px] bg-[#3fbfbc]"
          variants={leftScaleVariants}
        />
        <motion.div
          className="absolute top-[6px] right-[4px] w-[20px] h-[2px] bg-[#3fbfbc]"
          variants={rightScaleVariants}
        />
      </motion.div>
    </motion.div>
  )
}
