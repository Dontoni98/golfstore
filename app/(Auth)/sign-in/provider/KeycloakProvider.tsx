// app/providers/keycloak-provider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { initKeycloak, logout, testDebugEndpoints } from "../config/keycloak"; // Fixed path
import keycloak from "../config/keycloak"; // Fixed path
import test from "node:test";

type User = {
  name?: string;
  email?: string;
} | null;

interface KeycloakContextType {
  initialized: boolean;
  authenticated: boolean;
  user: User;
  logout: () => void;
  testDebug: () => Promise<void>;
}

const KeycloakContext = createContext<KeycloakContextType>({
  initialized: false,
  authenticated: false,
  user: null,
  logout: () => {},
  testDebug: async () => {},
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
        logout,
        testDebug: testDebugEndpoints
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
