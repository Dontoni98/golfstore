// Importerer hovedklassen og typen for Keycloak fra keycloak-js
import Keycloak, { KeycloakInstance } from "keycloak-js";

// Konfigurasjonsobjekt for Keycloak
const keycloakConfig = {
  url: "http://localhost:8180", // URL til Keycloak-serveren
  realm: "innloggingbruker", // Navn på realm i Keycloak
  clientId: "nextjs", // Client ID registrert i Keycloak for applikasjonen
};

// Definerer en Keycloak-instans, men bare i nettleser (ikke SSR/server)
let keycloak: KeycloakInstance | undefined;

if (typeof window !== "undefined") {
  keycloak = new Keycloak(keycloakConfig); // Lager Keycloak-instans hvis vi er i nettleser
}

let isInitialized = false; // Flag for å unngå å initialisere Keycloak flere ganger

// Funksjon som initialiserer Keycloak (kun én gang)
export const initKeycloak = (): Promise<boolean> => {
  if (!isInitialized && keycloak) {
    isInitialized = true;
    return keycloak
      .init({
        onLoad: "check-sso", // Prøv å sjekke om bruker er logget inn uten å tvinge login
        checkLoginIframe: false, // Deaktivert for enkelhet (unngår iframe polling)
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        // Spesifiserer hvor Keycloak kan gjøre en "usynlig" redirect for å sjekke login-status
      })
      .then((authenticated) => authenticated) // Returnerer true/false basert på login-status
      .catch((err) => {
        isInitialized = false; // Nullstill om det feiler
        console.error("Keycloak init feilet", err); // Logg feil
        throw err;
      });
  }

  // Hvis allerede initialisert, returner login-status direkte
  return Promise.resolve(keycloak?.authenticated ?? false);
};

// Funksjon for å logge ut brukeren
export const logout = () => {
  keycloak?.logout({ redirectUri: window.location.origin });
  // Etter logout blir bruker sendt tilbake til forsiden
};

// Eksporterer instansen så den kan brukes direkte i komponenter
export default keycloak;
