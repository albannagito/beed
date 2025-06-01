"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { ArrowRight, Scale, Gavel, FileText, Building, Users, Home } from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import EpicPreLoader from "@/components/epic-preloader"

// Epic text animation component with error handling
const EpicText = ({
  text,
  className,
  delay = 0,
  duration = 0.05,
  type = "chars" | "words",
  direction = "up" | "down" | "left" | "right" | "scale" | "rotate",
  staggerChildren = 0.03,
  color = "#231f20",
  highlightColor = "#3fbfbc",
  highlightWords = [],
}: {
  text: string
  className?: string
  delay?: number
  type?: "chars" | "words"
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate"
  staggerChildren?: number
  color?: string
  highlightColor?: string[]
}) => {
  // Safety check for text
  if (!text) return null

  // Split text into words or characters
  const items = type === "chars" ? Array.from(text) : text.split(" ")

  // Get initial animation values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case "up":
        return { y: 100, opacity: 0, filter: "blur(15px)" }
      case "down":
        return { y: -100, opacity: 0, filter: "blur(15px)" }
      case "left":
        return { x: 100, opacity: 0, filter: "blur(15px)" }
      case "right":
        return { x: -100, opacity: 0, filter: "blur(15px)" }
      case "scale":
        return { scale: 0.5, opacity: 0, filter: "blur(15px)" }
      case "rotate":
        return { rotateX: 90, opacity: 0, filter: "blur(15px)" }
      default:
        return { y: 100, opacity: 0, filter: "blur(15px)" }
    }
  }

  // Get animation values
  const getAnimationValues = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1, filter: "blur(0px)" }
      case "left":
      case "right":
        return { x: 0, opacity: 1, filter: "blur(0px)" }
      case "scale":
        return { scale: 1, opacity: 1, filter: "blur(0px)" }
      case "rotate":
        return { rotateX: 0, opacity: 1, filter: "blur(0px)" }
      default:
        return { y: 0, opacity: 1, filter: "blur(0px)" }
    }
  }

  // Container variants for staggered animations
  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    }),
  }

  // Child variants for individual elements
  const child = {
    hidden: getInitialValues(),
    visible: {
      ...getAnimationValues(),
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: "1000px", willChange: "transform" }}
    >
      <div
        className={
          className?.includes("text-center")
            ? "flex flex-wrap w-full justify-center text-center"
            : "flex flex-wrap justify-start text-left"
        }
      >
        {items.map((item, index) => {
          // Check if this word should be highlighted
          const isHighlighted =
            type === "words" &&
            (highlightWords.includes(item) || highlightWords.includes(item.replace(/[.,!?;:]/g, "")))

          return (
            <motion.span
              key={index}
              variants={child}
              className="inline-block"
              style={{
                color: isHighlighted ? highlightColor : color,
                whiteSpace: type === "chars" && item === " " ? "pre" : "normal",
                marginRight: type === "words" ? "0.25em" : "0",
                display: "inline-block",
                transformOrigin: "center bottom",
              }}
            >
              {type === "chars" && item === " " ? "\u00A0" : item}
            </motion.span>
          )
        })}
      </div>
    </motion.div>
  )
}

