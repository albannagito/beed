"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface TeamMemberProps {
  name: string
  role: string
  image: string
  index: number
}

export default function TeamMember({ name, role, image, index }: TeamMemberProps) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden mb-6 bg-white shadow-sm">
        <motion.div className="relative h-[400px] w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#231f20] to-transparent opacity-60"></div>
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-full p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-[#f2efeb]">{name}</h3>
          <p className="text-[#3fbfbc]">{role}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
