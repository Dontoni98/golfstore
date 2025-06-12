//importerer keycloak javaScript-adapteren
import Keycloak from "keycloak-js";

//konfigurasjon for å koble til riktig keycloakserver og klient
const keycloakConfig = {
  url: "http://localhost:8180",     //url til Keycloak-serveren 
  realm: "innloggingbruker",        //navnet på realm-en som er satt opp i keycloak
  clientId: "nextjs",               //klient-id registrert i keycloak for applikasjonen
};

//oppretter en Keycloak-instans kun hvis vi er i nettlesermiljø (ikke under server-side rendering)
let keycloak: Keycloak | undefined;
if (typeof window !== "undefined") {
  keycloak = new Keycloak(keycloakConfig);
}

// brukes for å unngå at Keycloak initialiseres flere ganger
let isInitialized = false;

/**
 * Initialiserer Keycloak-autentisering
 * returnerer en Promise som indikerer om brukeren er autentisert
 */
export const initKeycloak = (): Promise<boolean> => {
  if (!isInitialized && keycloak) {
    isInitialized = true;

    //kaller init-funksjonen til Keycloak for å sjekke om brukeren allerede er logget inn (SSO)
    return keycloak
      .init({
        onLoad: "check-sso", // Forsøker å autentisere brukeren uten å vise login-side
        checkLoginIframe: false, // Forenkler testing – deaktiverer iframe-sjekk for login-status
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html", 
        // Brukes for stille redirect og SSO-sjekk
      })
      .then((authenticated) => {
        if (authenticated) {
          console.log("Authenticated with token:", keycloak.token);

          // Starter en intervall som forsøker å oppdatere token før det utløper
          setInterval(() => {
            keycloak?.updateToken(60) // Forny token hvis det utløper innen 60 sek
              .then((refreshed) => {
                if (refreshed) {
                  console.log("Token refreshed:", keycloak.token);
                } else {
                  console.log("Token still valid");
                }
              })
              .catch((err) => {
                console.error("Failed to refresh token", err);
              });
          }, 30000); // Hver 30 sek
        }

        //returnerer autentiseringsstatus
        return authenticated;
      })
      .catch((err) => {
        //tilbakestiller flagget hvis initialisering feiler
        isInitialized = false;
        console.error("Keycloak init failed", err);
        throw err;
      });
  }

  //hvis allerede initialisert, returnerer autentiseringsstatus direkte
  return Promise.resolve(keycloak?.authenticated ?? false);
};

/**
 *logger ut brukeren og sender dem tilbake til forsiden
 */
export const logout = () => {
  keycloak?.logout({ redirectUri: window.location.origin });
};

//eksporterer Keycloak-objektet for bruk i resten av applikasjonen
export default keycloak;
