'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface Product {
  productId: number;
  productName: string;
  price: number;
  brandName: string;
  imageUrl: string | null;
}

interface ApiResponse {
  content: Product[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function isValidImageUrl(url: string | null): boolean {
  return typeof url === 'string' && url.startsWith('http');
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;

      try {
        const res = await fetch(
          `http://localhost:8080/products/MenuGrid?category=${(
            String(slug)
          )}&sizePerPage=100`
        );
        const json: ApiResponse = await res.json();
        setProducts(json.content);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <div className="text-lg">Laster produkter…</div>;

  if (!products.length) {
    return (
      <div className="text-lg text-red-500">
        Ingen produkter funnet i kategorien: {slug}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold capitalize mb-6">{decodeURIComponent(String(slug))}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link
            key={p.productId}
            href={`/products/${p.productId}`}
            className="block"
          >
            <Card className="max-w-xs hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{p.productName}</CardTitle>
              </CardHeader>

              <CardContent className="flex justify-center">
                {isValidImageUrl(p.imageUrl) ? (
                  <Image
                    src={p.imageUrl!}
                    alt={p.productName}
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 text-sm text-gray-500">
                    Ingen bilde
                  </div>
                )}
              </CardContent>

              <CardFooter className="justify-between">
                <span className="font-medium">{p.price} NOK</span>
                <Button size="sm">Kjøp</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
