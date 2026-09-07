import type { ReactNode } from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://ashwinprakash.vercel.app"),
  title: "Ashwin Prakash | Machine Learning & Robotics",
  description: "Electrical & Computer Engineering at UT Austin. Explore Ashwin Prakash’s work in machine learning, computer vision, robotics, and an interactive 3D portfolio.",
  alternates: { canonical: "/" },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body><ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>{children}</ThemeProvider></body>
    </html>
  )
}
