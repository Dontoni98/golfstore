"use client"; // Forteller Next.js at denne filen skal kjøres i nettleseren

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// Importerer Keycloak-funksjoner fra config-filen
import { initKeycloak, logout } from "../config/keycloak";
import keycloak from "../config/keycloak";

// lager en type for brukeren (kan være null hvis ikke logget inn)
type User = {
  name?: string;
  email?: string;
} | null;

// Lager en type for hva som finnes i konteksten
interface KeycloakContextType {
  initialized: boolean;      // har Keycloak blitt startet?
  authenticated: boolean;    // er brukeren logget inn?
  user: User;                // Info om brukeren
  logout: () => void;        // funksjon for å logge ut
}

// lager selve konteksten med startverdier (falske verdier)
const KeycloakContext = createContext<KeycloakContextType>({
  initialized: false,
  authenticated: false,
  user: null,
  logout: () => {}
});

// Typen til propsene komponenten tar imot – altså children
interface Props {
  children: ReactNode;
}

// Hovedkomponenten som pakker inn resten av appen og gir tilgang til auth
export const KeycloakProvider: React.FC<Props> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);      // Har Keycloak startet?
  const [authenticated, setAuthenticated] = useState(false);  // Er brukeren logget inn?
  const [user, setUser] = useState<User>(null);               // Brukerinfo

  // når komponenten vises første gang, prøver vi å starte Keycloak
  useEffect(() => {
    if (typeof window !== "undefined") {
      initKeycloak()
        .then((auth) => {
          setAuthenticated(auth); // Oppdaterer auth-status

          // Hvis innlogget, hent info om brukeren
          if (keycloak && auth) {
            setUser({
              name: keycloak.tokenParsed?.preferred_username,
              email: keycloak.tokenParsed?.email,
            });
          }

          setInitialized(true); // Keycloak er ferdig satt opp
        })
        .catch((err) => console.error("Failed to initialize Keycloak", err));
    }
  }, []);

  // Returnerer konteksten og barna inni, resten av appen får tilgang til auth-data herfra
  return (
    <KeycloakContext.Provider
      value={{
        initialized,
        authenticated,
        user,
        logout
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

// egen hook så vi enkelt kan bruke Keycloak-context andre steder i appen
export const useKeycloak = () => useContext(KeycloakContext);
