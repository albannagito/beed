"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Clock, Instagram, Linkedin, Twitter } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="relative bg-[#231f20] text-[#f2efeb]/90 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-[#f2efeb] via-[#3fbfbc] to-[#f2efeb] w-full opacity-70" />
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
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

        {/* Static gradient overlay */}
        <div
          className="absolute inset-0 opacity-10 bg-radial-gradient"
          style={{
            background: "radial-gradient(circle at 30% 70%, rgba(63, 191, 188, 0.15) 0%, rgba(35, 31, 32, 0) 50%)",
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#3fbfbc]/5" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#3fbfbc]/5" />
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Top section with logo and info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-24">
          {/* Logo and tagline */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-6 flex items-center">
              <div className="relative h-16 w-16 mr-4">
                <Image
                  src="/images/logo-black.png"
                  alt="Elekyabi Law Firm Logo"
                  fill
                  className="object-contain"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#f2efeb]">DR YOUSSEF ELEKYABI</h2>
                <p className="text-[#3fbfbc]">Legal Excellence</p>
              </div>
            </div>

            <p className="text-[#f2efeb]/70 mb-8">
              A premier Bahrain-based legal practice offering strategic, results-oriented counsel across a full spectrum
              of legal services.
            </p>

            <div className="mt-auto">
              <h3 className="text-[#f2efeb] font-medium mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#3fbfbc]/10 flex items-center justify-center text-[#3fbfbc] hover:bg-[#3fbfbc] hover:text-[#231f20] transition-colors duration-300"
                >
                  <Instagram size={18} />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#3fbfbc]/10 flex items-center justify-center text-[#3fbfbc] hover:bg-[#3fbfbc] hover:text-[#231f20] transition-colors duration-300"
                >
                  <Linkedin size={18} />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#3fbfbc]/10 flex items-center justify-center text-[#3fbfbc] hover:bg-[#3fbfbc] hover:text-[#231f20] transition-colors duration-300"
                >
                  <Twitter size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick links and info */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick links */}
            <div>
              <h3 className="text-[#f2efeb] font-bold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-[#f2efeb]/70 hover:text-[#3fbfbc] transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-[#3fbfbc] mr-3"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#f2efeb]/70 hover:text-[#3fbfbc] transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-[#3fbfbc] mr-3"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#f2efeb]/70 hover:text-[#3fbfbc] transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-[#3fbfbc] mr-3"></span>
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#f2efeb]/70 hover:text-[#3fbfbc] transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-[#3fbfbc] mr-3"></span>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#f2efeb]/70 hover:text-[#3fbfbc] transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-[#3fbfbc] mr-3"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Office information */}
            <div>
              <h3 className="text-[#f2efeb] font-bold mb-6 text-lg">Visit Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#3fbfbc] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#f2efeb]">Diplomatic Area</p>
                    <p className="text-[#f2efeb]/50 text-sm">Manama, Bahrain</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-[#3fbfbc] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#f2efeb]">Sunday - Thursday</p>
                    <p className="text-[#f2efeb]/50 text-sm">8:00 AM - 5:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className="pt-8 border-t border-[#f2efeb]/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#f2efeb]/50 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Dr Youssef Elekyabi Law Firm. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              <Link href="#" className="text-[#f2efeb]/50 text-sm hover:text-[#3fbfbc] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#f2efeb]/50 text-sm hover:text-[#3fbfbc] transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-[#f2efeb]/50 text-sm hover:text-[#3fbfbc] transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Static line at the bottom */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#3fbfbc] to-transparent w-[80%] mx-auto" />
    </footer>
  )
}
