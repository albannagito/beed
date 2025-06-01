"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"
import { Shield, Award, ArrowRight, Scale, Briefcase } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import EpicPreLoader from "@/components/epic-preloader"

// Mobile detection hook with reduced motion preference
function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    // Initial check
    checkMobile()

    // Add event listeners
    window.addEventListener("resize", checkMobile)

    // Use the correct event listener method based on browser support
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleReducedMotionChange)

      // Cleanup
      return () => {
        window.removeEventListener("resize", checkMobile)
        mediaQuery.removeEventListener("change", handleReducedMotionChange)
      }
    } else {
      // For older browsers
      mediaQuery.addListener(handleReducedMotionChange)

      // Cleanup
      return () => {
        window.removeEventListener("resize", checkMobile)
        mediaQuery.removeListener(handleReducedMotionChange)
      }
    }
  }, [])

  return { isMobile, prefersReducedMotion }
}

export default function WhyClientsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [introComplete, setIntroComplete] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  return (
    <>
      {/* Dramatic Intro Animation */}
      <AnimatePresence mode="wait">
        {!introComplete && <EpicPreLoader onLoadingComplete={() => setIntroComplete(true)} />}
      </AnimatePresence>

      <div
        className="relative text-[#231f20]"
        style={{
          background: "#f2efeb",
          display: introComplete ? "block" : "none",
        }}
      >
        <Navbar />

        <div ref={containerRef} className="relative">
          {/* Hero Section - Magazine Style */}
          <HeroSection introComplete={introComplete} />

          {/* Trust Pillars - Editorial Layout */}
          <TrustSections />

          {/* Final CTA */}
          <FinalCTA />

          <FooterSection />
        </div>
      </div>
    </>
  )
}

