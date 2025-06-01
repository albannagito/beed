"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

// Add keyframes for the shimmer effect
const shimmerAnimation = `
@keyframes shimmer {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}
`

// Add a style tag for the gradient animation
const gradientAnimation = `
@keyframes gradient-shift {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}
`

const founders = [
  {
    id: 1,
    name: "Dr. Youssef Elekyabi",
    title: "Former Judge at the Court of Cassation",
    image:
      "https://images.pexels.com/photos/16771673/pexels-photo-16771673/free-photo-of-itay-verchik-with-suite-smiles.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Dr. Youssef Elekyabi, a former Judge at the Court of Cassation, renowned for his judicial insight, integrity, and deep command of Bahraini law.",
    quote:
      "Justice is not just about applying the law—it's about understanding its spirit and ensuring fairness for all.",
    stats: [
      { value: "Judge", label: "Court of Cassation" },
      { value: "Expert", label: "Bahraini Law" },
      { value: "Renowned", label: "Judicial Insight" },
    ],
  },
  {
    id: 2,
    name: "Dr. Amr Qandil",
    title: "Former Head of Litigation, Almoayed Chambers",
    image:
      "https://images.pexels.com/photos/16771673/pexels-photo-16771673/free-photo-of-itay-verchik-with-suite-smiles.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    bio: "Dr. Amr Qandil, who led the Litigation Department at Almoayed Chambers during its golden years, building one of the most successful dispute resolution practices in the country.",
    quote:
      "Excellence in litigation comes from meticulous preparation, strategic thinking, and unwavering dedication to our clients.",
    stats: [
      { value: "Leader", label: "Litigation Dept." },
      { value: "Golden", label: "Years at Almoayed" },
      { value: "Top", label: "Dispute Resolution" },
    ],
  },
]

export default function FoundersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeFounder, setActiveFounder] = useState<number | null>(null)

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Smooth spring for more natural animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Parallax effect for background elements
  const backgroundY = useTransform(smoothScrollProgress, [0, 1], ["0%", "20%"])

  // Add the shimmer animation to the document
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = shimmerAnimation + gradientAnimation
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section
      id="founders-section"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f2efeb 0%, #e8e4de 50%, #f2efeb 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 15s ease infinite",
      }}
    >
      {/* Background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#3fbfbc]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#3fbfbc]/5 rounded-full blur-3xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3fbfbc" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </motion.div>

      {/* Section content */}
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.h2
            className="text-[#3fbfbc] text-sm tracking-[0.3em] uppercase font-light mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Leadership
          </motion.h2>

          <motion.h3
            className="text-[#231f20] text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Meet Our Founding Partners
          </motion.h3>

          <motion.div
            className="h-[2px] w-24 bg-[#3fbfbc] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-[#231f20]/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            With over 75 years of combined experience, our founding partners bring unparalleled expertise and vision to
            every case.
          </motion.p>
        </div>

        {/* Founders grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              className="group relative bg-white/80 backdrop-blur-sm border border-[#3fbfbc]/20 shadow-lg hover:shadow-xl transition-all duration-500 ease-out overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col h-full">
                {/* Image container */}
                <div className="relative h-[350px] overflow-hidden">
                  <Image
                    src={founder.image || "/placeholder.svg"}
                    alt={founder.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/60 via-transparent to-transparent" />

                  {/* Professional badge */}
                  <div className="absolute top-4 right-4 bg-[#3fbfbc] text-white px-3 py-1 text-xs font-medium rounded-full">
                    Legal Expert
                  </div>
                </div>

                {/* Content container */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* Name and title */}
                  <div className="mb-6">
                    <h4 className="text-[#231f20] text-2xl font-bold mb-2">{founder.name}</h4>
                    <p className="text-[#3fbfbc] font-semibold text-sm leading-relaxed">{founder.title}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-[#231f20]/80 leading-relaxed mb-6 flex-grow">{founder.bio}</p>

                  {/* Professional highlights */}
                  <div className="grid grid-cols-3 gap-3 mt-auto">
                    {founder.stats.map((stat, i) => (
                      <div key={i} className="text-center bg-[#f2efeb]/50 p-3 rounded-lg">
                        <div className="text-[#3fbfbc] text-sm font-bold leading-tight">{stat.value}</div>
                        <div className="text-[#231f20]/60 text-xs mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Elegant corner accents */}
              <div className="absolute top-0 left-0 w-[40px] h-[40px] border-t-2 border-l-2 border-[#3fbfbc] opacity-60" />
              <div className="absolute bottom-0 right-0 w-[40px] h-[40px] border-b-2 border-r-2 border-[#3fbfbc] opacity-60" />

              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3fbfbc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bahrain skyline image */}
        <div className="mt-24 relative h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1710091071633-df60ac2a7b0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Bahrain Skyline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/70 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div>
              <h4 className="text-[#f2efeb] text-2xl md:text-3xl font-light mb-3">
                <span className="text-[#3fbfbc] font-bold">Together</span>, they bring not only legal mastery
              </h4>
              <p className="text-[#f2efeb]/80 max-w-2xl mx-auto">
                but authority credibility, and unmatched network within Bahrain's legal system
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
