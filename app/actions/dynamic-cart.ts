// app/actions/dynamic-cart.ts
import keycloak from "@/app/(Auth)/sign-in/config/keycloak"
import * as authCart from "./auth-shop"
import * as guestCart from "./guest-shop"

const isLoggedIn = () => keycloak?.authenticated === true

export const fetchCart = () => {
  return isLoggedIn() ? authCart.fetchCart() : guestCart.fetchCart()
}

export const updateCartItem = (
  variantId: number,
  productId: number,
  action: "add" | "subtract" | "delete" = "add"
) => {
  return isLoggedIn()
    ? authCart.updateCartItem(variantId, productId, action)
    : guestCart.updateCartItem(variantId, productId,action)
}

export const clearCart = (variantId?: number) => {
  return isLoggedIn()
    ? authCart.clearCart(variantId!)
    : guestCart.clearCart()
}
