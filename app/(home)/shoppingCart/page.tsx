"use client"

import { useState, useEffect } from "react"
import { fetchCart, updateCartItem, clearCart } from "@/app/actions/dynamic-cart"


interface CartItem {
  productId: number
  variantId: number
  productName: string
  price: number
  amount: number
  imageUrl: string
}

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")
  const [billingAddressSame, setBillingAddressSame] = useState(true)

  useEffect(() => {
    loadCart()
    console.log(fetchCart())
  }, [])

  const loadCart = async () => {
  try {
    setLoading(true)
    const cart = await fetchCart()
    const mappedItems: CartItem[] = (cart.shoppingcartItems || []).map((item: any) => ({
      productId: item.productId,
      variantId: item.variantId,
      productName: item.productName,
      price: item.price,
      amount: item.amount,
      imageUrl: item.imageUrl, 
    }))
    setCartItems(mappedItems)
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load cart")
  } finally {
    setLoading(false)
  }
}

const handleRemoveItem = async (variantId: number) => {
  try {
    await updateCartItem(variantId, 1, "subtract")
    await loadCart()
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to remove item")
  }
}


const handleAddItem = async (variantId: number) => {
  try {
    await updateCartItem(variantId, 1, "add")
    await loadCart()
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to add item")
  }
}


  const handleClearCart = async (variantId?: number) => {
  try {
    await clearCart(variantId)
    await loadCart()
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to clear cart")
  }
}


  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.amount, 0)
  }

  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    if (subtotal === 0) return 0

    switch (shippingMethod) {
      case "express":
        return 15.99
      case "overnight":
        return 29.99
      default:
        return subtotal > 50 ? 0 : 5.99
    }
  }

  const calculateTax = () => {
    return calculateSubtotal() * 0.08 // 8% tax
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax()
  }

  const validateShippingInfo = () => {
    const required = ["firstName", "lastName", "email", "address", "city", "state", "zipCode"]
    return required.every((field) => shippingInfo[field as keyof ShippingInfo].trim() !== "")
  }

  const validatePaymentInfo = () => {
    return (
      paymentInfo.cardNumber.length >= 16 &&
      paymentInfo.expiryDate.length >= 5 &&
      paymentInfo.cvv.length >= 3 &&
      paymentInfo.cardholderName.trim() !== ""
    )
  }

  const handlePlaceOrder = async () => {
    if (!validateShippingInfo() || !validatePaymentInfo()) {
      setError("Please fill in all required fields")
      return
    }

    setProcessing(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart after successful order
      await clearCart()
      setOrderComplete(true)
    } catch (err) {
      setError("Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-2xl mx-auto text-center">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Order Confirmed!</h3>
            <p className="text-sm text-gray-600 mt-1">
              Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Order Total: ${calculateTotal().toFixed(2)}</p>
                <p className="text-sm text-gray-600">
                  Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                onClick={() => (window.location.href = "/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-w-2xl mx-auto text-center">
          <div className="px-6 py-4 border-b border-gray-200">
            <span className="w-16 h-16 mx-auto mb-4 text-gray-400">🛒</span>
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="text-sm text-gray-600 mt-1">Add some items to your cart to continue with checkout</p>
          </div>
          <div className="px-6 py-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="border border-red-200 bg-red-50 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">🛒 Cart Items ({cartItems.length})</h3>
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <img
                        src={item.imageUrl || "/placeholder.svg?height=80&width=80"}
                        alt={item.productName}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.productName}</h3>
                        <p className="text-sm text-gray-600">Variant ID: {item.variantId}</p>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                          onClick={() => handleRemoveItem(item.variantId)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.amount}</span>
                        <button
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                          onClick={() => handleAddItem(item.variantId)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        onClick={() => handleClearCart(item.variantId)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold flex items-center gap-2">🚚 Shipping Information</h3>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                      First Name *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                      Last Name *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                      Email *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                      Address *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
                      City *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">
                      State *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="zipCode">
                      ZIP Code *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">
                      Country
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Shipping Method</h3>
              </div>
              <div className="px-6 py-4">
                <div value={shippingMethod} onChange={setShippingMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <input
                      type="radio"
                      className="mr-2"
                      value="standard"
                      id="standard"
                      checked={shippingMethod === "standard"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Standard Shipping (5-7 days)</span>
                        <span>{calculateSubtotal() > 50 ? "FREE" : "$5.99"}</span>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <input
                      type="radio"
                      className="mr-2"
                      value="express"
                      id="express"
                      checked={shippingMethod === "express"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Express Shipping (2-3 days)</span>
                        <span>$15.99</span>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <input
                      type="radio"
                      className="mr-2"
                      value="overnight"
                      id="overnight"
                      checked={shippingMethod === "overnight"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <label htmlFor="overnight" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Overnight Shipping</span>
                        <span>$29.99</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold flex items-center gap-2">💳 Payment Information</h3>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardholderName">
                      Cardholder Name *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="cardholderName"
                      value={paymentInfo.cardholderName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardNumber">
                      Card Number *
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="expiryDate">
                        Expiry Date *
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cvv">
                        CVV *
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        id="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm sticky top-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Order Summary</h3>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200 my-4" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>

                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                    onClick={handlePlaceOrder}
                    disabled={processing || !validateShippingInfo() || !validatePaymentInfo()}
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>🔒 Place Order</>
                    )}
                  </button>

                  <p className="text-xs text-gray-600 text-center">Your payment information is secure and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
