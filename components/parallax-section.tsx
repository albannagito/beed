import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  backgroundImage: string
  height?: string
  minHeight?: string
  overlayOpacity?: number
  children: React.ReactNode
  className?: string
}

export function ParallaxSection({
  backgroundImage,
  height = "100vh",
  minHeight,
  overlayOpacity = 0.5,
  children,
  className,
}: ParallaxSectionProps) {
  return (
    <section
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
      style={{
        height: height,
        minHeight: minHeight,
      }}
    >
      <div className="absolute inset-0 z-0">
        <Image src={backgroundImage || "/placeholder.svg"} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </section>
  )
}
