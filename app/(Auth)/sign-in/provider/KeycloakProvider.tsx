// app/providers/keycloak-provider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { initKeycloak, logout } from "../config/keycloak"; // Fixed path
import keycloak from "../config/keycloak"; // Fixed path

type User = {
  name?: string;
  email?: string;
} | null;

interface KeycloakContextType {
  initialized: boolean;
  authenticated: boolean;
  user: User;
  logout: () => void;
}

const KeycloakContext = createContext<KeycloakContextType>({
  initialized: false,
  authenticated: false,
  user: null,
  logout: () => {}
});

interface Props {
  children: ReactNode;
}

export const KeycloakProvider: React.FC<Props> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initKeycloak()
      
        .then((auth) => {
          setAuthenticated(auth);
          if (keycloak && auth) {
            setUser({
              name: keycloak.tokenParsed?.preferred_username,
              email: keycloak.tokenParsed?.email,
            });
          }
          setInitialized(true);
        })
        .catch((err) => console.error("Failed to initialize Keycloak", err));
    }
  }, []);

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

export const useKeycloak = () => useContext(KeycloakContext);