// Epic image reveal component with error handling
const EpicImageReveal = ({
  src,
  alt,
  className,
  delay = 0,
  duration = 1.5,
  effect = "slide", // slide, scale, fade, mask
}: {
  src: string
  alt: string
  className?: string
  delay?: number
  duration?: number
  effect?: "slide" | "scale" | "fade" | "mask"
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {effect === "slide" && (
        <>
          <motion.div
            className="absolute inset-0 bg-[#3fbfbc] z-20"
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: duration * 0.5, delay, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-[#231f20] z-20"
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: duration * 0.5, delay: delay + 0.1, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            className="absolute inset-0 z-20"
            initial={{ x: "0%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: duration * 0.5, delay: delay + 0.2, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="w-full h-full bg-gradient-to-r from-[#3fbfbc] via-[#231f20] to-transparent" />
          </motion.div>
        </>
      )}

      {effect === "mask" && (
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ y: "0%" }}
          whileInView={{ y: "-100%" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: duration, delay, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="w-full h-full bg-gradient-to-b from-[#231f20] to-[#3fbfbc]" />
        </motion.div>
      )}

      <motion.div
        initial={{
          scale: effect === "scale" ? 1.3 : 1.05,
          opacity: effect === "fade" ? 0 : 1,
          filter: "blur(5px)", // Reduced from 10px
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: duration,
          delay: effect === "slide" ? delay + 0.3 : delay,
          ease: "easeOut",
        }}
        className="relative w-full h-full"
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#231f20]/70 to-transparent" />
      </motion.div>
    </div>
  )
}

export default function WhatWeDoPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [initialEntrance, setInitialEntrance] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  // Set initial entrance animation - now depends on intro completion
  useEffect(() => {
    if (introComplete) {
      const timer = setTimeout(() => {
        setInitialEntrance(false)
      }, 100) // Much shorter delay
      return () => clearTimeout(timer)
    }
  }, [introComplete])

  // Add this function inside the WhatWeDoPage component
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // Set initial entrance animation

  // Practice areas with their icons
  const practiceAreas = [
    {
      id: "dispute-resolution",
      title: "Dispute\u00A0Resolution\u00A0&\u00A0Litigation",
      icon: <Scale className="h-8 w-8 text-[#3fbfbc]" />,
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "debt-recovery",
      title: "Debt\u00A0Recovery\u00A0&\u00A0Enforcement",
      icon: <ArrowRight className="h-8 w-8 text-[#3fbfbc]" />,
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "commercial-law",
      title: "Commercial\u00A0Law\u00A0and\u00A0Contracts",
      icon: <FileText className="h-8 w-8 text-[#3fbfbc]" />,
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "family-law",
      title: "Family\u00A0&\u00A0Personal\u00A0Law",
      icon: <Users className="h-8 w-8 text-[#3fbfbc]" />,
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "real-estate",
      title: "Real\u00A0Estate\u00A0&\u00A0Construction",
      icon: <Home className="h-8 w-8 text-[#3fbfbc]" />,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "criminal-law",
      title: "Criminal\u00A0Law",
      icon: <Gavel className="h-8 w-8 text-[#3fbfbc]" />,
      image:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "employment-law",
      title: "Employment\u00A0&\u00A0Labour\u00A0Disputes",
      icon: <Building className="h-8 w-8 text-[#3fbfbc]" />,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ]

  return (
    <>
      {/* Dramatic Intro Animation */}
      <AnimatePresence mode="wait">
        {!introComplete && <EpicPreLoader onLoadingComplete={() => setIntroComplete(true)} />}
      </AnimatePresence>

      <div
        ref={containerRef}
        className="text-[#231f20] min-h-screen"
        style={{
          background: "linear-gradient(to bottom, #f2efeb, #e8e4de)",
          display: introComplete ? "block" : "none",
        }}
      >
        <Navbar />

        {/* Epic Initial Page Entrance Animation - now conditional */}
        <AnimatePresence>
          {initialEntrance && introComplete && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#f2efeb] overflow-hidden"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-[#f2efeb]"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: 2.5 }}
              />

              {/* Animated lines */}

              {/* Title reveal */}
              <div className="relative px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ duration: 2, times: [0, 0.5, 1], delay: 1.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className={`${isMobile ? "text-[5rem]" : "text-[15rem]"} font-black text-[#3fbfbc]/20`}>
                    {isMobile ? "WHAT WE DO" : "WHAT WE DO"}
                  </span>
                </motion.div>

                <motion.div className="relative z-10">
                  <EpicText
                    text="WHAT"
                    className={`${isMobile ? "text-4xl" : "text-6xl md:text-8xl"} font-black mb-4 text-center text-[#231f20]`}
                    delay={1.5}
                    direction="up"
                    staggerChildren={0.05}
                  />
                  <EpicText
                    text="WE"
                    className={`${isMobile ? "text-4xl" : "text-6xl md:text-8xl"} font-black mb-4 text-center text-[#231f20]`}
                    delay={1.8}
                    direction="up"
                    staggerChildren={0.05}
                  />
                  <EpicText
                    text="DO"
                    className={`${isMobile ? "text-4xl" : "text-6xl md:text-8xl"} font-black text-center text-[#3fbfbc]`}
                    delay={2.1}
                    direction="up"
                    staggerChildren={0.05}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="pt-24 pb-20">
          {/* Hero Section */}
          <HeroSection isMobile={isMobile} isTablet={isTablet} initialEntrance={initialEntrance} />

          {/* Practice Areas */}
          <section className="py-20 relative bg-[#f2efeb]">
            <div className="container mx-auto px-4 max-w-7xl">
              {/* Practice Areas Content */}
              <div className="space-y-20 md:space-y-32">
                {practiceAreas.map((area, index) => (
                  <PracticeAreaSection
                    key={area.id}
                    id={area.id}
                    title={area.title}
                    icon={area.icon}
                    image={area.image}
                    index={index}
                    content={getContentForSection(area.id)}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1505547828843-176834e42154?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Bahrain Skyline"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#f2efeb] via-transparent to-[#f2efeb]" />
            </div>

            {/* Animated background elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#3fbfbc]/5 blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#3fbfbc]/5 blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />

            <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full flex flex-col items-center"
              >
                <EpicText
                  text="Any other industry?"
                  type="words"
                  className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 text-center"
                  delay={0.2}
                  direction="scale"
                  staggerChildren={0.1}
                  highlightWords={["industry"]}
                />

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: isMobile ? "100px" : "200px" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="h-0.5 bg-[#3fbfbc] mx-auto mb-12"
                />

                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 2,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#3fbfbc] text-[#231f20] px-6 sm:px-8 py-3 sm:py-4 font-medium text-base sm:text-lg inline-flex items-center group shadow-md"
                >
                  <span>Schedule a Consultation</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        <FooterSection />
      </div>
    </>
  )
}

// Hero Section Component with Epic Animations
function HeroSection({
  isMobile,
  isTablet,
  initialEntrance,
}: { isMobile: boolean; isTablet: boolean; initialEntrance: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={heroRef} className="min-h-screen relative flex items-center overflow-hidden -mt-24 pt-24">
      {/* Background with smooth entrance */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={
            !initialEntrance
              ? {
                  scale: 1,
                  opacity: 1,
                }
              : { scale: 1.1, opacity: 0 }
          }
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src="https://i.ibb.co/Jwp6NCpS/zaa.jpg"
            alt="Legal Library"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={!initialEntrance ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#f2efeb]/90 via-[#f2efeb]/70 to-[#f2efeb]" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 max-w-6xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={!initialEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="max-w-4xl">
          {/* Epic title animation */}
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: 50 }}
              animate={!initialEntrance ? { y: 0 } : { y: 50 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: "easeOut",
              }}
              style={{ willChange: "transform" }}
            >
              <EpicText
                text="Comprehensive&nbsp;Legal&nbsp;Services."
                className={`${isMobile ? "text-3xl" : isTablet ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl lg:text-7xl"} font-bold leading-tight`}
                delay={1.2}
                direction="left"
                color="#3fbfbc"
              />
            </motion.div>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: 50 }}
              animate={!initialEntrance ? { y: 0 } : { y: 50 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: "easeOut",
              }}
              style={{ willChange: "transform" }}
            >
              <EpicText
                text="Strategic&nbsp;Execution."
                className={`${isMobile ? "text-3xl" : isTablet ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl lg:text-7xl"} font-bold leading-tight`}
                delay={1.4}
                direction="right"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={!initialEntrance ? { width: isMobile ? "100px" : "150px" } : { width: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="h-0.5 bg-[#3fbfbc] mb-8"
            style={{ willChange: "width" }}
          />

          <EpicText
            text="At Dr Youssef Elekyabi Law Firm, we offer full-service legal support across core practice areas—delivered with clarity, experience, and unwavering focus on results. Our work is senior-led, discreet, and shaped by decades of experience at the highest levels of legal and judicial practice in Bahrain and beyond."
            type="words"
            className={`${isMobile ? "text-base" : "text-xl md:text-2xl"} text-[#231f20]/80 leading-relaxed mb-12 max-w-3xl`}
            delay={1.8}
            direction="up"
            staggerChildren={0.01}
          />

          <div className="flex flex-wrap gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={!initialEntrance ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 2.2 }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#3fbfbc] text-[#231f20] px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm sm:text-base"
              >
                <Link
                  href="#dispute-resolution"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("dispute-resolution")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  aria-label="Explore Our Services"
                >
                  Explore Our Services
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={!initialEntrance ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border border-[#3fbfbc] text-[#3fbfbc] px-4 sm:px-6 py-2 sm:py-3 font-medium text-sm sm:text-base"
              >
                Contact Us
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={!initialEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.8, delay: 2.6 }}
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-0.5 h-16 bg-gradient-to-b from-[#3fbfbc] to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Practice Area Section Component with Epic Animations
function PracticeAreaSection({
  id,
  title,
  icon,
  image,
  index,
  content,
  isMobile,
}: {
  id: string
  title: string
  icon: React.ReactNode
  image: string
  index: number
  content: string
  isMobile: boolean
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3, once: true })
  const isEven = index % 2 === 0

  // Determine animation direction based on index
  const getDirection = (isEven: boolean) => {
    return isEven ? "left" : "right"
  }

  // Determine image animation effect based on index
  const getImageEffect = (index: number) => {
    const effects = ["slide", "mask", "scale", "fade"]
    return effects[index % effects.length]
  }

  // Split content into paragraphs for better readability on mobile
  const paragraphs = content.split(". ").reduce((acc: string[], sentence, i, arr) => {
    if (i % 3 === 0 || i === 0) {
      acc.push(sentence + (i < arr.length - 1 ? "." : ""))
    } else {
      acc[acc.length - 1] += " " + sentence + (i < arr.length - 1 ? "." : "")
    }
    return acc
  }, [])

  return (
    <div ref={sectionRef} id={id} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`flex flex-col ${isMobile ? "" : isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center`}
      >
        {/* Image with epic reveal */}
        <div className="w-full lg:w-2/5">
          <EpicImageReveal
            src={image}
            alt={title}
            className="h-[250px] sm:h-[300px] md:h-[400px]"
            delay={0.2}
            effect={getImageEffect(index)}
          />
        </div>

        {/* Content with epic animations */}
        <div className="w-full lg:w-3/5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center mb-6"
          >
            <motion.div
              className="mr-4"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.6,
              }}
            >
              {icon}
            </motion.div>
            <EpicText
              text={title}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#231f20]"
              delay={0.8}
              direction={getDirection(isEven)}
            />
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: isMobile ? "80px" : "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="h-0.5 bg-[#3fbfbc] mb-6"
          />

          <div className="space-y-4">
            {isMobile ? (
              // Mobile view - show paragraphs
              paragraphs.map((paragraph, i) => (
                <EpicText
                  key={i}
                  text={paragraph}
                  type="words"
                  className="text-sm sm:text-base text-[#231f20]/80 leading-relaxed"
                  delay={1.2 + i * 0.1}
                  direction="up"
                  staggerChildren={0.005}
                />
              ))
            ) : (
              // Desktop view - show full content
              <EpicText
                text={content}
                type="words"
                className="text-base md:text-lg text-[#231f20]/80 leading-relaxed"
                delay={1.2}
                direction="up"
                staggerChildren={0.01}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Function to get content for each section
function getContentForSection(id: string): string {
  switch (id) {
    case "dispute-resolution":
      return "We represent clients in all stages of litigation—from first-instance courts to the Court of Cassation—across civil, commercial, criminal, and Shari'a matters. Whether the dispute is local or cross-border, we deliver decisive legal action with courtroom precision. Our litigation team appears before all levels of the Bahraini judiciary, including the Court of Cassation, and we act in judicial panel claims, constitutional appeals, and enforcement actions. We represent clients in both institutional and ad hoc arbitrations, including proceedings before the Bahrain Chamber for Dispute Resolution (BCDR) and other regional or international arbitration centres. We believe that a successful dispute resolution practice is built on in-depth case analysis, strategic clarity, proactive case management, and transparent communication. While we are fully prepared to pursue litigation when necessary, we recognise that mutually agreed settlements often represent the most efficient and commercially viable outcomes for our clients."

    case "debt-recovery":
      return "We handle complex recovery efforts, whether through court proceedings, arbitration enforcement, or negotiated resolution. We have successfully enforced foreign judgments and arbitral awards throughout the GCC. We also assist clients with the enforcement of foreign judgments and arbitral awards, including proceedings for the execution of judgments once declared enforceable."

    case "commercial-law":
      return "We advise local and international businesses operating in Bahrain on structuring, negotiation, and risk in all types of commercial contracts. Our expertise spans the full business lifecycle, including the incorporation of companies and partnerships, drafting of shareholder agreements, corporate structuring and restructuring, and advising on mergers, acquisitions, and divestments. We conduct thorough legal due diligence and draft, review, and negotiate agreements related to investments, commercial assets and more."

    case "family-law":
      return "We act for clients in Bahrain's Shari'a and civil family courts, advising on divorce, custody, inheritance disputes, estate planning, and guardianship matters. Sensitive issues are handled with discretion, clarity, and respect for cultural context."

    case "real-estate":
      return "From off-plan disputes to construction claims and lease agreements, we advise Bahraini developers, contractors, and property owners on their rights and obligations under local property law and FIDIC-based contracts."

    case "criminal-law":
      return "We act for both defendants and victims in criminal proceedings before the Bahraini courts. Our team defends individuals and corporate officers facing prosecution—particularly in complex matters involving economic crimes, breach of trust, fraud, and defamation. Equally, we represent victims seeking justice and restitution through private prosecution or civil claims arising from criminal acts. Respected by prosecutors and judges alike, our litigation team brings credibility, strategic focus, and deep courtroom experience to every case."

    case "employment-law":
      return "We represent employers and employees in cases involving termination, wage claims, wrongful dismissal, and contractual disputes. We also advise on employment contracts, internal regulations, and compliance with Bahraini labour law."

    default:
      return ""
  }
}
