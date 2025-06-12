// Importerer nødvendige typer og funksjoner fra React
import React, { ComponentType, FC } from 'react';
// Importerer Keycloak-context-hooken for å få tilgang til auth-status
import { useKeycloak } from '../provider/KeycloakProvider';

/**
 * Higher-Order Component (HOC) som pakker inn en komponent, og beskytter den med Keycloak-autentisering.
 *
 * returnerer en ny komponent som sjekker autentisering før den rendres
 */
const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
  // Returnerer en ny komponent som gjør auth-sjekk før visning
  return (props: P) => {
    const { initialized, authenticated } = useKeycloak(); // Henter auth-status fra konteksten

    // Hvis Keycloak fortsatt initialiseres, vis en loading-tekst
    if (!initialized) {
      return <div>Loading...</div>;
    }

    // Hvis brukeren ikke er autentisert, vis en melding (kan tilpasses med redirect eller login-knapp)
    if (!authenticated) {
      return <div>Not authenticated</div>;
    }

    // Hvis alt er ok, vis den opprinnelige komponenten
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
