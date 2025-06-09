'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
<<<<<<< Updated upstream
} from 'react';
import { initKeycloak, keycloak, logout } from '../config/keycloak';
=======
} from "react";
import keycloak from "../config/keycloak";
>>>>>>> Stashed changes

type User = {
  name?: string;
  email?: string;
} | null;

interface KeycloakContextType {
  initialized: boolean;
  authenticated: boolean;
  user: User;
  token: string | null;
  login: () => void;
  logout: () => void;
}

const KeycloakContext = createContext<KeycloakContextType>({
  initialized: false,
  authenticated: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
<<<<<<< Updated upstream
    if (typeof window !== 'undefined') {
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
        .catch((err) => console.error('Failed to initialize Keycloak', err));
    }
=======
    if (typeof window === "undefined" || hasInitialized.current) return;
    hasInitialized.current = true;

    keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      })
      .then((auth) => {
        setAuthenticated(auth);
        if (auth) {
          setUser({
            name: keycloak.tokenParsed?.preferred_username,
            email: keycloak.tokenParsed?.email,
          });
          setToken(keycloak.token || null);
          console.log("🔐 Token:", keycloak.token);

          setInterval(() => {
            keycloak
              .updateToken(60)
              .then((refreshed) => {
                if (refreshed) {
                  setToken(keycloak.token || null);
                }
              })
              .catch(() => {
                console.warn("Token refresh failed, logging out.");
                keycloak.logout();
              });
          }, 10000);
        }
        setInitialized(true);
      })
      .catch((err) => {
        console.error("Keycloak init failed", err);
      });
>>>>>>> Stashed changes
  }, []);

  const login = () =>
    keycloak.login({ redirectUri: window.location.origin + "/" });

  const logout = () =>
    keycloak.logout({ redirectUri: window.location.origin });

  return (
    <KeycloakContext.Provider
      value={{ initialized, authenticated, user, token, login, logout }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
