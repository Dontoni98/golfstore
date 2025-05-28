// hooks/useFetchProducts.ts
import { useEffect, useState } from 'react';

interface Product {
  productId: number;
  productName: string;
  price: number;
  brandName: string;
  imageUrl: string;
}

interface ApiResponse {
  content: Product[];
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export function useFetchProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return; // don't fetch if category is undefined

    async function fetchData() {
      try {
        const res = await fetch(
          `${baseUrl}/products/MenuGrid?category=${category}` // fetch products based on category
        );
        const json: ApiResponse = await res.json();
        setProducts(json.content);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category]);

  return { products, loading };
}
