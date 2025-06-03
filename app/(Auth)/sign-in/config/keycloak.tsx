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
      .then((authenticated) => {
        console.log('[Keycloak] Authenticated:', authenticated);
        return authenticated;
      })
      .catch((err) => {
        console.error('[Keycloak] Init failed:', err);
        isInitialized = false;
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
