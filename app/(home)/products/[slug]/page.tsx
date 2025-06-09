"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  productId: number;
  productName: string;
  price: number;
  description: string;
  brandName: string;
  categoryName: string;
  hasVariants: boolean;
  imageUrls: string[];
  features?: string[];
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const productId = params?.id || params?.slug || null;

  useEffect(() => {
    if (!productId) {
      setError("No product ID provided");
      setIsLoading(false);
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const url = `http://localhost:8080/products/detail/${productId}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const rawData = await response.text();
        const data = JSON.parse(rawData);

        if (data && typeof data === "object" && data.productId !== undefined) {
          setProduct(data);
        } else {
          throw new Error("Invalid product data format");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Loading product details...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold text-red-500 mb-4">
          Error: {error || "Product not found"}
        </h2>
        <Button onClick={() => router.push("/products")} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="relative h-[400px] w-full mb-4">
                <Image
                  src={
                    product.imageUrls && product.imageUrls.length > 0
                      ? product.imageUrls[selectedImageIndex]
                      : "/placeholder.svg?height=400&width=400"
                  }
                  alt={product.productName}
                  fill
                  className="object-contain rounded-lg"
                  unoptimized={
                    product.imageUrls &&
                    product.imageUrls.length > 0 &&
                    product.imageUrls[selectedImageIndex].startsWith("http")
                  }
                />
              </div>

              {product.imageUrls && product.imageUrls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-16 h-16 border-2 rounded ${
                        selectedImageIndex === index
                          ? "border-primary"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`${product.productName} thumbnail ${index + 1}`}
                        fill
                        className="object-cover rounded"
                        unoptimized={url.startsWith("http")}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
              <p className="text-sm text-muted-foreground mb-4">
                {product.brandName}
              </p>
              <p className="text-2xl font-semibold mb-4">
                NOK{product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {product.features && product.features.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
                  <ul className="list-disc list-inside mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="font-semibold">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value);
                    if (!isNaN(value) && value > 0) {
                      setQuantity(value);
                    }
                  }}
                  className="w-16 p-2 border rounded"
                />
              </div>

              <Button
                onClick={() =>
                  alert(
                    `Added ${quantity} of product ${product.productId} to cart`
                  )
                }
                className="w-full md:w-auto"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
