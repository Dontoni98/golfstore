// hooks/useAllProducts.ts
import { useEffect, useState } from 'react';

interface Product {
  productId: number;
  productName: string;
  price: number;
  brandName: string;
  imageUrl: string;
}
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/products/MenuGrid`);

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        console.log('API Response:', data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && typeof data === 'object') {
          const possibleArrays = Object.values(data).filter((val) =>
            Array.isArray(val)
          );
          if (possibleArrays.length > 0) {
            setProducts(possibleArrays[0] as Product[]);
          } else if (data.productId || data.productName) {
            setProducts([data as Product]);
          } else {
            throw new Error('Could not find products array in API response');
          }
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch products'
        );
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}
