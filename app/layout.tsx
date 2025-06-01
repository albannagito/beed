import type React from "react"
import type { Metadata } from "next"
import { Belleza } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/smooth-scroll"

const belleza = Belleza({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Eleykabi",
  description: "Eleykabi",
  generator: "Albanna",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={belleza.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
