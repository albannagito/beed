"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import Navbar from "@/components/navbar"
import FoundersSection from "@/components/founders-section"
import CinematicFinalSection from "@/components/cinematic-final-section"
import FooterSection from "@/components/footer-section"
import Image from "next/image"
import EpicPreLoader from "@/components/epic-preloader"
import { useIsMobile } from "@/hooks/use-mobile"

export default function LawFirmLanding() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Track if we've scrolled past the hero section
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [backgroundLocked, setBackgroundLocked] = useState(false)
  const [contentAnimationStarted, setContentAnimationStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false)
  const [animationSequence, setAnimationSequence] = useState(0)
  const [inHeroSection, setInHeroSection] = useState(true)

  const isMobile = useIsMobile()

  // Scroll progress for the hero section to control parallax effect
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Scroll progress for the about section
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"],
  })

  // Add a smoother spring animation for the background - Optimized for mobile
  const smoothScrollProgress = useSpring(aboutScrollProgress, {
    stiffness: isMobile ? 30 : 50,
    damping: isMobile ? 20 : 15,
    restDelta: 0.001,
  })

  // Smooth spring for background entrance - Optimized for mobile
  const backgroundY = useSpring(useTransform(smoothScrollProgress, [0, 0.3], ["40%", "0%"]), {
    stiffness: isMobile ? 30 : 50,
    damping: isMobile ? 20 : 15,
  })

  const backgroundScale = useSpring(useTransform(smoothScrollProgress, [0, 0.3], [1.3, 1]), {
    stiffness: isMobile ? 30 : 50,
    damping: isMobile ? 20 : 15,
  })

  const backgroundOpacity = useSpring(useTransform(smoothScrollProgress, [0, 0.3], [0, 1]), {
    stiffness: isMobile ? 30 : 50,
    damping: isMobile ? 20 : 15,
  })

  // Content animation progress tied to scroll
  const contentAnimationProgress = useTransform(smoothScrollProgress, [0.3, 0.9], [0, 1])

  // Extended zoom progress that continues beyond content animations
  const extendedZoomProgress = useTransform(smoothScrollProgress, [0.3, 1.0], [0, 1])
  const backgroundZoom = useTransform(extendedZoomProgress, [0, 1], [1, isMobile ? 1.4 : 1.8])

  // Hero section parallax effects - Reduced on mobile
  const heroParallaxY1 = useTransform(heroScrollProgress, [0, 1], ["0%", isMobile ? "25%" : "50%"])
  const heroParallaxY2 = useTransform(heroScrollProgress, [0, 1], ["0%", isMobile ? "15%" : "25%"])
  const heroParallaxY3 = useTransform(heroScrollProgress, [0, 1], ["0%", isMobile ? "10%" : "15%"])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0])

  // Monitor scroll progress to trigger state changes
  useMotionValueEvent(aboutScrollProgress, "change", (latest) => {
    if (latest > 0.05 && !scrolledPastHero) {
      setScrolledPastHero(true)
    } else if (latest <= 0.05 && scrolledPastHero) {
      setScrolledPastHero(false)
    }

    if (latest > 0.3 && !backgroundLocked) {
      setBackgroundLocked(true)
    } else if (latest <= 0.3 && backgroundLocked) {
      setBackgroundLocked(false)
    }

    if (latest > 0.3 && !contentAnimationStarted) {
      setContentAnimationStarted(true)
    } else if (latest <= 0.3 && contentAnimationStarted) {
      setContentAnimationStarted(false)
    }
  })

  // Replace the useMotionValueEvent for heroScrollProgress with this more reliable implementation:
  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section's height and position
      const heroSection = heroRef.current
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect()
        // If the hero section is mostly scrolled out of view, change logo to black
        if (heroRect.bottom < 100) {
          setInHeroSection(false)
        } else {
          setInHeroSection(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Remove the previous useMotionValueEvent for heroScrollProgress that was changing inHeroSection

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleCanPlay = () => {
        setVideoLoaded(true)
      }

      const handleError = () => {
        console.warn("Video failed to load, falling back to image")
        setVideoLoaded(true)
      }

      video.addEventListener("canplay", handleCanPlay)
      video.addEventListener("error", handleError)

      if (video.readyState >= 3) {
        setVideoLoaded(true)
      }

      video.load()

      return () => {
        video.removeEventListener("canplay", handleCanPlay)
        video.removeEventListener("error", handleError)
      }
    }

    // Sequence the animations
    if (!isLoading) {
      const sequence1 = setTimeout(() => setAnimationSequence(1), 300)
      const sequence2 = setTimeout(() => setAnimationSequence(2), 1200)
      const sequence3 = setTimeout(() => setAnimationSequence(3), 2200)
      const sequence4 = setTimeout(() => setAnimationSequence(4), 3200)
      const sequence5 = setTimeout(() => setAnimationSequence(5), 4200)

      // Set animation complete after the timeline finishes
      const completeTimer = setTimeout(() => {
        setHeroAnimationComplete(true)
      }, 5000)

      return () => {
        clearTimeout(sequence1)
        clearTimeout(sequence2)
        clearTimeout(sequence3)
        clearTimeout(sequence4)
        clearTimeout(sequence5)
        clearTimeout(completeTimer)
      }
    }
  }, [isLoading])

  return (
    <div ref={containerRef} className="relative bg-[#f2efeb] text-[#231f20]" style={{ touchAction: "pan-y" }}>
      {isLoading && <EpicPreLoader onLoadingComplete={() => setIsLoading(false)} />}
      <Navbar isLoading={isLoading} inHeroSection={inHeroSection} />

      {/* Main container with sticky hero and scrollable content */}
      <div className="relative">
        {/* ✨ REIMAGINED EPIC & ARTISTIC HERO SECTION ✨ */}
        <section
          ref={heroRef}
          className="min-h-[100svh] sticky top-0 left-0 right-0 overflow-hidden flex items-center justify-center relative bg-[#0a0a0a]"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          {/* Epic Background Layer - Dark Artistic Background with Reveal */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background Image with Parallax Effect */}
            <motion.div className="absolute inset-0 w-full h-full" style={{ y: heroParallaxY1, opacity: heroOpacity }}>
              <Image
                src="https://i.ibb.co/8gw8rTsg/ioooo-modified.jpg"
                alt="Modern office interior"
                fill
                className="object-cover opacity-80"
                priority
              />

              {/* Subtle dark overlay for text readability */}
              <div className="absolute inset-0 bg-[#0a0a0a]/25" />

              {/* Artistic Gradient Overlay - Cinematic Feel */}
              {/* <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a]/90" /> */}

              {/* Dynamic Light Rays - Cinematic Beams */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={animationSequence >= 2 ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="absolute -top-[50%] -left-[10%] w-[120%] h-[200%] bg-gradient-to-b from-[#3fbfbc]/10 to-transparent"
                  style={{
                    rotate: -30,
                    transformOrigin: "top left",
                  }}
                  initial={{ scaleY: 0 }}
                  animate={animationSequence >= 2 ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </motion.div>

            {/* Artistic Pattern Overlay */}
            <motion.div
              className="absolute inset-0 mix-blend-soft-light opacity-20"
              style={{ y: heroParallaxY3 }}
              initial={{ opacity: 0 }}
              animate={animationSequence >= 3 ? { opacity: 0.2 } : { opacity: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 w-full h-full">
                {Array.from({ length: 72 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="border-[0.5px] border-white/10"
                    initial={{ opacity: 0 }}
                    animate={animationSequence >= 3 ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: (i % 20) * 0.02 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content Container */}
          <div className="relative z-10 w-full h-full flex flex-col">
            {/* Top Artistic Border */}
            <motion.div
              className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#3fbfbc]/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={animationSequence >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Main Content Area with Artistic Layout - Improved for Mobile */}
            <div className="flex-1 grid grid-cols-12 gap-0">
              {/* Left Column - Artistic Accent - Hidden on mobile */}
              <motion.div
                className="hidden sm:block col-span-0 sm:col-span-1 md:col-span-2 border-r border-[#3fbfbc]/10 relative"
                initial={{ opacity: 0 }}
                animate={animationSequence >= 2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="absolute top-0 right-0 w-[1px] h-full"
                  initial={{ scaleY: 0, background: "linear-gradient(to bottom, transparent, #3fbfbc20, transparent)" }}
                  animate={animationSequence >= 2 ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Vertical Accent Text */}
                <motion.div
                  className="absolute top-1/2 left-4 -translate-y-1/2 origin-left -rotate-90"
                  initial={{ opacity: 0 }}
                  animate={animationSequence >= 3 ? { opacity: 0.6 } : { opacity: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[#3fbfbc]/60 text-xs tracking-[0.3em] uppercase whitespace-nowrap">
                    Established Excellence
                  </span>
                </motion.div>
              </motion.div>

              {/* Center Column - Main Content with Artistic Layout - Full width on mobile */}
              <div className="col-span-12 sm:col-span-10 md:col-span-8 flex flex-col justify-center items-center px-4 py-16 sm:py-20">
                {/* Main Content with Artistic Arrangement */}
                <div className="mx-auto" style={{ width: "max-content" }}>
                  {/* Top Tagline with Mask Reveal */}
                  <div className="overflow-hidden mb-6 sm:mb-8 md:mb-12">
                    <motion.div
                      className="text-center"
                      initial={{ y: 40, opacity: 0 }}
                      animate={animationSequence >= 1 ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="text-[#3fbfbc] text-xs sm:text-sm md:text-base font-medium tracking-[0.5em] uppercase block">
                        Bahrain's Premier Legal Practice
                      </span>
                    </motion.div>
                  </div>

                  {/* Main Name with Big Blur to Clear Animation */}
                  <div className="relative mb-8 sm:mb-12 md:mb-16">
                    {/* DR YOUSSEF - Big Blur to Clear */}
                    <div className="overflow-hidden mb-2 sm:mb-4 relative">
                      <div className="flex justify-center items-baseline">
                        <motion.span
                          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight mr-2 sm:mr-3 md:mr-4 text-white"
                          initial={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                          animate={
                            animationSequence >= 2
                              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                              : { opacity: 0, scale: 2, filter: "blur(20px)" }
                          }
                          transition={{
                            duration: 1.5,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          Dr
                        </motion.span>
                        <motion.span
                          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight text-[#3fbfbc]"
                          initial={{ opacity: 0, scale: 2.5, filter: "blur(30px)" }}
                          animate={
                            animationSequence >= 2
                              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                              : { opacity: 0, scale: 2.5, filter: "blur(30px)" }
                          }
                          transition={{
                            duration: 1.8,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          YOUSSEF
                        </motion.span>
                      </div>
                    </div>

                    {/* ELEKYABI - Big Blur to Clear */}
                    <div className="overflow-hidden relative">
                      <motion.h1
                        className="text-center whitespace-nowrap text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight text-white"
                        initial={{ opacity: 0, scale: 3, filter: "blur(40px)" }}
                        animate={
                          animationSequence >= 2
                            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                            : { opacity: 0, scale: 3, filter: "blur(40px)" }
                        }
                        transition={{
                          duration: 2,
                          delay: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        ELEKYABI
                      </motion.h1>
                    </div>

                    {/* Artistic Accent Line */}
                    <motion.div
                      className="mt-6 md:mt-8 flex justify-center items-center"
                      initial={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
                      animate={
                        animationSequence >= 3
                          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                          : { opacity: 0, scale: 0, filter: "blur(10px)" }
                      }
                      transition={{
                        duration: 1.2,
                        delay: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <motion.div
                        className="w-[30px] h-[1px] bg-[#3fbfbc]/50"
                        initial={{ scaleX: 0 }}
                        animate={animationSequence >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.div
                        className="w-[6px] h-[6px] rounded-full bg-[#3fbfbc] mx-3"
                        initial={{ scale: 0 }}
                        animate={animationSequence >= 3 ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.div
                        className="w-[80px] xs:w-[100px] sm:w-[120px] md:w-[160px] h-[1px] bg-[#3fbfbc]"
                        initial={{ scaleX: 0 }}
                        animate={animationSequence >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.div
                        className="w-[6px] h-[6px] rounded-full bg-[#3fbfbc] mx-3"
                        initial={{ scale: 0 }}
                        animate={animationSequence >= 3 ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.div
                        className="w-[30px] h-[1px] bg-[#3fbfbc]/50"
                        initial={{ scaleX: 0 }}
                        animate={animationSequence >= 3 ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </motion.div>
                  </div>

                  {/* Tagline with Staggered Entrance - Improved for mobile */}
                  <div className="text-center mb-10 sm:mb-12 md:mb-16 overflow-hidden">
                    <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 md:gap-x-6">
                      <motion.div className="overflow-hidden">
                        <motion.span
                          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-[#3fbfbc] font-bold inline-block"
                          initial={{ y: 80, opacity: 0 }}
                          animate={animationSequence >= 3 ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                          Clarity.
                        </motion.span>
                      </motion.div>
                      <motion.div className="overflow-hidden">
                        <motion.span
                          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-white font-medium inline-block"
                          initial={{ y: 80, opacity: 0 }}
                          animate={animationSequence >= 3 ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
                          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                          Authority.
                        </motion.span>
                      </motion.div>
                      <motion.div className="overflow-hidden">
                        <motion.span
                          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-white italic inline-block"
                          initial={{ y: 80, opacity: 0 }}
                          animate={animationSequence >= 3 ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
                          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          Results.
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Main Content with Better Text Placement - No Background */}
                  <motion.div
                    className="relative mb-6 sm:mb-8 md:mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    animate={animationSequence >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Content with Clean Layout - No Glass Panel Background */}
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                      {/* First paragraph - Clean and prominent - NOWRAP */}
                      <motion.p
                        className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight text-white mb-6 sm:mb-8 whitespace-nowrap overflow-hidden text-ellipsis px-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={animationSequence >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        You need{" "}
                        <motion.span
                          className="text-[#3fbfbc] font-bold relative"
                          initial={{ opacity: 0 }}
                          animate={animationSequence >= 4 ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          clean,
                        </motion.span>{" "}
                        <span className="font-medium">accessible</span> legal solutions.
                      </motion.p>

                      {/* Second paragraph - Elegant spacing */}
                      <motion.p
                        className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light leading-tight text-white/95"
                        initial={{ opacity: 0, y: 30 }}
                        animate={animationSequence >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        We{" "}
                        <motion.span
                          className="italic text-[#3fbfbc] font-medium"
                          initial={{ opacity: 0 }}
                          animate={animationSequence >= 4 ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          get it
                        </motion.span>
                        —and that's <span className="font-bold">exactly</span> what we{" "}
                        <span className="relative">
                          <span className="relative z-10">deliver</span>
                          <motion.span
                            className="absolute bottom-0 left-0 h-[1px] sm:h-[2px] bg-[#3fbfbc] w-full"
                            initial={{ scaleX: 0 }}
                            animate={animationSequence >= 5 ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </span>
                        .
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Right Column - Artistic Accent - Hidden on mobile */}
              <motion.div
                className="hidden sm:block col-span-0 sm:col-span-1 md:col-span-2 border-l border-[#3fbfbc]/10 relative"
                initial={{ opacity: 0 }}
                animate={animationSequence >= 2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-[1px] h-full"
                  initial={{ scaleY: 0, background: "linear-gradient(to bottom, transparent, #3fbfbc20, transparent)" }}
                  animate={animationSequence >= 2 ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Vertical Accent Text */}
                <motion.div
                  className="absolute top-1/2 right-4 -translate-y-1/2 origin-right rotate-90"
                  initial={{ opacity: 0 }}
                  animate={animationSequence >= 3 ? { opacity: 0.6 } : { opacity: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[#3fbfbc]/60 text-xs tracking-[0.3em] uppercase whitespace-nowrap">
                    Legal Excellence
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom Artistic Border */}
            <motion.div
              className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#3fbfbc]/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={animationSequence >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </section>

        {/* About Section - RESTORED TO ORIGINAL */}
        <section ref={aboutSectionRef} className="relative z-20">
          {/* Sticky container that will lock the background in place */}
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Background image with extended zoom effect */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1680745749678-33c491e741fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                scale: backgroundZoom,
                transformOrigin: "center center",
              }}
            />

            {/* Elegant overlay with subtle patterns */}
            <>
              <motion.div
                className="absolute inset-0 bg-[#231f20]/2"
                style={{
                  opacity: useTransform(contentAnimationProgress, [0, 0.2], [0, 1]),
                }}
              />
              <motion.div
                className="absolute inset-0 bg-radial-gradient"
                style={{
                  background: "radial-gradient(circle, transparent 40%, rgba(35, 31, 32, 0.1) 100%)",
                  opacity: useTransform(contentAnimationProgress, [0, 0.3], [0, 1]),
                }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 200px rgba(63, 191, 188, 0.1)",
                  opacity: useTransform(contentAnimationProgress, [0, 0.3], [0, 1]),
                }}
              />
            </>

            {/* Add a cinematic light ray effect - Adjusted color to match the teal accent in the image */}
            <motion.div
              className="absolute top-0 left-1/4 w-1/2 h-full pointer-events-none overflow-hidden"
              style={{
                opacity: useTransform(contentAnimationProgress, [0.2, 0.4], [0, 0.3]),
              }}
            >
              <motion.div
                className="w-[200px] h-[2000px] bg-[#3fbfbc]/40 blur-[100px] absolute"
                style={{
                  rotate: -45,
                  top: "-500px",
                  left: "50%",
                  transformOrigin: "center",
                  y: useTransform(contentAnimationProgress, [0.2, 1], ["-100%", "100%"]),
                }}
              />
            </motion.div>

            {/* Content container with scroll-controlled animations */}
            <motion.div
              ref={aboutContentRef}
              className="relative z-10 h-full w-full container mx-auto px-4 flex flex-col justify-center"
              style={{
                opacity: 1,
              }}
            >
              {/* Artistic content layout with improved text readability */}
              <div className="max-w-6xl mx-auto relative">
                {/* Semi-transparent background for better text readability */}
                <motion.div
                  className="absolute inset-0 bg-[#f2efeb]/30 backdrop-blur-sm rounded-lg -m-6 p-6"
                  style={{
                    opacity: useTransform(contentAnimationProgress, [0, 0.2], [0, 1]),
                  }}
                ></motion.div>

                {/* Logo with enhanced animation */}
                <motion.div
                  className="mb-12 flex justify-center"
                  style={{
                    opacity: useTransform(contentAnimationProgress, [0, 0.15], [0, 1]),
                    y: useTransform(contentAnimationProgress, [0, 0.15], [80, 0]),
                    scale: useTransform(contentAnimationProgress, [0, 0.15], [0.8, 1]),
                    filter: useTransform(contentAnimationProgress, [0, 0.15], ["blur(10px)", "blur(0px)"]),
                  }}
                ></motion.div>

                {/* Main heading with enhanced artistic typography */}
                <div className="mb-16 relative">
                  <motion.h2
                    className="text-[#3fbfbc] text-sm tracking-[0.3em] uppercase font-medium mb-4 relative z-10 drop-shadow-sm"
                    style={{
                      opacity: useTransform(contentAnimationProgress, [0.15, 0.25], [0, 1]),
                      y: useTransform(contentAnimationProgress, [0.15, 0.25], [50, 0]),
                      filter: useTransform(contentAnimationProgress, [0.15, 0.25], ["blur(5px)", "blur(0px)"]),
                    }}
                  >
                    Established Excellence
                  </motion.h2>

                  <motion.div
                    className="overflow-hidden"
                    style={{
                      opacity: useTransform(contentAnimationProgress, [0.25, 0.35], [0, 1]),
                    }}
                  >
                    <motion.h3
                      className="text-[#231f20] text-7xl md:text-9xl font-bold leading-none relative z-10 drop-shadow-sm"
                      style={{
                        y: useTransform(contentAnimationProgress, [0.25, 0.35], [150, 0]),
                        scale: useTransform(contentAnimationProgress, [0.25, 0.35], [0.9, 1]),
                        filter: useTransform(contentAnimationProgress, [0.25, 0.35], ["blur(15px)", "blur(0px)"]),
                      }}
                    >
                      ELEKYABI
                    </motion.h3>
                  </motion.div>
                </div>

                {/* Main content with enhanced artistic layout */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Left column - Large statement with enhanced animation */}
                  <motion.div
                    className="col-span-12 md:col-span-5"
                    style={{
                      opacity: useTransform(contentAnimationProgress, [0.35, 0.45], [0, 1]),
                      x: useTransform(contentAnimationProgress, [0.35, 0.45], [-80, 0]),
                      filter: useTransform(contentAnimationProgress, [0.35, 0.45], ["blur(8px)", "blur(0px)"]),
                    }}
                  >
                    <h4 className="text-[#231f20] text-4xl md:text-5xl font-light leading-tight relative z-10 drop-shadow-sm">
                      <span className="text-[#3fbfbc] font-bold">75+</span> years of <br />
                      <span className="font-bold">combined</span> <br />
                      legal <span className="italic">excellence</span>
                    </h4>
                  </motion.div>

                  {/* Right column - Description with enhanced animation */}
                  <motion.div
                    className="col-span-12 md:col-span-7 md:pl-12 border-l border-[#3fbfbc]/30"
                    style={{
                      opacity: useTransform(contentAnimationProgress, [0.45, 0.55], [0, 1]),
                      x: useTransform(contentAnimationProgress, [0.45, 0.55], [80, 0]),
                      filter: useTransform(contentAnimationProgress, [0.45, 0.55], ["blur(8px)", "blur(0px)"]),
                    }}
                  >
                    <motion.p
                      className="text-[#231f20] text-lg md:text-xl leading-relaxed mb-8 relative z-10 font-medium drop-shadow-sm"
                      style={{
                        opacity: useTransform(contentAnimationProgress, [0.45, 0.55], [0, 1]),
                        y: useTransform(contentAnimationProgress, [0.45, 0.55], [30, 0]),
                      }}
                    >
                      <span className="text-[#3fbfbc] font-bold text-2xl md:text-3xl">
                        Dr Youssef Elekyabi Law Firm
                      </span>{" "}
                      is a premier Bahrain-based legal practice offering strategic, results-oriented counsel across a
                      full spectrum of legal services.
                    </motion.p>

                    <motion.p
                      className="text-[#231f20] text-base md:text-lg leading-relaxed mb-12 relative z-10 font-medium drop-shadow-sm"
                      style={{
                        opacity: useTransform(contentAnimationProgress, [0.5, 0.6], [0, 1]),
                        y: useTransform(contentAnimationProgress, [0.5, 0.6], [30, 0]),
                      }}
                    >
                      With more than 75 years of combined experience, the firm is co-led by two of Bahrain's most
                      respected legal figures.
                    </motion.p>

                    <motion.div
                      style={{
                        opacity: useTransform(contentAnimationProgress, [0.6, 0.7], [0, 1]),
                        y: useTransform(contentAnimationProgress, [0.6, 0.7], [50, 0]),
                        scale: useTransform(contentAnimationProgress, [0.6, 0.7], [0.9, 1]),
                      }}
                    >
                      <button
                        className="group relative overflow-hidden bg-white/90 hover:bg-[#3fbfbc] text-[#3fbfbc] hover:text-white border-2 border-[#3fbfbc] rounded-xl px-10 py-4 text-lg font-semibold tracking-wide transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:shadow-[#3fbfbc]/25 transform hover:scale-105 active:scale-95 backdrop-blur-sm"
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById("founders-section")?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Our Legacy
                          <svg
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                      </button>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom artistic elements with enhanced animation */}
                <motion.div
                  className="mt-12 flex justify-between items-end"
                  style={{
                    opacity: useTransform(contentAnimationProgress, [0.7, 0.85], [0, 1]),
                    y: useTransform(contentAnimationProgress, [0.7, 0.85], [40, 0]),
                    filter: useTransform(contentAnimationProgress, [0.7, 0.85], ["blur(5px)", "blur(0px)"]),
                  }}
                >
                  <div className="w-1/3">
                    <div className="h-[2px] bg-[#3fbfbc]/50 w-full"></div>
                  </div>

                  <div className="text-[#231f20]/60 text-[0.5rem] xs:text-[0.6rem] sm:text-xs tracking-normal xs:tracking-wide sm:tracking-widest uppercase text-center px-2">
                    Bahrain's Premier Legal Practice
                  </div>

                  <div className="w-1/3">
                    <div className="h-[2px] bg-[#3fbfbc]/50 w-full"></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* This empty div creates the space needed to scroll past the sticky section */}
          <div className="h-[200vh]"></div>
        </section>

        <FoundersSection />
        <CinematicFinalSection />
        <FooterSection />
      </div>
    </div>
  )
}
