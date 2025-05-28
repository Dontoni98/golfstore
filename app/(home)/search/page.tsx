'use client'; // Forteller Next.js at dette er en klient-komponent

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // For å hente søkeordet
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';

// utseende for produktet
interface Product {
  productId: number;
  productName: string;
  price: number;
  brandName: string;
  imageUrl: string;
}

// svar fra API for produktet
interface ApiResponse {
  content: Product[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export default function SearchResults() {
  const searchParams = useSearchParams(); //henter ?q= fra URL
  const query = searchParams.get('q'); // er selve søkeordet som er skrevet

  const [results, setResults] = useState<Product[]>([]); // Holder på søkeresultatene i liste
  const [loading, setLoading] = useState(true); // vises mens data hentes

  useEffect(() => {
    async function fetchResults() {
      // henter resultater fra backend når man endrer det som søkes på
      if (!query) return; // gjør at det ikke søkes om det ikke er skrevet noe

      try {
        const res = await fetch(
          `http://localhost:8080/products/MenuGrid?search=${encodeURIComponent(
            query
          )}`
        );
        const data: ApiResponse = await res.json();
        setResults(data.content); // lagerer listen med produkter vi får fra søket
      } catch (error) {
        console.error('Feil ved søk:', error);
        setResults([]); // Tom liste hvis noe er feil
      } finally {
        setLoading(false); //Fjerner "laster.." uansett
      }
    }

    fetchResults(); //kjør søket
  }, [query]); //kjør når søketeksten endres

  if (loading) return <div>Laster...</div>;

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Søkeresultater</h1>
      <p className='mb-4'>
        Du søkte etter: <strong>{query}</strong>
      </p>

      {/* Hvis vi ikke finner noe*/}
      {results.length === 0 ? (
        <p>Ingen produkter funnet.</p>
      ) : (
        // Hvis produkter blir funnet, vis dem som produktkort
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {results.map((p) => (
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
      )}
    </div>
  );
}
