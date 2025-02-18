import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react" // Added import for React
import Link from "next/link"

interface ProductCardProps {
  id: string
  title: string
  price: number
  imageUrl: string
  onAddToCart: (id: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, imageUrl, onAddToCart }) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <Link href={`/products/${id}`}>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onAddToCart(id)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
      </Link>
    </Card>
  )
}

export default ProductCard

