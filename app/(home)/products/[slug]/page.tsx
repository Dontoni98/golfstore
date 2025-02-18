"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


// This would typically come from an API or database
const product = {
  id: "1",
  title: "Premium Wireless Headphones",
  price: 199.99,
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology, comfortable over-ear design, and long-lasting battery life.",
  imageUrl: "/placeholder.svg?height=400&width=400",
  features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.0", "Comfortable memory foam ear cups"],
}

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)
  const params = useParams()

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of product ${params.id} to cart`)
    // Here you would typically update your cart state or send a request to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-[400px] w-full">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
              <ul className="list-disc list-inside mb-6">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="font-semibold">
                  Quantity:
                </label>
              </div>
              <Button onClick={handleAddToCart} className="w-full md:w-auto">
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

