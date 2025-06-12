"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon as IconSearch } from "lucide-react";

// query holder på det brukeren skriver i søkefeltet
const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Håndterer innsending av søk og flytter bruker til søkesiden med "router.push"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // siden skal ikke lastes på nytt
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`); //navigerer til søkesiden
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      {/* Søkeinput*/}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Søk etter produktnavn, merke..."
        className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
      />
      {/* Søkeknapp med ikon */}
      <button
        type="submit"
        className="flex items-center px-4 py-2 bg-green-900 text-white rounded-r-md transition-all duration-200 hover:underline hover:decoration-green-400 hover:decoration-2 hover:underline-offset-4 hover:-translate-y-0.5 focus:outline-none"
      >
        <IconSearch className="mr-2" size={18} />
        Search
      </button>
    </form>
  );
};

export default Search;
