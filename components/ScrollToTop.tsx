"use client"

import React, { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

function ScrollToTopButton() {
    // State for å holde styr på om knappen skal vises eller ikke
  const [visible, setVisible] = useState(false)

  function toggleVisibility() {
    // Hvis vi har scrollet mer enn 800px ned, vis knappen (kan endres)
    setVisible(window.pageYOffset > 800)
  }
    // Funksjon for å scrolle til toppen av siden når knappen trykkes
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  // useEffect brukes for å legge til og fjerne scroll-listener
  useEffect(function () {
    window.addEventListener("scroll", toggleVisibility)
    return function () {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-20 right-8 p-3 rounded-full bg-green-800 text-white shadow-lg hover:bg-green-700 transition"
    >
      <ArrowUp size={24} />
    </button>
  )
}

export default ScrollToTopButton
