"use client";
import { useKeycloak } from "../provider/KeycloakProvider"; // Adjust path as needed

export default function DebugTest() {
  const { authenticated, testDebug, user } = useKeycloak();

  if (!authenticated) {
    return (
      <div style={{ padding: "20px", border: "1px solid #red", margin: "20px" }}>
        <h3>Debug Test - Not Authenticated</h3>
        <p>Please log in first to test debug endpoints</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h3>Debug Test</h3>
      <p>User: {user?.name || "Unknown"}</p>
      <p>Email: {user?.email || "Unknown"}</p>
      <button 
        onClick={testDebug}
        style={{ 
          padding: "10px 20px", 
          backgroundColor: "#007bff", 
          color: "white", 
          border: "none", 
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Test Debug Endpoints
      </button>
      <p><strong>Check the browser console for results!</strong></p>
      <p><strong>Also check your Spring Boot console for backend logs!</strong></p>
    </div>
  );
}