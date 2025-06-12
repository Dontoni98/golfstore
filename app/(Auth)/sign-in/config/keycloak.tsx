
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8180",
  realm: "innloggingbruker", 
  clientId: "nextjs",
};

let keycloak: Keycloak | undefined;
if (typeof window !== "undefined") {
  keycloak = new Keycloak(keycloakConfig);
}


let isInitialized = false;

export const initKeycloak = (): Promise<boolean> => {
  if (!isInitialized && keycloak) {
    isInitialized = true;

    return keycloak
      .init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => {
        if (authenticated) {
          console.log("Authenticated with token:", keycloak.token);

          // Start periodic token refresh
          setInterval(() => {
            keycloak?.updateToken(60) // 60 = prøv å fornye hvis tokenet går ut om under 60 sek
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
          }, 30000); // hver 30. sekund
        }
        return authenticated;
      })
      .catch((err) => {
        isInitialized = false;
        console.error("Keycloak init failed", err);
        throw err;
      });
  }

  return Promise.resolve(keycloak?.authenticated ?? false);
};


export const logout = () => {
  keycloak?.logout({ redirectUri: window.location.origin });
};


export default keycloak;
