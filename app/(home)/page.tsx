"use client"

import ProductCard from "@/components/productcard"

const products = [
  { id: "1", title: "Product 1", price: 19.99, imageUrl: "/placeholder.svg?height=200&width=200" },
  { id: "2", title: "Product 2", price: 29.99, imageUrl: "/placeholder.svg?height=200&width=200" },
  { id: "3", title: "Product 3", price: 39.99, imageUrl: "/placeholder.svg?height=200&width=200" },
  { id: "4", title: "Product 1", price: 19.99, imageUrl: "/placeholder.svg?height=200&width=200" },
  { id: "5", title: "Product 2", price: 29.99, imageUrl: "/placeholder.svg?height=200&width=200" },
  { id: "6", title: "Product 3", price: 39.99, imageUrl: "/placeholder.svg?height=200&width=200" },
]

export default function ProductsPage() {
  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`)
    // Here you would typically update your cart state or send a request to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )
}


