"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import Link from "next/link"

interface NavbarProps {
  isLoading?: boolean
  inHeroSection?: boolean
}

export default function Navbar({ isLoading = false, inHeroSection = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [language, setLanguage] = useState("EN")
  const menuRef = useRef<HTMLDivElement>(null)

  // Track scroll position for menu button styling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const navItems = [
    {
      name: "Home",
      href: "/",
      description: "Return to our elegant homepage",
    },
    {
      name: "About Us",
      href: "/about",
      description: "Discover our story and expertise",
    },
    {
      name: "What We Do",
      href: "/what-we-do",
      description: "Explore our comprehensive legal services",
    },
    {
      name: "Why Clients Trust Us",
      href: "/why-clients-trust-us",
      description: "Our commitment to excellence and results",
    },
    {
      name: "Giving Back",
      href: "#",
      description: "Our contributions to the community",
    },
  ]

  // Staggered animation variants for menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  // Artistic background animations
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 0.8,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 1.5,
        ease: "easeOut",
      },
    }),
  }

  // Handle menu item click with smooth scroll for same-page links
  const handleItemClick = (href: string) => {
    setMenuOpen(false)

    // Check if it's a same-page link with a hash
    if (href.startsWith("#")) {
      // Allow time for animation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 500)
    } else {
      // For different page navigation, use normal navigation
      setTimeout(() => {
        window.location.href = href
      }, 500)
    }
  }

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
  }

  return (
    <>
      {/* Menu Trigger Button with Logo Only - NO BACKGROUND */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-8 transition-all duration-500",
          "bg-transparent", // Always transparent background
        )}
      >
        {/* Logo - Left Side - Only visible when menu is closed - WITH ENTRANCE ANIMATION */}
        {!menuOpen && (
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <Link href="/">
              <div className="relative overflow-hidden transition-all duration-300 h-10 w-10 md:h-12 md:w-12">
                <Image
                  src="/images/logo.png"
                  alt="Elekyabi Law Firm Logo"
                  fill
                  className="object-contain transition-transform duration-500"
                  style={{
                    filter: inHeroSection ? "brightness(10)" : "brightness(0)",
                    transition: "filter 0.3s ease-in-out",
                  }}
                />
              </div>
            </Link>
          </motion.div>
        )}

        {/* Empty div to maintain layout when logo is hidden */}
        {menuOpen && <div className="h-10 w-10 md:h-12 md:w-12"></div>}

        {/* Simplified Premium Menu Toggle Button - WITH ENTRANCE ANIMATION */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "relative flex items-center justify-center w-14 h-14 md:w-14 md:h-14 rounded-full transition-all duration-500",
              menuOpen ? "bg-[#f2efeb]" : "bg-[#231f20]/30 backdrop-blur-sm",
            )}
            aria-label="Toggle menu"
          >
            {/* Simplified premium hamburger icon */}
            <div className="relative w-7 md:w-7 h-7 md:h-7">
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-[2px] rounded-full transition-all duration-500 transform-gpu",
                  menuOpen ? "top-1/2 -mt-px rotate-45 bg-[#231f20]" : "bg-[#f2efeb]",
                )}
              />
              <div
                className={cn(
                  "absolute top-1/2 left-0 right-0 h-[2px] rounded-full transition-all duration-500 transform-gpu",
                  menuOpen ? "opacity-0 bg-[#231f20]" : "bg-[#f2efeb] -mt-px",
                )}
              />
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all duration-500 transform-gpu",
                  menuOpen ? "top-1/2 -mt-px -rotate-45 bg-[#231f20]" : "bg-[#f2efeb]",
                )}
              />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-40 flex flex-col h-[100dvh]"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
              visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
            }}
          >
            {/* Solid Background - No transparency */}
            <motion.div className="absolute inset-0 bg-[#f2efeb] overflow-hidden" variants={backgroundVariants}>
              {/* Decorative elements */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#231f20]/5 blur-3xl"
                variants={circleVariants}
                custom={0}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full bg-[#231f20]/5 blur-3xl"
                variants={circleVariants}
                custom={1}
              />

              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#231f20" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Animated lines */}
              <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#231f20]/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#231f20]/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1.5, ease: "easeOut" }}
              />

              {/* Floating particles - reduced for mobile performance */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#231f20]"
                  style={{
                    width: Math.random() * 4 + 1,
                    height: Math.random() * 4 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, Math.random() * 0.3 + 0.05, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                    x: [0, Math.random() * 100 - 50, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>

            {/* Top Bar with Logo - Compact for mobile */}
            <div className="relative z-10 px-6 md:px-8 py-4 flex justify-between items-center">
              {/* Logo */}
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              >
                <Link href="/">
                  <div className="relative h-10 w-10 md:h-12 md:w-12 mr-3 md:mr-4">
                    <Image
                      src="/images/logo.png"
                      alt="Elekyabi Law Firm Logo"
                      fill
                      className="object-contain"
                      style={{ filter: "brightness(0)" }}
                    />
                  </div>
                </Link>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-[#231f20]">DR YOUSSEF ELEKYABI</h2>
                  <p className="text-sm text-[#3fbfbc]">Legal Excellence</p>
                </div>
              </motion.div>
            </div>

            {/* Menu Content - Space-efficient design */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-8">
              <div className="w-full max-w-7xl mx-auto">
                <motion.div
                  className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12"
                  variants={containerVariants}
                >
                  {/* Left Column - Menu Items - Compact for mobile */}
                  <div className="flex flex-col justify-center">
                    <nav className="space-y-3">
                      {navItems.map((item) => (
                        <motion.div key={item.name} className="relative" variants={itemVariants}>
                          <button
                            onClick={() => handleItemClick(item.href)}
                            className="group flex flex-col text-left w-full py-1"
                          >
                            <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#231f20] group-hover:text-[#3fbfbc] transition-colors duration-300">
                              {item.name}
                            </span>
                            <span className="text-sm text-[#231f20]/70 group-hover:text-[#3fbfbc]/80 transition-colors duration-300 max-w-md">
                              {item.description}
                            </span>
                          </button>

                          {/* Animated line */}
                          <motion.div
                            className="absolute -bottom-1.5 left-0 h-px bg-[#3fbfbc]/30 w-full"
                            initial={{ scaleX: 0, transformOrigin: "left" }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          />
                        </motion.div>
                      ))}
                    </nav>

                    {/* Language Switcher and Contact Us - Professionally aligned */}
                    <motion.div
                      className="mt-8"
                      variants={itemVariants}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <div className="flex flex-row items-center gap-4 flex-wrap">
                        {/* Language Switcher */}
                        <div className="flex items-center space-x-2 bg-[#231f20]/5 backdrop-blur-sm rounded-full px-4 py-[11px] border border-[#231f20]/10 h-[47px]">
                          <Globe className="h-5 w-5 text-[#3fbfbc] mr-2" />
                          <button
                            onClick={() => handleLanguageChange("EN")}
                            className={cn(
                              "px-4 py-2 text-base rounded-full transition-all duration-300",
                              language === "EN"
                                ? "bg-[#3fbfbc] text-[#231f20] font-medium"
                                : "text-[#231f20]/70 hover:text-[#231f20]",
                            )}
                          >
                            EN
                          </button>
                          <button
                            onClick={() => handleLanguageChange("AR")}
                            className={cn(
                              "px-4 py-2 text-base rounded-full transition-all duration-300",
                              language === "AR"
                                ? "bg-[#3fbfbc] text-[#231f20] font-medium"
                                : "text-[#231f20]/70 hover:text-[#231f20]",
                            )}
                          >
                            AR
                          </button>
                        </div>

                        {/* Contact Us Button */}
                        <button
                          onClick={() => handleItemClick("#contact")}
                          className="group relative px-8 py-2.5 bg-[#3fbfbc] text-[#231f20] font-semibold rounded-full transition-all duration-300 hover:bg-[#231f20] hover:text-[#f2efeb] border border-[#3fbfbc] hover:border-[#231f20] shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <span className="relative z-10">Contact Us</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#3fbfbc]/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column - Visual Element - Hidden on mobile, visible on larger screens */}
                  <motion.div className="hidden lg:flex items-center justify-center relative" variants={itemVariants}>
                    <div className="relative w-full h-[40vh] max-h-[400px] overflow-hidden rounded-xl">
                      <Image
                        src="https://images.unsplash.com/photo-1619771766980-368d32e44b82?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Legal Excellence"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#231f20]/30 to-transparent" />

                      {/* Decorative frame */}
                      <div className="absolute inset-0 border border-[#3fbfbc]/20 rounded-xl" />
                      <motion.div
                        className="absolute top-0 left-0 w-[30%] h-[1px] bg-[#3fbfbc]/60"
                        initial={{ width: 0 }}
                        animate={{ width: "30%" }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 w-[1px] h-[30%] bg-[#3fbfbc]/60"
                        initial={{ height: 0 }}
                        animate={{ height: "30%" }}
                        transition={{ delay: 1, duration: 0.8 }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-[30%] h-[1px] bg-[#3fbfbc]/60"
                        initial={{ width: 0 }}
                        animate={{ width: "30%" }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-[1px] h-[30%] bg-[#3fbfbc]/60"
                        initial={{ height: 0 }}
                        animate={{ height: "30%" }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                      />

                      {/* Quote overlay */}
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <motion.div
                          className="max-w-md text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6, duration: 0.8 }}
                        >
                          <p className="text-lg md:text-xl lg:text-2xl font-light italic text-[#f2efeb] leading-relaxed">
                            "Excellence in legal practice is not just what we do—it's{" "}
                            <span className="text-[#3fbfbc] font-medium">who we are</span>."
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Contact Information - Compact for mobile */}
            <motion.div
              className="relative z-10 bg-[#231f20]/10 border-t border-[#231f20]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              <div className="py-4 px-6 md:px-8">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
                  {/* Phone */}
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#3fbfbc]/10 flex items-center justify-center mr-2">
                      <span className="text-xs text-[#3fbfbc]">+973</span>
                    </div>
                    <span className="text-sm text-[#231f20]">1234 5678</span>
                  </div>

                  {/* Address */}
                  <div className="text-sm text-center text-[#231f20]/70">Diplomatic Area, Manama, Bahrain</div>

                  {/* Email */}
                  <div className="text-sm text-center text-[#231f20]/70">info@elekyabilaw.com</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
