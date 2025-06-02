import { Heart, Users, Target, Award } from "lucide-react"
import Link from "next/link"


export default function About() {
  const teamMembers = [
    {
      name: "Anthony Arroyo",
      role: "Inloggingsspesialist",
      initials: "AA",
      bio: "Lidenskap for innlogging med ingen års erfaring innen keycloak.",
    },
    {
      name: "Don Toni ",
      role: "Next.Js Entusiast",
      initials: "EJ",
      bio: "Fikser feil raskere enn du kan si 'fore!'.",
    },
    {
      name: "Lars Nordaas",
      role: "Kundeservice", 
      initials: "LA",
      bio: "Hjelper deg med å finne de perfekte køllene tilpasset deg.",
    },
    {
      name: "Mikkel Stensvold",
      role: "Frontend-entusiast",
      initials: "TB",
      bio: "Entusiast under tvil",
    },
    {
      name: "Sindre Magnussen",
      role: "Golfens godfather",
      initials: "SM",
      bio: "Ryktes å ha golf-DNA i blodet.",
    },
    {
      name: "Bjørn Erik",
      role: "Backend-maestro",
      initials: "BE",
      bio: "Sørger for at alt i våre systemer er i 'par'-fekt orden.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Lidenskap for golf",
      description: "Vi brenner for golfsporten og ønsker å dele denne lidenskapen med alle våre kunder.",
    },
    {
      icon: Users,
      title: "Personlig service",
      description: "Hos oss vil du få individuell oppmerksomhet og tilpassede anbefalinger basert på ditt behov.",
    },
    {
      icon: Target,
      title: "Kvalitet først",
      description: "Vi tilbyr utstyr av høyeste kvalitet fra anerkjente merker i golfindustrien.",
    },
    {
      icon: Award,
      title: "Ekspertise",
      description: "Køllegutta har omfattende kunnskap og mange år med erfaring innen golf og golfustyr.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-green-500 to-transparent">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-black text-white text-xs font-semibold px-2 py-1 rounded mb-4">Om oss</span>
          <h1 className="text-2xl md:text-5xl font-bold mb-6 text-black">Køllegutta - Din golfpartner</h1>
          <p className="text-xl text-black mb-8 max-w-2xl mx-auto leading-relaxed">
            Vi er lidenskapelige golfere som har gjort det til vårt oppdrag å hjelpe andre golfspillere med å finne de
            perfekte køllene for å forbedre spillet sitt.
          </p>
        </div>
      </section>

      {/* Vår historie seksjon */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Vår historie</h2>
              <p className="text-lg text-black mb-6 leading-relaxed">
                Køllegutta ble grunnlagt av en vennegjgeng som alle har noe til felles - golf. 
                Vi ser at behovet I norge har økt for en mer personlig og kunnskapsrik tilnærming til salg av golf utstyr. 
              </p>
              <p className="text-lg text-black mb-6 leading-relaxed">
                Fra vårt hovedkontor på campus USN hjelper vi golfspillere med å finne det perfekte
                utstyret, fra nybegynnere til erfarne spillere.
              </p>
              <p className="text-lg text-black leading-relaxed">
                Vi tror på at riktig utstyr kan gjøre en stor forskjell i spillet ditt, og vi er her for å hjelpe deg
                gjennom hele prosessen.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded shadow">
                <div className="text-3xl font-bold text-black mb-2">1000+</div>
                <div className="text-sm text-black">Fornøyde kunder</div>
              </div>
              <div className="text-center p-6 bg-white rounded shadow">
                <div className="text-3xl font-bold text-black mb-2">5</div>
                <div className="text-sm text-black">År i bransjen</div>
              </div>
              <div className="text-center p-6 bg-white rounded shadow">
                <div className="text-3xl font-bold text-black mb-2">10+</div>
                <div className="text-sm text-black">Merker på lager</div>
              </div>
              <div className="text-center p-6 bg-white rounded shadow">
                <div className="text-3xl font-bold text-black mb-2">98%</div>
                <div className="text-sm text-black">Kundetilfredshet</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Våre verdier seksjon */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Våre verdier</h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Dette er prinsippene som styrer alt vi gjør hos Køllegutta
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded shadow hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-black">{value.title}</h3>
                <p className="text-black leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team seksjon */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Møt laget bak din neste 'Hole-in-One'</h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              De dyktige folka som gjør Køllegutta til det vi er
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center p-6 bg-white rounded shadow hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-black">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-black leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flytende kontaktknapp */}
      <Link href="/contact">
        <button className="fixed top-40 right-6 bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 z-50 font-medium">
          Kontakt
        </button>
      </Link>
    </div>


  )
}
