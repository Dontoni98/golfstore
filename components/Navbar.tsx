"use client"; // Sørger for at komponenten kjøres på klientsiden (nødvendig for Keycloak og hooks)

import { useEffect, useState } from "react"; // React hooks
import Link from "next/link"; // For navigasjonslenker
import Image from "next/image"; // Next.js optimalisert bildekomponent
import { ShoppingCart, User } from "lucide-react"; // Ikoner
import Search from "./Search"; // Egen søkekomponent
import keycloak, {
  logout,
  initKeycloak,
} from "@/app/(Auth)/sign-in/config/keycloak";
// Import av Keycloak-instans og init/logout-funksjoner

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Om bruker er logget inn
  const [username, setUsername] = useState<string | undefined>(); // Brukernavn (fra token)
  const [email, setEmail] = useState<string | undefined>(
    keycloak?.tokenParsed?.email
  ); // Epost (fra token)
  const [dropdownOpen, setDropdownOpen] = useState(false); // Styrer visning av dropdown-menyen

  useEffect(() => {
    // Kjøres én gang etter første rendering
    const init = async () => {
      await initKeycloak(); // Initialiserer Keycloak (uten å tvinge login)
      if (keycloak?.authenticated) {
        setIsAuthenticated(true); // Oppdaterer login-status
        setUsername(keycloak.tokenParsed?.preferred_username ?? "Bruker"); // Henter brukernavn fra token
        setEmail(keycloak.tokenParsed?.email ?? "Epost"); // Henter epost fra token
      }
    };
    if (typeof window !== "undefined") {
      init(); // Sikrer at Keycloak kun kjøres i nettleser (ikke under SSR)
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Åpne/lukk dropdown når profil-ikon trykkes
  };

  return (
    <nav className="fixed top-0 left-0 right-0 mb-32 z-50 bg-black shadow">
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Øverste linje med logo, søk og ikoner */}
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

            {/* Søkefelt i midten */}
            <div className="w-1/2 max-w-md">
              <Search />
            </div>

            {/* Profil- og handlekurvikon */}
            <div className="flex items-center space-x-4 relative">
              {isAuthenticated ? (
                // Hvis logget inn: vis dropdown med brukernavn, epost og logg ut
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-gray-300 hover:text-white focus:outline-none"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  {dropdownOpen && (
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
                // Hvis ikke logget inn: vis kun login-knapp
                <button
                  onClick={() => keycloak?.login()}
                  className="text-gray-300 hover:text-white"
                >
                  <User className="h-6 w-6" />
                  <span className="sr-only">Logg inn</span>
                </button>
              )}

              {/* Handlekurv-ikon */}
              <Link
                href="/shoppingCart"
                className="text-gray-300 hover:text-white"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </div>
          </div>

          {/* Kategori-lenker under */}
          <div className="flex items-center justify-center pb-4">
            <div className="flex items-baseline space-x-4">
              <Link href="/golfclubs" className="text-gray-300 hover:text-white">
                Golfkøller
              </Link>
              <Link href="/clothes" className="text-gray-300 hover:text-white">
                Klær og sko
              </Link>
              <Link href="/bag" className="text-gray-300 hover:text-white">
                Bagger
              </Link>
              <Link href="/accessories" className="text-gray-300 hover:text-white">
                Tilbehør
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
