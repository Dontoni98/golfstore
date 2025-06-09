// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { User, ShoppingCart } from "lucide-react";
import Search from "./Search";
<<<<<<< Updated upstream
import Image from 'next/image';

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
=======
import keycloak, { initKeycloak, login, logout } from "@/app/(Auth)/sign-in/config/keycloak";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      await initKeycloak();
      if (keycloak?.authenticated) {
        setIsAuthenticated(true);
        setUsername(keycloak.tokenParsed?.preferred_username ?? "Bruker");
        setEmail(keycloak.tokenParsed?.email ?? "Epost");
      }
    };
    if (typeof window !== "undefined") {
      init();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
>>>>>>> Stashed changes
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 mb-32 z-50 bg-black shadow">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between h-16">
            <Link href="/" >
              <Image  src="/kollegutta.png" alt="Køllegutta Golfshop" width={100} height={80} className="mt-8"/>
            </Link>
            <div className="w-1/2 max-w-md">
              <Search />
            </div>
<<<<<<< Updated upstream
            <div className="flex items-center space-x-4">
              <Link href="../sign-in" className="text-gray-300 hover:text-white">
                <User className="h-6 w-6" />
                <span className="sr-only">Profile</span>
              </Link>
              <Link href="/cart" className="text-gray-300 hover:text-white">
=======

            <div className="flex items-center space-x-4 relative">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="text-gray-300 hover:text-white focus:outline-none"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-50">
                      <div className="px-4 py-2 text-sm text-gray-700">
                        Innlogget som: <strong>{username}</strong>
                      </div>
                      <div className="px-4 py-2 text-sm text-gray-700 border-t">
                        Epost: <strong>{email}</strong>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logg ut
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={login}
                  className="text-gray-300 hover:text-white"
                >
                  <User className="h-6 w-6" />
                  <span className="sr-only">Logg inn</span>
                </button>
              )}

              <Link href="/shoppingCart" className="text-gray-300 hover:text-white">
>>>>>>> Stashed changes
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </div>
          </div>
<<<<<<< Updated upstream
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
              <Link href="/clothes" className="text-gray-300 hover:text-white">
                Klær
              </Link>
              <Link href="/putter" className="text-gray-300 hover:text-white">
                Putter
              </Link>
              <Link href="/wood" className="text-gray-300 hover:text-white">
                Wood
              </Link>
              
            </div>
=======

          <div className="flex items-center justify-center pb-4 space-x-8 relative z-40" ref={categoryRef}>
            {/* Dropdowns for categories */}
            {[
              {
                name: "Golfkøller",
                links: ["Driver", "Jernsett", "Putter", "Wooder", "Hybrid", "Golfkøller"],
              },
              {
                name: "Klær og sko",
                links: ["Tshirts", "Sko", "Bukse", "Jakke", "Klær og sko"],
              },
              {
                name: "Bagger",
                links: ["Carrybag", "Trolleybag", "bagger og traller"],
              },
              {
                name: "Tilbehør",
                links: ["Ball", "Hanske", "Tilbehør"],
              },
            ].map((category) => (
              <div className="relative" key={category.name}>
                <button
                  onClick={() => toggleDropdown(category.name)}
                  className="text-gray-300 hover:text-white cursor-pointer"
                >
                  {category.name}
                </button>
                {openDropdown === category.name && (
                  <div className="absolute left-0 mt-1 w-48 bg-white text-black rounded shadow-lg z-50">
                    {category.links.map((link) => (
                      <Link
                        href={`/${link}`}
                        key={link}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {link.replace(/([A-Z])/g, " $1").trim()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