// Magazine-Style Hero Section with EPIC entrance animation
function HeroSection({ introComplete }: { introComplete: boolean }) {
  const ref = useRef(null)
  const { isMobile, prefersReducedMotion } = useMobileDetect()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 100 : 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 200 : 400])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Character-by-character animation for the title
  const titleWords = ["WHY", "CLIENTS", "TRUST", "US"]

  // Reduce animation complexity on mobile
  const animationDelay = isMobile ? 0.1 : 0.04
  const lightRaysCount = isMobile ? 1 : 3

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: y1 }}
          initial={{ scale: 1.2, opacity: 0, filter: "blur(30px)" }}
          animate={
            introComplete
              ? { scale: 1.7, opacity: 1, filter: "blur(0px)" }
              : { scale: 1.5, opacity: 0, filter: "blur(30px)" }
          }
          transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <Image
            src="https://i.ibb.co/v2Fsm5L/wesley-tingey-KJgkq-Qcdyn-Q-unsplash.jpg"
            alt="Legal Library"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#f2efeb]/90 via-[#f2efeb]/60 to-[#f2efeb]"
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 0.2 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
      </div>

      {/* Dramatic light rays - conditional on intro completion */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <motion.div
          className="absolute top-0 left-1/4 w-[2px] h-0 bg-[#3fbfbc]"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 2, delay: 1.2, ease: [0.25, 1, 0.5, 1] }}
        />

        {/* Only show these on desktop */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 right-1/3 w-[1px] h-0 bg-[#3fbfbc]"
              initial={{ height: 0 }}
              animate={{ height: "70%" }}
              transition={{ duration: 1.5, delay: 1.5, ease: [0.25, 1, 0.5, 1] }}
            />
            <motion.div
              className="absolute top-1/4 left-1/2 w-[1px] h-0 bg-[#3fbfbc]"
              initial={{ height: 0 }}
              animate={{ height: "50%" }}
              transition={{ duration: 1.2, delay: 1.8, ease: [0.25, 1, 0.5, 1] }}
            />
          </>
        )}
      </motion.div>

      {/* Magazine-style layout with grid - conditional animations */}
      <motion.div className="container mx-auto px-4 relative z-10 pt-20 md:pt-24" style={{ opacity, scale }}>
        <div className="grid grid-cols-12 gap-4">
          {/* Left column - Large heading with EPIC character animation */}
          <div className="col-span-12 lg:col-span-7 mb-10 lg:mb-0">
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="h-1 bg-[#3fbfbc] mb-4"
              />

              <div className="overflow-hidden mb-6">
                {titleWords.map((word, wordIndex) => (
                  <div key={wordIndex} className="overflow-hidden">
                    <div className="flex flex-wrap">
                      {Array.from(word).map((char, charIndex) => (
                        <motion.span
                          key={`${wordIndex}-${charIndex}`}
                          className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-none inline-block ${
                            wordIndex === 1 ? "text-[#3fbfbc]" : "text-[#231f20]"
                          }`}
                          initial={{
                            y: 100,
                            opacity: 0,
                            rotateX: 90,
                            filter: "blur(10px)",
                          }}
                          animate={{
                            y: 0,
                            opacity: 1,
                            rotateX: 0,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.3 + wordIndex * 0.2 + charIndex * (isMobile ? 0.02 : 0.04),
                            ease: [0.25, 1, 0.5, 1],
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="max-w-xl overflow-hidden">
                <motion.p
                  className="text-base md:text-xl text-[#231f20]/80 leading-relaxed"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.8, ease: [0.25, 1, 0.5, 1] }}
                >
                  At Dr Youssef Elekyabi Law Firm, trust is earned through consistent excellence, deep expertise, and
                  unwavering commitment to our clients' success.
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Right column - Overlapping panels with dramatic reveal */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative">
              <motion.div
                className="absolute -top-5 -left-5 md:-top-10 md:-left-10 w-full h-[200px] md:h-[300px] border border-[#3fbfbc]/20"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.25, 1, 0.5, 1] }}
              />

              <motion.div
                className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden"
                initial={{
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
                  filter: "grayscale(100%)",
                }}
                animate={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  filter: "grayscale(0%)",
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.5,
                  ease: [0.25, 1, 0.5, 1],
                  filter: { delay: 2, duration: 1 },
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1677641905377-e3f6087b8b7a?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Courtroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#f2efeb] to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                />

                <motion.div
                  className="absolute bottom-0 left-0 w-full p-4 md:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                >
                  <p className="text-sm md:text-lg font-light italic text-[#231f20]">
                    "Excellence in legal practice is not just what we do—it's who we are."
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom row with stats - Dramatic counter animation */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ArrowRight size={24} className="rotate-90 text-[#3fbfbc]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Animated counter component for statistics
function StatCounter({
  value,
  suffix = "",
  label,
  delay = 0,
}: { value: number; suffix?: string; label: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const { isMobile } = useMobileDetect()

  useEffect(() => {
    if (hasAnimated || typeof window === "undefined") return

    const timer = setTimeout(() => {
      let start = 0
      const duration = isMobile ? 1000 : 1500 // Shorter duration on mobile
      const step = 1000 / 60 // 60fps
      const increment = value / (duration / step)

      const interval = setInterval(() => {
        start += increment
        if (start >= value) {
          setCount(value)
          clearInterval(interval)
        } else {
          setCount(Math.floor(start))
        }
      }, step)

      setHasAnimated(true)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay, hasAnimated, isMobile])

  return (
    <div className="text-center sm:text-left py-4 sm:py-0">
      <motion.div
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3fbfbc] mb-2"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      >
        {count}
        {suffix}
      </motion.div>
      <motion.div
        className="text-sm md:text-base text-[#231f20]/60"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      >
        {label}
      </motion.div>
    </div>
  )
}

// Editorial Layout Trust Sections
function TrustSections() {
  const sections = [
    {
      id: "judicial-insight",
      title: "Judicial Insight",
      content:
        "We bring decades of experience from the highest levels of Bahrain's judiciary and legal profession, including former judges who understand the system from the inside.",
      image:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Scale className="h-8 w-8 md:h-12 md:w-12" />,
      position: "right",
    },
    {
      id: "results-driven",
      title: "Results-Driven Advocacy",
      content:
        "We don't waste time—or our clients' money. Our focus is on strategy, substance, and delivering outcomes. Every action we take is deliberate, and every update matters.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Briefcase className="h-8 w-8 md:h-12 md:w-12" />,
      position: "left",
    },
    {
      id: "proven-success",
      title: "Proven Success",
      content:
        "Our track record speaks for itself—favorable court judgments, strategic settlements, and successful enforcement across a wide range of disputes and sectors.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Award className="h-8 w-8 md:h-12 md:w-12" />,
      position: "right",
    },
    {
      id: "quiet-strength",
      title: "Quiet Strength",
      content:
        "We deliver results without noise. No theatrics— Just relentless, well-prepared advocacy backed by facts, law, and insight.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Shield className="h-8 w-8 md:h-12 md:w-12" />,
      position: "left",
    },
  ]

  return (
    <section className="pt-12 md:pt-20 pb-12 md:pb-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="editorial-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#editorial-grid)" />
        </svg>
      </div>

      {/* Sections */}
      <div className="container mx-auto px-4">
        {sections.map((section, index) => (
          <EditorialTrustBlock
            key={section.id}
            title={section.title}
            content={section.content}
            image={section.image}
            icon={section.icon}
            position={section.position}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

// Editorial style block component
function EditorialTrustBlock({
  title,
  content,
  image,
  icon,
  position,
  index,
}: {
  title: string
  content: string
  image: string
  icon: React.ReactNode
  position: "left" | "right"
  index: number
}) {
  const ref = useRef(null)
  const { isMobile, prefersReducedMotion } = useMobileDetect()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Simpler animations for mobile or reduced motion preference
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile || prefersReducedMotion ? [0, 0, 0] : position === "left" ? [-100, 0, -50] : [100, 0, 50],
  )

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.3])

  const imageX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile || prefersReducedMotion ? [0, 0, 0] : position === "left" ? [100, 0, 50] : [-100, 0, -50],
  )

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile || prefersReducedMotion ? [0, 0, 0] : [position === "left" ? -10 : 10, 0, position === "left" ? 5 : -5],
  )

  return (
    <div
      ref={ref}
      className={`py-16 md:py-32 flex flex-col ${position === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
    >
      {/* Image */}
      <motion.div
        className="w-full md:w-1/2"
        style={{
          x: imageX,
          opacity,
          rotate: isMobile ? 0 : rotate,
        }}
      >
        <div className="relative overflow-hidden h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px]">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-${position === "left" ? "r" : "l"} from-[#f2efeb] to-transparent`}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="w-full md:w-1/2"
        style={{
          x,
          opacity,
        }}
      >
        <div className="mb-4 md:mb-6 text-[#3fbfbc]">{icon}</div>

        <div className="flex items-center space-x-4 mb-2 md:mb-4">
          <span className="text-4xl md:text-6xl font-black text-[#231f20]/10">0{index + 1}</span>
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold">{title}</h3>
        </div>

        <div className="h-1 w-20 bg-[#3fbfbc] mb-4 md:mb-6" />

        <p className="text-base md:text-xl text-[#231f20]/80 leading-relaxed mb-4 md:mb-6">{content}</p>

        <div className="mt-4 md:mt-8">
          <div className="inline-flex items-center space-x-4 group cursor-pointer">
            <span className="text-[#3fbfbc] group-hover:text-[#231f20] transition-colors duration-300">Learn More</span>
            <ArrowRight className="h-4 w-4 text-[#3fbfbc] transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Final CTA Section with Floating Particles
function FinalCTA() {
  const ref = useRef(null)
  const { isMobile } = useMobileDetect()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  // Reduce particle count on mobile
  const particleCount = isMobile ? 8 : 20

  return (
    <section ref={ref} className="py-12 md:py-20 min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Legal Consultation"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #f2efeb, #f2efeb95)" }} />
      </div>

      {/* Floating particles - reduced for mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "rgba(63, 191, 188, 0.3)" : "rgba(255, 255, 255, 0.2)",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50), 0],
              opacity: [0.2, Math.random() * 0.6 + 0.2, 0.2],
            }}
            transition={{
              duration: Math.random() * (isMobile ? 5 : 8) + (isMobile ? 3 : 5),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div className="container mx-auto px-4 relative z-10" style={{ opacity, scale }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            Ready for <span className="text-[#3fbfbc]">Expert Counsel?</span>
          </motion.h2>

          <motion.div
            className="h-0.5 w-0 bg-gradient-to-r from-transparent via-[#3fbfbc] to-transparent mx-auto mb-6 md:mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: "150px" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />

          <motion.p
            className="text-base md:text-xl text-[#231f20]/70 mb-8 md:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Partner with a law firm that truly understands Bahrain's legal landscape and is committed to your success.
            Our team of experienced legal professionals is ready to provide the strategic guidance and representation
            you need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="bg-[#3fbfbc] text-[#0a0a0a] px-6 py-3 md:px-8 md:py-4 font-bold text-base md:text-lg inline-flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -bottom-20 -left-20 w-20 h-20 md:w-40 md:h-40 border border-[#3fbfbc]/10"
            style={{ rotate: 45 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          <motion.div
            className="absolute -top-20 -right-20 w-20 h-20 md:w-40 md:h-40 border border-[#3fbfbc]/10"
            style={{ rotate: 15 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 1 }}
          />
        </div>
      </motion.div>
    </section>
  )
}
