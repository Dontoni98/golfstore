type CartItem = {
  productId: number
  variantId: number
  productName: string
  price: number
  amount: number
  imageUrl: string
}

const STORAGE_KEY = "guest_cart"

function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

function saveCartToStorage(cart: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }
}

export function fetchCart(): { shoppingcartItems: CartItem[] } {
  const cart = getCartFromStorage()
  return { shoppingcartItems: cart }
}

export function updateCartItem(
  variantId: number,
  amount: number = 1,
  action: "add" | "subtract" | "delete" = "add",
  itemDetails?: {
    productId: number
    productName: string
    price: number
    imageUrl: string
  }
): { shoppingcartItems: CartItem[] } {
  const cart = getCartFromStorage()
  const index = cart.findIndex((item) => item.variantId === variantId)

  if (action === "add") {
    if (index !== -1) {
      cart[index].amount += amount;
    } else {
      if (
        !itemDetails?.productId ||
        !itemDetails?.productName ||
        !itemDetails?.price ||
        !itemDetails?.imageUrl
      ) {
        throw new Error("Missing product details for guest cart item")
      }

      cart.push({
        productId: itemDetails.productId,
        variantId,
        productName: itemDetails.productName,
        price: itemDetails.price,
        amount,
        imageUrl: itemDetails.imageUrl,
      })
    }
  } else if (action === "subtract") {
    if (index !== -1) {
      cart[index].amount -= amount
      if (cart[index].amount <= 0) {
        cart.splice(index, 1)
      }
    }
  } else if (action === "delete") {
    if (index !== -1) {
      cart.splice(index, 1)
    }
  }

  saveCartToStorage(cart)
  return { shoppingcartItems: cart }
}

export function clearCart(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY)
  }
}
