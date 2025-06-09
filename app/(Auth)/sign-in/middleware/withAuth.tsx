import { ComponentType, FC } from "react";
import { useKeycloak } from "../provider/KeycloakProvider";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
  return (props: P) => {
    const { initialized, authenticated } = useKeycloak();

    if (!initialized) return <div>Loading...</div>;
    if (!authenticated) return <div>Ikke logget inn</div>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
