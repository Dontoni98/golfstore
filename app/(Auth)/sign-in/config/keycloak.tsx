<<<<<<< Updated upstream
import Keycloak, { KeycloakInstance } from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8180',
  realm: 'innloggingbruker',
  clientId: 'nextjs',
};

let keycloak: KeycloakInstance | undefined;

if (typeof window !== 'undefined') {
  keycloak = new Keycloak(keycloakConfig);
}

let isInitialized = false;

export const initKeycloak = (): Promise<boolean> => {
  if (!isInitialized && keycloak) {
    isInitialized = true;
    return keycloak
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .then((authenticated) => authenticated)
      .catch((err) => {
        isInitialized = false;
        console.error('Failed to initialize Keycloak', err);
        throw err;
      });
  }
  return Promise.resolve(keycloak?.authenticated ?? false);
};

export const logout = () => {
  if (keycloak) {
    keycloak.logout({
      redirectUri: window.location.origin, // F.eks. http://localhost:3000
    });
  }
};

export const getToken = async (): Promise<string | null> => {
  if (keycloak) {
    if (keycloak.isTokenExpired()) {
      try {
        await keycloak.updateToken(30);
      } catch (error) {
        console.error('Failed to refresh the token', error);
        keycloak.logout({
          redirectUri: window.location.origin,
        });
        return null;
      }
    }
    return keycloak.token ?? null;
  }
  return null;
};

export { keycloak };
=======
// keycloak.ts

import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8180", // ← Din Keycloak URL
  realm: "Golfshop",
  clientId: "golfstore-backend", // ← Sørg for at dette stemmer
});

export default keycloak;

export function initKeycloak() {
  if (typeof window === "undefined") return;

  return keycloak.init({
    onLoad: "check-sso",
    checkLoginIframe: false,
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  });
}

export function login() {
  if (typeof window === "undefined") return;

  console.log("✅ Bruker redirectUri:", window.location.origin);

  keycloak.login({
    redirectUri: window.location.origin,
  });
}

export function logout() {
  if (typeof window === "undefined") return;

  keycloak.logout({
    redirectUri: window.location.origin,
  });
}
>>>>>>> Stashed changes
