"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import Search from "./Search";
import keycloak, {
  logout,
  initKeycloak,
  testDebugEndpoints,
} from "@/app/(Auth)/sign-in/config/keycloak";
import test from "node:test";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>(
    keycloak?.tokenParsed?.email
  );
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // dropdown som er åpen

  const categoryRef = useRef<HTMLDivElement>(null); // referanse til kategori-container

  useEffect(() => {
    const init = async () => {
      await initKeycloak();
      // Sjekker om Keycloak er autentisert
      console.log("Keycloak token:", keycloak?.token);
      console.log("Keycloak tokenParsed:", keycloak?.tokenParsed);
      console.log("Keycloak authenticated:", keycloak?.authenticated);
      console.log("Keycloak init complete");
      
      if (keycloak?.authenticated) {
        setIsAuthenticated(true);
        setUsername(keycloak.tokenParsed?.preferred_username ?? "Bruker");
        setEmail(keycloak.tokenParsed?.email ?? "Epost");
        
        fetch("http://localhost:8080/user", {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${keycloak.token}`,
  
          },
        })

      }
    };
    if (typeof window !== "undefined") {
      init();
    }
  }, []);

  // Lukker dropdown hvis man klikker utenfor kategoriene
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
  }, []);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  const toggleDropdown = (category: string) => {
    setOpenDropdown((prev) => (prev === category ? null : category));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 mb-32 z-50 bg-black shadow">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Øverste linje */}
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Image
                src="/kollegutta.png"
                alt="Køllegutta Golfshop"
                width={100}
                height={80}
                className="mt-8"
              />
            </Link>

            <div className="w-1/2 max-w-md">
              <Search />
            </div>

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
                  onClick={() => keycloak?.login()}
                  className="text-gray-300 hover:text-white"
                >
                  <User className="h-6 w-6" />
                  <span className="sr-only">Logg inn</span>
                </button>
              )}

              <Link
                href="/shoppingCart"
                className="text-gray-300 hover:text-white"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </div>
          </div>

          {/* Kategorier med dropdown på klikk */}
          <div
            className="flex items-center justify-center pb-4 space-x-8 relative z-40"
            ref={categoryRef}
          >
            {/* Golfkøller */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("golfclubs")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Golfkøller
              </button>
              {openDropdown === "golfclubs" && (
                <div className="absolute left-0 mt-1 w-48 bg-white text-black rounded shadow-lg z-50">
                  <Link href="/Driver" className="block px-4 py-2 hover:bg-gray-100">
                    Driver
                  </Link>
                  <Link href="/Jernsett" className="block px-4 py-2 hover:bg-gray-100">
                    Jernsett
                  </Link>
                  <Link href="/Putter" className="block px-4 py-2 hover:bg-gray-100">
                    Puttere
                  </Link>
                  <Link href="/Wooder" className="block px-4 py-2 hover:bg-gray-100">
                    Wooder
                  </Link>
                  <Link href="/Hybrid" className="block px-4 py-2 hover:bg-gray-100">
                    Hybrid
                  </Link>
                  <Link href="/Golfkøller" className="block px-4 py-2 hover:bg-gray-100">
                    Alle golfkøller
                  </Link>
                </div>
              )}
            </div>

            {/* Klær og sko */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("clothes")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Klær og sko
              </button>
              {openDropdown === "clothes" && (
                <div className="absolute left-0 mt-1 w-48 bg-white text-black rounded shadow-lg z-50">
                  <Link href="/Tshirts" className="block px-4 py-2 hover:bg-gray-100">
                    T-skjorte
                  </Link>
                  <Link href="/Sko" className="block px-4 py-2 hover:bg-gray-100">
                    Golfsko
                  </Link>
                  <Link href="/Bukse" className="block px-4 py-2 hover:bg-gray-100">
                    Bukse
                  </Link>
                  <Link href="/Jakke" className="block px-4 py-2 hover:bg-gray-100">
                    Jakke
                  </Link>
                  <Link href="/Klær og sko" className="block px-4 py-2 hover:bg-gray-100">
                    Alt innen klær og sko
                  </Link>
                </div>
              )}
            </div>

            {/* bagger og traller */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("bag")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Bagger
              </button>
              {openDropdown === "bag" && (
                <div className="absolute left-0 mt-1 w-48 bg-white text-black rounded shadow-lg z-50">
                  <Link href="/Carrybag" className="block px-4 py-2 hover:bg-gray-100">
                    Bærebagger
                  </Link>
                  <Link href="/Trolleybag" className="block px-4 py-2 hover:bg-gray-100">
                    Trillebagger
                  </Link>
                  <Link href="/bagger og traller" className="block px-4 py-2 hover:bg-gray-100">
                    Alt innen bagger
                  </Link>
                </div>
              )}
            </div>

            {/* Tilbehør */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("accessories")}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                Tilbehør
              </button>
              {openDropdown === "accessories" && (
                <div className="absolute left-0 mt-1 w-48 bg-white text-black rounded shadow-lg z-50">
                  <Link href="/Ball" className="block px-4 py-2 hover:bg-gray-100">
                    Golfballer
                  </Link>
                  <Link href="/Hanske" className="block px-4 py-2 hover:bg-gray-100">
                    Golfhansker
                  </Link>
                  <Link href="/Tilbehør" className="block px-4 py-2 hover:bg-gray-100">
                    Alt tilbehør
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
