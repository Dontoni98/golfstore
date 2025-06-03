"use client"; // rendrer i nettleseren, gjør det mulig å bruke useState og useEffekt

// hent først kun produktnavn og hva det koster
// hent detaljer om produktet

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

interface Product {
  // Hva vi forventer å få fra api
  productId: number;
  productName: string;
  price: number;
  brandName: string;
  imageUrl: string;
}

interface ApiResponse {
  content: Product[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export default function Driver() {
  const [product, setProduct] = useState<Product[]>([]); // definerer state-variabel produkt, inneholder tom liste
  const [loading, setLoading] = useState(true); // brukes kun under innehenting av data, er av boolsk verdi

  useEffect(() => {
    //kjøres når react rendrer komponentet for første gang (mount), blir unmounta når vi forlater siden.
    async function fetchData() {
      try {
        // Prøver først å hente data fra api-endepunktet
        const res = await fetch(
          "http://localhost:8080/products/MenuGrid?category=Golfkøller"
        );
        const json: ApiResponse = await res.json(); // parsrer responsen som JSOn
        setProduct(json.content);
      } catch (err) {
        // ved feil fanges det her
        console.error(err);
        setProduct([]); // tømmer listen dersom feil oppstår
      } finally {
        setLoading(false); // setter loading til false uavhengig om noe har gått galt eller ikke
      }
    }
    fetchData(); //funksjonen kjøres med en gang så snart komponentet "mountes"
  }, []);

  if (loading) return <div>Loading…</div>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Golfkøller</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {product.map((p) => (
          //Vi gjør kortene klikkbart slik at kunden får sett flere bilder/mer informasjon om produktet
          // legger til link
          <Link
            key={p.productId}
            href={`/products/${p.productId}`} // forteller next hvilken "produkside" som skal hentes. Blir overført til riktig side
            className="block"
          >
            <Card className="max-w-xs hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{p.productName}</CardTitle>
              </CardHeader>

              <CardContent className="flex justify-center">
                <Image
                  src={p.imageUrl}
                  alt={p.productName}
                  width={200}
                  height={200}
                  style={{ objectFit: "contain" }}
                />
              </CardContent>

              <CardFooter className="justify-between">
                <span className="font-medium">{p.price} NOK</span>
                <Button size="sm">Kjøp</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
