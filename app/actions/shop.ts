import keycloak from "@/app/(Auth)/sign-in/config/keycloak"

const API_BASE = "http://localhost:8080/ShoppingCart"

export async function fetchCart() {
  if (!keycloak) throw new Error("Keycloak not initialized");

  // Prøv å fornye tokenet hvis det snart går ut
  try {
    await keycloak.updateToken(10); // 10 sek margin
  } catch (err) {
    throw new Error("Failed to refresh token");
  }
  // Sjekk at vi har et gyldig token
  if (!keycloak?.token) throw new Error("Not authenticated")

  const res = await fetch(`${API_BASE}/GetShoppingCart`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch cart: ${res.statusText}`)
  }

  return await res.json()
}

export async function updateCartItem(
  variantId: number,
  amount: number = 1,
  action: "add" | "subtract" | "delete" = "add"
) {
  if (!keycloak) throw new Error("Keycloak not initialized");

  // Prøv å fornye tokenet hvis det snart går ut
  try {
    await keycloak.updateToken(10); // 10 sek margin
  } catch (err) {
    throw new Error("Failed to refresh token");
  }

  if (!keycloak.token) throw new Error("Not authenticated");

  const body = {
    action,
    variantId,
    amount,
  };

  const res = await fetch(`${API_BASE}/AlterShoppingCart`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to ${action} item: ${res.statusText}`);
  }

  return await res.json();
}


export async function clearCart(variantId: number,) {
  if (!keycloak) throw new Error("Keycloak not initialized");

  // Prøv å fornye tokenet hvis det snart går ut
  try {
    await keycloak.updateToken(10); // 10 sek margin
  } catch (err) {
    throw new Error("Failed to refresh token");
  }
  
  if (!keycloak?.token) throw new Error("Not authenticated")

  const body = {
    action: "delete",
    variantId: variantId,
  }

  const res = await fetch(`${API_BASE}/AlterShoppingCart`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to clear cart: ${res.statusText}`);
  }

  return await res.json();
}

