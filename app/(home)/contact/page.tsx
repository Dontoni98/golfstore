import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Linkedin, Twitter } from "lucide-react";
import { Instagram, Youtube } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-green-500 to-transparent">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-black text-white text-xs font-semibold px-2 py-1 rounded mb-4">
            Kontakt oss
          </span>
          <h1 className="text-2xl md:text-5xl font-bold mb-6 text-black">
            Klar for golf? Køllegutta hjelper deg!
          </h1>
          <p className="text-xl text-black mb-8 max-w-2xl mx-auto leading-relaxed">
            Har du spørsmål om golfproduktene våre eller ønsker mer tilpasset
            hjelp? Ta kontakt med oss - vi hjelper deg gjerne med å forbedre
            spillet ditt!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:din-epost@dittdomene.no"
              className="inline-flex items-center px-8 py-3 text-lg font-medium bg-black text-white rounded hover:bg-gray-800 transition"
            >
              <Mail className="mr-2 h-5 w-5" />
              Send en melding
            </a>
            <Link href="/" passHref>
              <button className="inline-flex items-center px-8 py-3 text-lg font-medium border border-black text-black rounded hover:bg-black hover:text-white transition">
                Vårt utstyr
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Kontakt informasjon seksjon */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <a
            href="https://www.google.com/maps?q=Bredalsveien+14,+3511+Hønefoss"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow block"
          >
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Besøk oss</h3>
            <p className="text-black leading-relaxed">
              Bredalsveien 14, 3511 Hønefoss
            </p>
          </a>

          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Ring oss</h3>
            <p className="text-black leading-relaxed">(47+) 4444 4444</p>
          </div>

          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">Email</h3>
            <p className="text-black leading-relaxed">support@køllegutta.com</p>
          </div>
        </div>
      </section>

      {/* Sosial media seksjon */}
      <section className="py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            Følg oss på sosiale medier!
          </h2>
          <p className="text-lg text-black mb-6 max-w-2xl mx-auto">
            Vi deler nyheter om utstyr, golf tips og andre |eksklusive tilbud!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
              target="_blank"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black text-black hover:bg-black hover:text-white transition"
              target="_blank"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
