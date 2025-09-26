"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center md:text-left">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} productItem={p} />
        ))}
      </div>
    </div>
  );
}
