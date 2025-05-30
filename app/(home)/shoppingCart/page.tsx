"use client"

import { useEffect, useState } from "react"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"

type CartItem = {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // Fetch cart from API
  async function fetchCart() {
    const res = await fetch("/api/cart")
    const data = await res.json()
    setCartItems(data)
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  const handleCheckoutSubmit = async (formData: any) => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Order submitted:", { ...formData, items: cartItems, total })
      alert("Order placed successfully!")
    } catch (error) {
      console.error("Checkout error:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Add product to cart
  const handleAddItem = async (productId: number, quantity: number) => {
    await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    })
    await fetchCart()
  }

  // Remove product from cart
  const handleRemoveItem = async (productId: number) => {
    await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    })
    await fetchCart()
  }

  // Clear entire cart
  const handleClearCart = async () => {
    await fetch("/api/cart/clear", { method: "POST" })
    await fetchCart()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isProcessing={isProcessing} />
          
          {/* Example controls for testing add/remove */}
          <div className="mt-6 space-x-2">
            <button
              onClick={() => handleAddItem(1, 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Legg til
            </button>
            <button
              onClick={() => handleRemoveItem(1)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Fjern
            </button>
            <button
              onClick={handleClearCart}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Slett handlekurv
            </button>
          </div>
        </div>

        <div>
          <OrderSummary
            items={cartItems}
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </div>
  )
}
