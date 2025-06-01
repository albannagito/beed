"use client"

import { motion } from "framer-motion"
import { Scale, Gavel, FileText, Building } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  index: number
}

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const icons = {
    Scale: <Scale className="h-10 w-10 text-[#3fbfbc]" />,
    Gavel: <Gavel className="h-10 w-10 text-[#3fbfbc]" />,
    FileText: <FileText className="h-10 w-10 text-[#3fbfbc]" />,
    Building: <Building className="h-10 w-10 text-[#3fbfbc]" />,
  }

  return (
    <motion.div
      className="bg-white border border-[#231f20]/10 p-8 hover:border-[#3fbfbc]/50 transition-colors group shadow-sm"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-6">{icon in icons ? icons[icon as keyof typeof icons] : icons.Scale}</div>
      <h3 className="text-xl font-bold mb-4 group-hover:text-[#3fbfbc] transition-colors">{title}</h3>
      <p className="text-[#231f20]/80">{description}</p>
    </motion.div>
  )
}
