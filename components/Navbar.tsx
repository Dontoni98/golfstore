"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { User, ShoppingCart } from "lucide-react";
import Search from "./Search";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 mb-32 z-50 bg-black shadow">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-white">
              Logo
            </Link>
            <div className="w-1/2 max-w-md">
              <Search />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="text-gray-300 hover:text-white">
                <User className="h-6 w-6" />
                <span className="sr-only">Profile</span>
              </Link>
              <Link href="/cart" className="text-gray-300 hover:text-white">
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center pb-4">
            <div className="flex items-baseline space-x-4">
              <Link href="/driver" className="text-gray-300 hover:text-white">
                Driver
              </Link>
              <Link href="/hybrid" className="text-gray-300 hover:text-white">
                Hybrid
              </Link>
              <Link href="/jern" className="text-gray-300 hover:text-white">
                Jern
              </Link>
              <Link href="/klaer" className="text-gray-300 hover:text-white">
                Klær
              </Link>
              <Link href="/putter" className="text-gray-300 hover:text-white">
                Putter
              </Link>
              <Link href="/wood" className="text-gray-300 hover:text-white">
                Wood
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
