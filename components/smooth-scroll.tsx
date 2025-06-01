"use client"

import { useEffect, type ReactNode } from "react"

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // This component helps manage scroll behavior
  useEffect(() => {
    // Store the original scroll behavior
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior

    // Set smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth"

    // Restore original scroll behavior on cleanup
    return () => {
      document.documentElement.style.scrollBehavior = originalStyle
    }
  }, [])

  return <>{children}</>
}
