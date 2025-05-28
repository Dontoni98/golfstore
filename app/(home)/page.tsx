'use client';

import { useAllProducts } from '@/hooks/useAllProducts';
import ProductCard from '@/components/productcard';

export default function ProductsPage() {
  const { products, isLoading, error } = useAllProducts();

  const handleAddToCart = (id: string) => {
    console.log(`Added product ${id} to cart`);
    // Connect to cart logic/backend here
  };

  if (isLoading) {
    return (
      <div className='container mx-auto p-4 flex justify-center items-center min-h-[400px]'>
        <p className='text-lg'>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto p-4 flex justify-center items-center min-h-[400px]'>
        <p className='text-lg text-red-500'>Error: {error}</p>
      </div>
    );
  }

  if (!Array.isArray(products)) {
    return (
      <div className='container mx-auto p-4 flex justify-center items-center min-h-[400px]'>
        <p className='text-lg text-red-500'>
          Error: Products data is not in the expected format
        </p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Our Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <ProductCard
            key={product.productId.toString()}
            id={product.productId.toString()}
            title={product.productName}
            price={product.price}
            imageUrl={
              product.imageUrl || '/placeholder.svg?height=200&width=200'
            }
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
