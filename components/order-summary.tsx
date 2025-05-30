import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
}

export function OrderSummary({ items, subtotal, tax, shipping, total }: OrderSummaryProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Ordre oppsumering</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.quantity > 1 && (
                  <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {item.quantity}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <hr className="border-gray-200" />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sum</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Levering</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Mva</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-lg font-semibold">
            <span>Totalsum</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-md">
          <p>🔒 Your payment information is secure and encrypted.</p>
          {shipping === 0 && (
            <p className="mt-1">🚚 Gratis frakt over 500kr</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
