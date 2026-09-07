import type { ReactNode } from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://ashwinprakash.vercel.app"),
  title: "Ashwin Prakash | ECE @ UT Austin",
  description: "Ashwin Prakash — senior in Electrical & Computer Engineering at UT Austin. Interested in computer vision, machine learning, and full-stack.",
  alternates: { canonical: "/" },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body><ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>{children}</ThemeProvider></body>
    </html>
  )
}
