import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Golfstore Auth",
  keywords: ["Golfstore", "Auth", "Authentication", "Login", "Sign Up"]
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
        {children}
    </main>
   
  )
}