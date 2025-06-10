
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
    console.log(keycloak.token);
    return keycloak
      .init({
        onLoad: "check-sso",
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => authenticated)
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

export const testDebugEndpoints = async () => {
  if (!keycloak?.authenticated || !keycloak.token) {
    console.log("Not authenticated or no token available");
    return;
  }

  console.log("=== TESTING DEBUG ENDPOINTS ===");
  console.log("Token:", keycloak.token.substring(0, 50) + "...");

  try {
    // Test auth endpoint try to register a user
    const authResponse = await fetch("http://localhost:8080/user", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log("Auth Response Status:", authResponse.status);
    const authData = await authResponse.json();
    console.log("Auth Response Data:", authData);

    // Test token endpoint
    const tokenResponse = await fetch("http://localhost:8080/debug/token", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log("Token Response Status:", tokenResponse.status);
    if (tokenResponse.ok) {
      const tokenData = await tokenResponse.json();
      console.log("Token Response Data:", tokenData);
    } else {
      const errorText = await tokenResponse.text();
      console.log("Token Response Error:", errorText);
    }
  } catch (error) {
    console.error("Debug test failed:", error);
  }
};

export default keycloak;
