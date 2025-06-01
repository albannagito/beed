"use client"

import { useEffect, useState, useRef } from "react"
import EpicPreLoader from "@/components/epic-preloader"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import Navbar from "@/components/navbar"
import FooterSection from "@/components/footer-section"

const expertise = [
  {
    title: "Corporate Law",
    description: "Advising on mergers, acquisitions, joint ventures, and corporate governance.",
  },
  {
    title: "Dispute Resolution",
    description: "Representing clients in arbitration, litigation, and mediation proceedings.",
  },
  {
    title: "Intellectual Property",
    description:
      "Protecting and enforcing intellectual property rights, including trademarks, patents, and copyrights.",
  },
  {
    title: "Real Estate Law",
    description: "Providing legal support for property development, leasing, and real estate transactions.",
  },
  {
    title: "Banking & Finance",
    description: "Advising on banking regulations, financial transactions, and investment strategies.",
  },
  {
    title: "Energy Law",
    description: "Guiding clients through the complexities of the energy sector, including oil, gas, and renewables.",
  },
]

export default function AboutPage() {
  // State to track if initial animation is complete
  const [introComplete, setIntroComplete] = useState(false)
  const mainRef = useRef(null)
  const scrollRef = useRef(null)

  // Handle scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })

  useEffect(() => {
    // Simulate loading time for entrance animation
    const timer = setTimeout(() => {
      setIntroComplete(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Dramatic Intro Animation */}
      <AnimatePresence mode="wait">
        {!introComplete && <EpicPreLoader onLoadingComplete={() => setIntroComplete(true)} />}
      </AnimatePresence>

      {/* Main Content */}
      <main ref={mainRef} className="bg-[#f2efeb] text-[#231f20]" style={{ display: introComplete ? "block" : "none" }}>
        {/* Add Navbar */}
        <Navbar />

        <div ref={scrollRef}>
          <HeroSection introComplete={introComplete} />
          <MissionSection />
          <FoundersSection />
          <DifferentiatorsSection />
          <FinalCTA />

          {/* Add Footer */}
          <FooterSection />
        </div>
      </main>
    </>
  )
}

function HeroSection({ introComplete }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Transform values for parallax effect
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [1, 1.1], [1, 1.1])
  const y = useTransform(scrollYProgress, [1, 200], [1, 200])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Full-screen background with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale, y }}
        initial={{ scale: 1.2, opacity: 0, filter: "blur(30px)" }}
        animate={
          introComplete
            ? {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
              }
            : { scale: 1.2, opacity: 0, filter: "blur(30px)" }
        }
        transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Bahrain Courthouse"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f2efeb]/80 via-[#f2efeb]/60 to-[#f2efeb]/90" />

          {/* Overlay pattern */}
          <motion.div
            className="absolute inset-0 bg-[url('/subtle-grid-pattern.png')]"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={introComplete ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 1.1 }}
            transition={{ duration: 2, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f2efeb]/90 via-[#f2efeb]/70 to-[#f2efeb]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-6xl pt-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Left column - Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-left"
          >
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={introComplete ? { width: "80px", opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="h-0.5 bg-[#3fbfbc] mb-8"
            />

            <div className="mb-8">
              {introComplete && (
                <>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#231f20] leading-tight"
                  >
                    Legal{" "}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#3fbfbc] leading-tight"
                  >
                    Excellence
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#231f20] leading-tight"
                  >
                    , Grounded in{" "}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#3fbfbc] leading-tight"
                  >
                    Heritage
                  </motion.span>
                </>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="mb-10"
            >
              {introComplete && (
                <div className="text-lg sm:text-xl text-[#231f20]/80 leading-relaxed">
                  {[
                    "At",
                    "Dr",
                    "Youssef",
                    "Elekyabi",
                    "Law",
                    "Firm,",
                    "Bahrain",
                    "is",
                    "not",
                    "just",
                    "where",
                    "we",
                    "are",
                    "based,",
                    "it's",
                    "our",
                    "legal",
                    "language,",
                    "courtroom,",
                    "and",
                    "jurisdictional",
                    "focus.",
                  ].map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 2.2 + index * 0.05 }}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={introComplete ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 3.5, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#mission"
                className="px-8 py-4 bg-[#3fbfbc] text-[#231f20] font-medium text-lg hover:bg-[#3fbfbc]/90 transition-colors duration-300 text-center relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 3.7 }}
                  className="relative z-10"
                >
                  Discover Our Heritage
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-[#231f20]/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column - Image or decorative element */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={introComplete ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 1, 0.5, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div
              className="relative h-[600px] w-full overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 border-2 border-[#3fbfbc]/20 z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
              <motion.div
                className="absolute inset-1 border border-[#231f20]/10 z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              />

              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={introComplete ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
                transition={{ duration: 1.5, delay: 1.2 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Legal Scales"
                  fill
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-[#f2efeb]/60 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 2.0 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={introComplete ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 1, delay: 2.5, ease: [0.25, 1, 0.5, 1] }}
                className="absolute bottom-8 left-8 right-8 p-6 bg-[#f2efeb]/80 backdrop-blur-sm border-l-2 border-[#3fbfbc]"
              >
                <motion.p
                  className="text-xl italic text-[#231f20]/90 font-light"
                  initial={{ opacity: 0 }}
                  animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 2.8 }}
                >
                  {introComplete && (
                    <>
                      {'"We don\'t simply practice law in Bahrain—we understand it from the inside out."'
                        .split("")
                        .map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.03, delay: 3.0 + index * 0.02 }}
                          >
                            {char}
                          </motion.span>
                        ))}
                    </>
                  )}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function MissionSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Transforms for elements as user scrolls
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  // For the counter animation
  const count = useTransform(scrollYProgress, [0.2, 0.4], [0, 75])
  const roundedCount = useTransform(count, (value) => Math.floor(value))

  // Split text animation
  const sentence = "We are a proudly and purposefully Bahrain-focused practice."
  const words = sentence.split(" ")

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-24 md:py-32"
      style={{
        background: "linear-gradient(to bottom, #f2efeb, #f2efeb)",
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(63, 191, 188, 0.15), transparent 70%)",
          }}
        />

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern
              id="diagonalHatch"
              width="10"
              height="10"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: "#3fbfbc", strokeWidth: 1 }} />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="max-w-7xl mx-auto" style={{ opacity, y }}>
          {/* Section header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#3fbfbc] text-sm tracking-[0.3em] uppercase block mb-4">Our Mission</span>
            </motion.div>

            <div className="relative">
              <motion.h2
                className="text-[5rem] xs:text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#231f20]/[0.03] whitespace-nowrap"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                LEGACY
              </motion.h2>

              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#231f20] mb-6 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                A Legacy of Excellence
              </motion.h2>
            </div>

            <motion.div
              className="h-0.5 w-0 bg-gradient-to-r from-transparent via-[#3fbfbc] to-transparent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left column - Image */}
            <div className="lg:col-span-5">
              <motion.div
                className="relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1603644448048-28a7e5122f0a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Legal Scales"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#f2efeb]/80 to-transparent" />
                </div>

                {/* Decorative frame */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full border border-[#3fbfbc]/30 rounded-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />

                {/* Quote overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <div className="text-4xl text-[#3fbfbc]/30 font-serif">"</div>
                    <p className="text-xl italic text-[#231f20]/90 font-light">
                      This is where we operate. This is where we litigate. And this is where we win.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right column - Content */}
            <div className="lg:col-span-7">
              {/* Years counter */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-end flex-wrap">
                  <div className="relative">
                    <span className="text-6xl sm:text-8xl md:text-9xl font-black leading-none text-[#231f20]/5">
                      75
                    </span>
                    <motion.span className="text-6xl sm:text-8xl md:text-9xl font-black leading-none text-[#3fbfbc]/30 absolute top-0 left-0">
                      {roundedCount}
                    </motion.span>
                  </div>
                  <div className="mb-6 ml-4">
                    <span className="text-[#3fbfbc] text-lg sm:text-xl font-medium">YEARS OF</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#231f20]">Combined Experience</h3>
                  </div>
                </div>
              </motion.div>

              {/* Animated sentence */}
              <div className="mb-8">
                <div className="flex flex-wrap">
                  {isInView &&
                    words.map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + i * 0.1,
                        }}
                        className="text-xl sm:text-2xl text-[#231f20] mr-2 mb-2"
                      >
                        {word}
                      </motion.span>
                    ))}
                </div>
              </div>

              {/* Content blocks */}
              <div className="space-y-8">
                <motion.div
                  className="bg-[#231f20]/5 backdrop-blur-sm p-6 sm:p-8 border-l-4 border-[#3fbfbc]"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="text-[#231f20]/80 leading-relaxed">
                    We are deeply embedded in the nation's legal fabric, with firsthand knowledge of its court system,
                    regulatory landscape, and business culture. We don't simply practice law in Bahrain—we understand it
                    from the inside out.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-[#231f20]/5 backdrop-blur-sm p-6 sm:p-8 border-l-4 border-[#3fbfbc]"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <h4 className="text-xl sm:text-2xl font-bold text-[#231f20] mb-4">National Specialists</h4>
                  <p className="text-[#231f20]/80 leading-relaxed">
                    We are not regional generalists—we are national specialists . Our firm is led by two of Bahrain's
                    most respectful legal minds.
                  </p>
                </motion.div>
              </div>

              {/* Expertise tags */}
              <motion.div
                className="mt-12 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[
                  "Court System",
                  "Regulatory Landscape",
                  "Business Culture",
                  "Dispute Resolution",
                  "Corporate Law",
                ].map((tag, index) => (
                  <div key={tag} className="bg-[#3fbfbc]/10 border border-[#3fbfbc]/30 px-4 py-2 rounded-full">
                    <span className="text-[#3fbfbc] font-medium">{tag}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FoundersSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Animation controls based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1])

  // Data
  const founders = [
    {
      name: "Dr Youssef Elekyabi",
      title: "Founding Partner",
      credentials: "Former Judge, Court of Cassation",
      imageSrc:
        "https://images.pexels.com/photos/16771673/pexels-photo-16771673/free-photo-of-itay-verchik-with-suite-smiles.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description:
        "Dr Youssef Elekyabi is one of Bahrain's most respected legal minds. With a distinguished career spanning decades in the judiciary, including years on Bahrain's highest appellate court, he brings unique insight into how Bahraini law is interpreted, applied, and enforced at every level.",
      additionalText:
        "His work today is rooted in that legacy, offering clients sound legal strategies, deep litigation insight, and a rare understanding of judicial reasoning. He advises on high-stakes commercial litigation, constitutional matters, criminal defence, and family law cases with the same clarity and integrity that defined his time on the bench.",
    },
    {
      name: "Dr Amr Qandil",
      title: "Founding Partner",
      credentials: "Former Head of Litigation, Almoayed Chambers",
      imageSrc:
        "https://images.pexels.com/photos/16771673/pexels-photo-16771673/free-photo-of-itay-verchik-with-suite-smiles.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description:
        "Dr Amr Qandil is a seasoned litigator known for building and leading one of Bahrain's most successful legal departments. Under his leadership, the litigation division at Almoayed Chambers earned a reputation for its courtroom wins, tactical strength, and commercial awareness.",
      additionalText:
        "Dr Amr brings an elite level of strategic thinking to every case, particularly in complex corporate, commercial, and construction disputes. Clients value his precision, depth, and practical approach, always tailored to winning, whether in court or across the negotiating table.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #f2efeb, #f2efeb)" }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(63, 191, 188, 0.1), transparent 70%)",
          opacity,
        }}
      />

      {/* Grid pattern with diagonal lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%">
          <pattern id="diagonal-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 40 40" fill="none" stroke="#3fbfbc" strokeWidth="0.5" />
            <path d="M 40 0 L 0 40" fill="none" stroke="#3fbfbc" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonal-grid)" />
        </svg>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              backgroundColor: "rgba(63, 191, 188, 0.2)",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.1, Math.random() * 0.5 + 0.1, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity, scale }}>
        {/* Section header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <motion.h2
              className="text-[4rem] xs:text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] 2xl:text-[15rem] font-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#231f20]/[0.03] whitespace-nowrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              FOUNDERS
            </motion.h2>

            <div className="relative">
              <span className="text-[#3fbfbc] text-sm tracking-[0.5em] uppercase block mb-4">
                The Minds Behind Our Success
              </span>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#231f20]">Our Founders</h2>
            </div>
          </div>

          <motion.div
            className="h-0.5 w-0 bg-gradient-to-r from-transparent via-[#3fbfbc] to-transparent mx-auto mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Dynamic founder cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          {founders.map((founder, index) => (
            <div key={founder.name} className="relative group">
              {/* 3D Card Container */}
              <div className="relative perspective">
                <motion.div
                  className="relative bg-[#f2efeb] border border-[#231f20]/10 overflow-hidden h-full transform transition-all duration-500"
                  whileHover={{
                    rotateY: index === 0 ? 5 : -5,
                    rotateX: 2,
                    z: 50,
                  }}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
                >
                  {/* Image container */}
                  <div className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-[#3fbfbc] z-10"
                      initial={{ y: "0%" }}
                      whileInView={{ y: "-100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 + index * 0.2, ease: [0.76, 0, 0.24, 1] }}
                    />

                    <motion.div
                      className="relative h-full w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Image
                        src={founder.imageSrc || "/images/legal-meeting.png"}
                        alt={founder.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#f2efeb] via-[#f2efeb]/50 to-transparent" />
                    </motion.div>

                    {/* Glowing light effect */}

                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 w-full px-8 py-6 z-20">
                      <motion.h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#231f20] mb-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                      >
                        {founder.name}
                      </motion.h3>

                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                      >
                        <div className="h-px w-12 bg-[#3fbfbc] mr-4" />
                        <span className="text-[#3fbfbc]">{founder.title}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                    >
                      <span className="text-[#231f20]/60 italic">{founder.credentials}</span>
                    </motion.div>

                    <motion.p
                      className="text-[#231f20]/70 leading-relaxed mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.3 + index * 0.2 }}
                    >
                      {founder.description}
                    </motion.p>

                    <motion.p
                      className="text-[#231f20]/70 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                    >
                      {founder.additionalText}
                    </motion.p>
                  </div>

                  {/* Geometric accent */}
                  <motion.div
                    className="absolute -bottom-12 -right-12 w-24 h-24 border border-[#3fbfbc]/20 z-0"
                    style={{ rotate: 45 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.5 + index * 0.2 }}
                  />
                </motion.div>
              </div>

              {/* Glowing highlight on hover */}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function DifferentiatorsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Animation controls
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  // Differentiators
  const differentiators = [
    {
      title: "Client-Centered Approach",
      description:
        "We don't spend client resources on self-promotion or appearances. We focus on results, efficiency, and building lasting trust.",
      icon: "◆",
    },
    {
      title: "Down to Earth",
      description: "Down to earth and deeply committed, we place our clients' needs at the centre of everything we do.",
      icon: "●",
    },
    {
      title: "Evolving Practice",
      description:
        "Society changes, business changes—so should the way law is practiced. That's why we constantly question the status quo.",
      icon: "▲",
    },
    {
      title: "Lasting Relationships",
      description: "This isn't just how we work. It's why our clients stay with us.",
      icon: "■",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #f2efeb, #f2efeb)" }}
    >
      <div className="absolute inset-0 z-0">
        {/* Background image with overlay */}
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2028&q=80"
            alt="Legal Books"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f2efeb]/90 via-[#f2efeb]/80 to-[#f2efeb]/90" />
        </div>

        {/* Animated gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(63, 191, 188, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 70% 60%, rgba(63, 191, 188, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 30% 70%, rgba(63, 191, 188, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 80% 20%, rgba(63, 191, 188, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 20% 30%, rgba(63, 191, 188, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity, y }}>
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#3fbfbc] text-sm tracking-[0.3em] uppercase block mb-4">Our Approach</span>
          </motion.div>

          <div className="relative">
            <motion.h2
              className="text-[4rem] xs:text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] 2xl:text-[15rem] font-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#231f20]/[0.03] whitespace-nowrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              DIFFERENT
            </motion.h2>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#231f20] mb-6 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Why We Are Different
            </motion.h2>
          </div>

          <motion.p
            className="text-xl text-[#231f20]/70 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            At Dr Youssef Elekyabi Law Firm, we approach every case with energy, integrity, and a clear purpose: to
            serve our clients—not our image.
          </motion.p>

          <motion.div
            className="h-0.5 w-0 bg-gradient-to-r from-transparent via-[#3fbfbc] to-transparent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>

        {/* Differentiators grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-[#231f20]/5 backdrop-blur-sm border border-[#231f20]/10 p-8 rounded-lg relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Icon */}
              <div className="text-4xl mb-6">{item.icon}</div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 text-[#231f20] group-hover:text-[#3fbfbc] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-[#231f20]/70 text-lg">{item.description}</p>

              {/* Decorative elements */}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#3fbfbc] to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                style={{ transformOrigin: "left" }}
              />

              <motion.div
                className="absolute -bottom-20 -right-20 w-40 h-40 border border-[#3fbfbc]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function FinalCTA() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Background image growing effect
  const scale = useTransform(scrollYProgress, [0, 0.8], [1.1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.8], [10, 0, 0])

  // Text reveal with staggered timing
  const contentY = useTransform(scrollYProgress, [0.1, 0.5], [100, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])

  return (
    <section ref={sectionRef} className="min-h-screen relative py-32 flex items-center justify-center overflow-hidden">
      {/* Dynamic background with zoom effect */}
      <motion.div className="absolute inset-0" style={{ scale, opacity }}>
        <Image
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Bahrain Skyline"
          fill
          className="object-cover"
          style={{ filter: `blur(${blur}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f2efeb]/90 via-[#f2efeb]/80 to-[#f2efeb]/90" />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(63, 191, 188, 0.2) 0%, rgba(0, 0, 0, 0) 60%)",
          }}
        />
      </motion.div>

      <motion.div
        className="container mx-auto px-6 relative z-10 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#3fbfbc] text-sm tracking-[0.3em] uppercase block">Our Jurisdiction</span>
            </motion.div>
          </div>

          {/* Dual layer text effect */}
          <div className="relative mb-12 overflow-hidden">
            <motion.h2
              className="text-[#231f20]/5 text-[4rem] xs:text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] 2xl:text-[15rem] font-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.05 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              BAHRAIN
            </motion.h2>

            <motion.h3
              className="text-4xl sm:text-5xl md:text-6xl font-bold relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#231f20]">Focused on a </span>
              <span className="text-[#3fbfbc]">Single Jurisdiction</span>
            </motion.h3>
          </div>

          <motion.p
            className="text-xl sm:text-2xl text-[#231f20]/70 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We serve a wide spectrum of industries and clients—but always within a single jurisdiction: Bahrain.
          </motion.p>

          <motion.p
            className="text-xl sm:text-2xl text-[#231f20]/70 mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            This is where we operate. This is where we litigate. And this is where we win.
          </motion.p>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="/contact" className="inline-block relative overflow-hidden">
              <span className="relative z-10 block bg-[#3fbfbc] px-10 py-5 text-[#231f20] font-bold text-xl hover:bg-[#3fbfbc]/90 transition-colors duration-300">
                CONTACT US TODAY
              </span>

              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "radial-gradient(circle at center, rgba(63, 191, 188, 0.4), transparent)",
                }}
              />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "rgba(63, 191, 188, 0.3)" : "rgba(35, 31, 32, 0.2)",
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, Math.random() * 0.6 + 0.2, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating lines */}
        <motion.div
          className="absolute top-1/4 w-full h-px opacity-20"
          style={{
            background: "linear-gradient(to right, transparent, rgba(63, 191, 188, 0.8), transparent)",
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 w-full h-px opacity-20"
          style={{
            background: "linear-gradient(to right, transparent, rgba(63, 191, 188, 0.8), transparent)",
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </section>
  )
}
