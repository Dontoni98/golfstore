import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Added import for React


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NavBar with Sticky Search",
  description: "A demo of a navigation bar with a sticky search component",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
        <Navbar />
        <div className="mt-20">
        {children}
        </div>
        <Footer />
        
    </main>
   
  )
}