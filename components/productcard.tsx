"use client";

import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  onAddToCart: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  onAddToCart,
}) => {
  // Handle add to cart click without triggering the Link navigation
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(id);
  };

  // Log the product ID to verify it's correct
  console.log(`ProductCard rendering with ID: ${id}`);

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      {/* Make sure the Link href is correctly formatted */}
      <Link href={`/products/${id}`} className="block">
        <CardHeader className="p-0">
          <div className="flex justify-center">
            <Image 
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="object-cover"
              unoptimized={imageUrl.startsWith("http")} // Use unoptimized for external images as a fallback
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCartClick} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
