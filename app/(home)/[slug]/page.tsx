'use client'; // Forteller Next.js at dette er en klientkomponent (kjører i nettleseren)

import { useEffect, useState } from 'react'; 
import { useParams } from 'next/navigation';// henter URL-parametere. f.eks kat-slug
import Link from 'next/link'; // for å lage lenker mellom sider
import Image from 'next/image'; // Optimalisert bildekomponent
import { Button } from '@/components/ui/button'; 
import { Card,CardHeader,CardTitle,CardContent,CardFooter, } from '@/components/ui/card'; // UI-kort-komponenter

// Typene for produktdata fra api'et
interface Product {
  productId: number;
  productName: string;
  price: number;
  brandName: string;
  imageUrl: string | null;
}

// Typen for api responsen "paginert"
interface ApiResponse {
  content: Product[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// Gjør første bokstav stor, resten små 
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// sjekker om bildeurl'en er gyldig
function isValidImageUrl(url: string | null): boolean {
  return typeof url === 'string' && url.startsWith('http');
}

// hovedkomponenten som viser produkter i en gitt kategori
export default function CategoryPage() {
  const { slug } = useParams(); // Henter kategorien fra URL-en
  const [products, setProducts] = useState<Product[]>([]); // Produktene som vises
  const [loading, setLoading] = useState(true); // Laster-tilstand

  // Henter produktene fra backend når slug endres
  useEffect(() => {
    async function fetchData() {
      if (!slug) return; // Stopper hvis ingen kategori er valgt

      try {
        const res = await fetch(
          `http://localhost:8080/products/MenuGrid?category=${String(slug)}&sizePerPage=100`
        );
        const json: ApiResponse = await res.json();
        setProducts(json.content); // Lagrer produktene i state
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts([]); // tømmer lista hvis noe går galt
      } finally {
        setLoading(false); // Stopper "lasterstatus"
      }
    }

    fetchData();
  }, [slug]);

  // viser en enkel tekst mens data lastes
  if (loading) return <div className="text-lg">Laster produkter…</div>;

  // viser melding hvis det ikke finnes noen produkter
  if (!products.length) {
    return (
      <div className="text-lg text-red-500">
        Ingen produkter funnet i kategorien: {slug}
      </div>
    );
  }

  // Viser produktene i et rutenett (grid)
  return (
    <div>
      <h1 className="text-3xl font-bold capitalize mb-6">
        {decodeURIComponent(String(slug))} {/* Viser kategorinavnet som overskrift */}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <Card key={p.productId} className="max-w-xs hover:shadow-lg transition-shadow">
            {/* Hele kortet er en lenke til produktsiden */}
            <Link href={`/products/${p.productId}`}>
              <CardHeader>
                <CardTitle>{p.productName}</CardTitle>
              </CardHeader>

              <CardContent className="flex justify-center">
                {/* Viser bildet hvis det er gyldig, ellers viser en "Ingen bilde-boks" */}
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
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
