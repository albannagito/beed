"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

// Cinematic Scene component
const CinematicScene = ({
  children,
  className,
  index = 0,
  bgColor = "transparent",
  textColor = "#231f20",
  fullHeight = true,
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative w-full overflow-hidden px-4 md:px-8 flex flex-col justify-center items-center",
        fullHeight ? "min-h-screen" : "py-32",
        className,
      )}
      style={{
        background: "linear-gradient(135deg, #f2efeb 0%, #e8e4de 50%, #f2efeb 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
        color: textColor,
        opacity,
      }}
    >
      {/* Diagonal hatch pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%">
          <pattern
            id="diagonalHatch"
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: "#3fbfbc", strokeWidth: 2 }} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
      </div>
      {children}
    </motion.div>
  )
}

// Cinematic Text component with dramatic reveal
const CinematicText = ({
  children,
  className,
  element = "h2",
  delay = 0,
  direction = "up",
  staggerChildren = 0.03,
  color = "#231f20",
  highlightColor = "#3fbfbc",
  highlightWords = [],
}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px", // Start animation when element is 10% away from viewport
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  // Split text into words
  const words = children.toString().split(" ")

  // Get initial animation values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case "up":
        return { y: 100, opacity: 0 }
      case "down":
        return { y: -100, opacity: 0 }
      case "left":
        return { x: 100, opacity: 0 }
      case "right":
        return { x: -100, opacity: 0 }
      case "scale":
        return { scale: 0.8, opacity: 0 }
      default:
        return { y: 100, opacity: 0 }
    }
  }

  // Get animation values
  const getAnimationValues = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 }
      case "left":
      case "right":
        return { x: 0, opacity: 1 }
      case "scale":
        return { scale: 1, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  const renderContent = () => {
    const content = words.map((word, i) => {
      // Check if this word should be highlighted
      const isHighlighted = highlightWords.includes(word) || highlightWords.includes(word.replace(/[.,!?;:]/g, ""))

      return (
        <motion.span
          key={i}
          className={cn("inline-block mr-[0.25em] relative", isHighlighted ? "text-" + highlightColor : "")}
          style={{
            color: isHighlighted ? highlightColor : color,
            textShadow: isHighlighted ? "0 0 20px rgba(63, 191, 188, 0.3)" : "none",
          }}
          initial={getInitialValues()}
          animate={isInView ? getAnimationValues() : getInitialValues()}
          transition={{
            duration: 0.8,
            delay: delay + i * staggerChildren * 0.7,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
        >
          {word}
        </motion.span>
      )
    })

    switch (element) {
      case "h1":
        return <h1 className={className}>{content}</h1>
      case "h3":
        return <h3 className={className}>{content}</h3>
      case "h4":
        return <h4 className={className}>{content}</h4>
      case "p":
        return <p className={className}>{content}</p>
      case "span":
        return <span className={className}>{content}</span>
      default:
        return <div className={className}>{content}</div>
    }
  }

  return (
    <div ref={ref} className="overflow-hidden">
      {renderContent()}
    </div>
  )
}

// Cinematic Image component
const CinematicImage = ({
  src,
  alt,
  className,
  delay = 0,
  duration = 1,
  effect = "reveal", // reveal, fade, zoom, mask
  maskColor = "#3fbfbc",
}) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  // Render different effects
  const renderEffect = () => {
    switch (effect) {
      case "reveal":
        return (
          <div className={cn("relative overflow-hidden", className)} ref={ref}>
            <motion.div
              className="absolute inset-0 z-10"
              style={{ background: `linear-gradient(to right, ${maskColor}, #f2efeb)` }}
              initial={{ x: "0%" }}
              animate={isInView ? { x: "100%" } : { x: "0%" }}
              transition={{ duration, delay, ease: [0.6, 0.01, 0, 0.9] }}
            />
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 1.1 }}
              animate={isInView ? { scale: 1 } : { scale: 1.1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: duration * 1.2, delay: delay + 0.1 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#231f20]/30 to-transparent"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        )

      case "fade":
        return (
          <motion.div
            className={cn("relative", className)}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration, delay }}
            whileHover={{ scale: 1.03 }}
          >
            <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
          </motion.div>
        )

      case "zoom":
        return (
          <div className={cn("relative overflow-hidden", className)} ref={ref}>
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.5, opacity: 0 }}
              transition={{ duration, delay }}
              whileHover={{ scale: 1.1 }}
            >
              <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
            </motion.div>
          </div>
        )

      case "mask":
        return (
          <div className={cn("relative overflow-hidden", className)} ref={ref}>
            <motion.div
              className="relative w-full h-full"
              initial={{ filter: "grayscale(100%) brightness(0.5)" }}
              animate={
                isInView ? { filter: "grayscale(0%) brightness(1)" } : { filter: "grayscale(100%) brightness(0.5)" }
              }
              transition={{ duration, delay }}
              whileHover={{ scale: 1.05 }}
            >
              <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#231f20]/30 to-transparent"
                initial={{ opacity: 1 }}
                animate={isInView ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration, delay: delay + 0.2 }}
              />
            </motion.div>
          </div>
        )

      default:
        return (
          <div className={cn("relative", className)} ref={ref}>
            <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
          </div>
        )
    }
  }

  return renderEffect()
}

// Animated Line component
const AnimatedLine = ({ className = "", delay = 0, duration = 0.8, direction = "horizontal" }) => (
  <motion.div
    className={cn("bg-[#3fbfbc]", direction === "horizontal" ? "h-[2px]" : "w-[2px]", className)}
    initial={{
      scaleX: direction === "horizontal" ? 0 : 1,
      scaleY: direction === "vertical" ? 0 : 1,
      opacity: 0,
    }}
    whileInView={{
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
    }}
    transition={{
      duration,
      delay,
      ease: [0.6, 0.01, 0, 0.9],
    }}
    viewport={{ once: true }}
    style={{
      originX: direction === "horizontal" ? 0 : 0.5,
      originY: direction === "vertical" ? 0 : 0.5,
    }}
  />
)

export default function CinematicFinalSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Add a style tag for the gradient animation
  useEffect(() => {
    const styleTag = document.createElement("style")
    styleTag.innerHTML = `
      @keyframes gradient-shift {
        0% { background-position: 0% 50% }
        50% { background-position: 100% 50% }
        100% { background-position: 0% 50% }
      }
    `
    document.head.appendChild(styleTag)

    return () => {
      document.head.removeChild(styleTag)
    }
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden text-[#231f20]"
      style={{
        background: "linear-gradient(135deg, #f2efeb 0%, #e8e4de 50%, #f2efeb 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
      }}
    >
      {/* Scene 1: Main Content */}
      <CinematicScene index={0}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left column - Text content */}
            <div>
              <CinematicText
                element="p"
                className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 text-[#231f20]"
                delay={0.2}
                direction="left"
                staggerChildren={0.02}
              >
                We act for individuals, corporates, family offices, developers, and institutions.
              </CinematicText>

              <AnimatedLine className="w-[100px] mb-8" delay={0.6} />

              <CinematicText
                element="p"
                className="text-base md:text-lg leading-relaxed mb-12 text-[#231f20]"
                delay={0.7}
                direction="left"
                staggerChildren={0.01}
              >
                Whether we are litigating, negotiating, recovering, drafting, or advising, our clients come to us for
                one thing:
              </CinematicText>

              <CinematicText
                element="h3"
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight text-[#231f20]"
                delay={0.9}
                direction="left"
                staggerChildren={0.04}
                highlightWords={["clear", "decisive", "legal", "action"]}
              >
                clear decisive legal action.
              </CinematicText>

              <AnimatedLine className="w-[150px] mb-8" delay={1.2} />

              <CinematicText
                element="p"
                className="text-xl md:text-2xl font-medium mb-8 text-[#3fbfbc]"
                delay={1.3}
                direction="left"
              >
                We speak your language—not legal jargon.
              </CinematicText>

              <CinematicText
                element="p"
                className="text-base md:text-lg leading-relaxed mb-12 text-[#231f20]"
                delay={1.5}
                direction="left"
                staggerChildren={0.01}
              >
                We draft contracts and resolve disputes with your business goals in mind, not to showcase legal flair.
              </CinematicText>

              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <CinematicText
                  element="span"
                  className="text-lg md:text-xl font-medium text-[#3fbfbc]"
                  delay={1.7}
                  direction="up"
                >
                  Clear.
                </CinematicText>
                <AnimatedLine className="w-[20px] md:w-[40px]" delay={1.8} />
                <CinematicText
                  element="span"
                  className="text-lg md:text-xl font-medium text-[#3fbfbc]"
                  delay={1.9}
                  direction="up"
                >
                  Strategic.
                </CinematicText>
                <AnimatedLine className="w-[20px] md:w-[40px]" delay={2.0} />
                <CinematicText
                  element="span"
                  className="text-lg md:text-xl font-medium text-[#3fbfbc]"
                  delay={2.1}
                  direction="up"
                >
                  Effective.
                </CinematicText>
              </div>
            </div>

            {/* Right column - Visual content */}
            <div className="relative">
              <CinematicImage
                src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Courtroom"
                className="h-[500px] md:h-[600px] lg:h-[700px]"
                delay={0.4}
                effect="reveal"
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] border border-[#3fbfbc]/20 z-0"
                initial={{ opacity: 0, rotate: 0 }}
                whileInView={{ opacity: 1, rotate: 5 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
              />

              <motion.div
                className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] border border-[#3fbfbc]/20 z-0"
                initial={{ opacity: 0, rotate: 0 }}
                whileInView={{ opacity: 1, rotate: -5 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
              />

              {/* Small accent images */}
              <div className="absolute top-[10%] left-[-15%] w-[30%] h-[20%] z-20">
                <CinematicImage
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Legal books"
                  className="h-full"
                  delay={1.2}
                  effect="zoom"
                />
              </div>

              <div className="absolute bottom-[15%] right-[-10%] w-[25%] h-[15%] z-20">
                <CinematicImage
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Contract signing"
                  className="h-full"
                  delay={1.4}
                  effect="mask"
                />
              </div>
            </div>
          </div>
        </div>
      </CinematicScene>
    </motion.section>
  )
}
