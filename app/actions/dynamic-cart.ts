// dynamic-cart.ts
import keycloak from "@/app/(Auth)/sign-in/config/keycloak"
import * as authCart from "./auth-shop"
import * as guestCart from "./guest-shop"

const isLoggedIn = () => keycloak?.authenticated === true

export const fetchCart = () => {
  return isLoggedIn() ? authCart.fetchCart() : guestCart.fetchCart()
}

export const updateCartItem = (
  productIdOrItem: number | {
    variantId: number;
    productId: number;
    productName: string;
    price: number;
    imageUrl: string;
  },
  variantId?: number,
  action: "add" | "subtract" | "delete" = "add"
) => {
  if (isLoggedIn()) {
    return authCart.updateCartItem(productIdOrItem as number, variantId!, action)
  } else {
    return guestCart.updateCartItem(productIdOrItem as any, action)
  }
}


export const clearCart = (variantId?: number) => {
  return isLoggedIn()
    ? authCart.clearCart(variantId!)
    : guestCart.clearCart()
}

