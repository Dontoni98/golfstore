"use client"

import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="position-absolute bottom-0 left-0 right-0 widht 100% bg-black text-white">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link href="/" >
              <Image  src="/kollegutta.png" alt="Køllegutta Golfshop" width={50} height={50} className="mt-0"/>
            </Link>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <p>&copy; 2025 Golf Store</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
