type CartItem = {
  variantId: number;
  amount: number;
};

const STORAGE_KEY = "guest_cart";

function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCartToStorage(cart: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }
}

export function fetchCart(): CartItem[] {
  return getCartFromStorage();
}

export function updateCartItem(
  variantId: number,
  amount: number = 1,
  action: "add" | "subtract" | "delete" = "add"
): CartItem[] {
  let cart = getCartFromStorage();

  const index = cart.findIndex((item) => item.variantId === variantId);

  if (action === "add") {
    if (index !== -1) {
      cart[index].amount += amount;
    } else {
      cart.push({ variantId, amount });
    }
  } else if (action === "subtract") {
    if (index !== -1) {
      cart[index].amount -= amount;
      if (cart[index].amount <= 0) {
        cart.splice(index, 1);
      }
    }
  } else if (action === "delete") {
    if (index !== -1) {
      cart.splice(index, 1);
    }
  }

  saveCartToStorage(cart);
  return cart;
}

export function clearCart(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
