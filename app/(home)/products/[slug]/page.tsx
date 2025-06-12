"use client";

// Importerer nødvendige hooks og komponenter fra Next.js og prosjektets UI-bibliotek
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { updateCartItem } from "@/app/actions/dynamic-cart";

// Grensesnitt for attributter som beskriver en variant (f.eks. størrelse, farge)
interface VariantAttribute {
  attributeName: string;
  attributeValue: string;
  mainAttribute: boolean;
}

// Grensesnitt for en produktvariant
interface Variant {
  variantId: number;
  attributes: VariantAttribute[];
}

// Grensesnitt for hele produktobjektet
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
  variants?: Variant[];
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedMain, setSelectedMain] = useState<string>('');
  const [selectedSub, setSelectedSub] = useState<string>('');
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);

  const params = useParams();
  const router = useRouter();
  const productId = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : null;

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      const res = await fetch(`http://localhost:8080/products/GetProductDetail/${productId}`);
      const raw = await res.text();
      const data = JSON.parse(raw);
      if (data?.productName) setProduct(data);
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (!product?.variants) return;
    const match = product.variants.find(v =>
      v.attributes.every(a =>
        (a.mainAttribute && a.attributeValue === selectedMain) ||
        (!a.mainAttribute && a.attributeValue === selectedSub)
      )
    );
    setSelectedVariantId(match?.variantId ?? null);
  }, [selectedMain, selectedSub, product]);

  const mainAttributeName = product?.variants?.[0]?.attributes.find(a => a.mainAttribute)?.attributeName;
  const subAttributeName = product?.variants?.[0]?.attributes.find(a => !a.mainAttribute)?.attributeName;

  const mainValues = Array.from(new Set((product?.variants ?? []).flatMap(v =>
    v.attributes.filter(a => a.mainAttribute).map(a => a.attributeValue)
  )));

  const subValues = Array.from(new Set((product?.variants ?? [])
    .filter(v => v.attributes.some(a => a.mainAttribute && a.attributeValue === selectedMain))
    .flatMap(v => v.attributes.filter(a => !a.mainAttribute).map(a => a.attributeValue))
  ));

  if (!product) return null;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {/* Viser hovedbilde for produktet */}
              <div className="relative h-[400px] w-full mb-4">
                <Image
                  src={product.imageUrls?.[selectedImageIndex] ?? '/placeholder.svg'}
                  alt={product.productName ?? 'Product'}
                  fill
                  className="object-contain rounded-lg"
                  unoptimized
                />
              </div>

              {(product.imageUrls?.length ?? 0) > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-16 h-16 border-2 rounded ${
                        selectedImageIndex === index ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <Image src={url} alt="thumb" fill className="object-cover rounded" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
              <p className="text-sm text-muted-foreground mb-4">{product.brandName}</p>
              <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {(product.features?.length ?? 0) > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
                  <ul className="list-disc list-inside mb-6">
                    {(product.features ?? []).map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </>
              )}

              {(product.variants?.length ?? 0) > 0 && (
                <>
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">{mainAttributeName}</label>
                    <select
                      value={selectedMain}
                      onChange={(e) => {
                        setSelectedMain(e.target.value);
                        setSelectedSub('');
                      }}
                      className="border rounded p-2 w-full"
                    >
                      <option value="">Select {mainAttributeName}</option>
                      {mainValues.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  {selectedMain && (
                    <div className="mb-4">
                      <label className="block font-semibold mb-1">{subAttributeName}</label>
                      <select
                        value={selectedSub}
                        onChange={(e) => setSelectedSub(e.target.value)}
                        className="border rounded p-2 w-full"
                      >
                        <option value="">Select {subAttributeName}</option>
                        {subValues.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="font-semibold">Quantity:</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 p-2 border rounded"
                />
              </div>

              <Button
                onClick={async () => {
                  if ((product.variants?.length ?? 0) > 0 && !selectedVariantId) {
                    alert('Please select all variant options.');
                    return;
                  }

                  try {
                    const variantId = selectedVariantId ?? 0;
                    await updateCartItem(variantId, quantity, "add");
                    alert(`Added ${quantity} item(s) to cart.`);
                  } catch (err) {
                    console.error("Failed to add to cart:", err);
                    alert("Something went wrong while adding to cart.");
                  }
                }}
                className="w-full md:w-auto"
              >
                Legg til handlekurv
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
