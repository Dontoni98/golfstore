import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollToTopButton from "@/components/ScrollToTop" 

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Golfstore",
  description: "work in progress",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto mt-16 p-4">
          {children}
        </main>
        {/* Plassert footer så den "spanner" hele nettleseren */}
        <Footer />
        <ScrollToTopButton />  {/* Skal vises på alle "sider" */}
      </body>
    </html>
  )
}
