'use client';

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
import { useFetchProducts } from '@/hooks/useFetchProducts'; // your custom hook

export default function CategoryPage() {
  const { id: category } = useParams(); // gets the category from URL
  const { products, loading } = useFetchProducts(category as string);

  if (loading) return <div>Loading…</div>;

  return (
    <>
      <h1 className='text-3xl font-bold mb-6'>{category}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((p) => (
          <Link
            key={p.productId}
            href={`/products/${p.productId}`}
            className='block'
          >
            <Card className='max-w-xs hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle>{p.productName}</CardTitle>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <Image
                  src={p.imageUrl}
                  alt={p.productName}
                  width={200}
                  height={200}
                  style={{ objectFit: 'contain' }}
                />
              </CardContent>
              <CardFooter className='justify-between'>
                <span className='font-medium'>{p.price} NOK</span>
                <Button size='sm'>Kjøp</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
