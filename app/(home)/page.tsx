"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/productcard";

// Define the product interface based on your API response
interface Product {
  productId: number;
  productName: string;
  price: number;
  brandName: string;
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/products/MenuGrid");

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debug the API response

        // Check if data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        }
        // Check if data has a property that contains the array (common API pattern)
        else if (data && typeof data === "object") {
          // Try to find an array in the response
          const possibleArrays = Object.values(data).filter((val) =>
            Array.isArray(val)
          );
          if (possibleArrays.length > 0) {
            setProducts(possibleArrays[0] as Product[]);
          } else {
            // If we can't find an array, convert the object to an array if it looks like a product
            if (data.productId || data.productName) {
              setProducts([data as Product]);
            } else {
              throw new Error("Could not find products array in API response");
            }
          }
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`);
    // Here you would typically update your cart state or send a request to your backend
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px]">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Add a check to ensure products is an array before mapping
  if (!Array.isArray(products)) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-500">
          Error: Products data is not in the expected format
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.productId.toString()}
            id={product.productId.toString()}
            title={product.productName}
            price={product.price}
            imageUrl={
              product.imageUrl || "/placeholder.svg?height=200&width=200"
            }
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
