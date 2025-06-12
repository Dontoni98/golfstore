import Link from "next/link";
import Image from "next/image";
import {
  Youtube as YoutubeIcon,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-screen text-white bg-black">
      {/* Logo */}
      <div className="bg-green-800 px-4 py-4 flex justify-center">
        <Link href="/" passHref>
          <Image
            src="/kollegutta.png"
            alt="Køllegutta Golfshop"
            width={60}
            height={60}
            className="brightness-0 invert"
          />
        </Link>
      </div>

      {/* Innhold container */}
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Kontakt */}
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-green-800">
                Kontakt oss
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-green-400" />
                  <span>support@køllegutta.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-green-400" />
                  <span>+47 4444 4444</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-green-400" />
                  <span>Bredalsveien 14, 3511 Hønefoss</span>
                </div>
              </div>
            </div>

            {/* Om oss */}
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-green-800">
                Om oss
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>Norges ledende golfbutikk siden 2010</p>
                <p>Vi tilbyr kvalitetsutstyr for alle nivåer</p>
                <p>Ekspertråd og personlig service</p>
                <p>Rask levering over hele Norge</p>
                <div className="mt-4">
                  <Link
                    href="/about"
                    className="text-green-400 hover:text-green-300 underline"
                  >
                    Les mer om oss →
                  </Link>
                </div>
              </div>
            </div>

            {/* Følg oss */}
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-green-800">
                Følg oss
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 mb-4">
                  Hold deg oppdatert på våre kanaler
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://snapchat.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-900 hover:bg-green-800 p-3 rounded-full transition-colors duration-200"
                    aria-label="Snapchat"
                  >
                    <MessageCircle size={24} />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-900 hover:bg-green-800 p-3 rounded-full transition-colors duration-200"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bunntekst */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                <p>&copy; 2025 Køllegutta Golfshop. Alle rettigheter reservert.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link href="/contact" className="text-gray-400 hover:text-green-400">
                  Kontakt
                </Link>
                <Link href="/about" className="text-gray-400 hover:text-green-400">
                  Om oss
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
