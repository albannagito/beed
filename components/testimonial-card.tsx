"use client"

import { motion } from "framer-motion"

interface TestimonialCardProps {
  quote: string
  author: string
  company: string
  index: number
}

export default function TestimonialCard({ quote, author, company, index }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-8 shadow-sm border border-[#231f20]/5 hover:border-[#3fbfbc]/50 transition-colors"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-6 text-[#3fbfbc]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 7H7.5C6.83696 7 6.20107 7.26339 5.73223 7.73223C5.26339 8.20107 5 8.83696 5 9.5C5 10.163 5.26339 10.7989 5.73223 11.2678C6.20107 11.7366 6.83696 12 7.5 12H8C8.53043 12 9.03914 12.2107 9.41421 12.5858C9.78929 12.9609 10 13.4696 10 14V17C10 17.5304 9.78929 18.0391 9.41421 18.4142C9.03914 18.7893 8.53043 19 8 19H7C6.44772 19 6 18.5523 6 18C6 17.4477 6.44772 17 7 17H8V14H7.5C6.30653 14 5.16193 13.5259 4.31802 12.682C3.47411 11.8381 3 10.6935 3 9.5C3 8.30653 3.47411 7.16193 4.31802 6.31802C5.16193 5.47411 6.30653 5 7.5 5H11C11.5523 5 12 5.44772 12 6C12 6.55228 11.5523 7 11 7Z"
            fill="currentColor"
          />
          <path
            d="M21 7H17.5C16.837 7 16.2011 7.26339 15.7322 7.73223C15.2634 8.20107 15 8.83696 15 9.5C15 10.163 15.2634 10.7989 15.7322 11.2678C16.2011 11.7366 16.837 12 17.5 12H18C18.5304 12 19.0391 12.2107 19.4142 12.5858C19.7893 12.9609 20 13.4696 20 14V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H17C16.4477 19 16 18.5523 16 18C16 17.4477 16.4477 17 17 17H18V14H17.5C16.3065 14 15.1619 13.5259 14.318 12.682C13.4741 11.8381 13 10.6935 13 9.5C13 8.30653 13.4741 7.16193 14.318 6.31802C15.1619 5.47411 16.3065 5 17.5 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p className="text-[#231f20] mb-6 italic">{quote}</p>
      <div>
        <h4 className="font-bold text-[#231f20]">{author}</h4>
        <p className="text-sm text-[#231f20]/70">{company}</p>
      </div>
    </motion.div>
  )
}
