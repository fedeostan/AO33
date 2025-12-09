'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Product } from '@/types'
import { getAllProducts, getProductById } from '@/lib/products'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import ProductSlideOver from '@/components/ProductSlideOver'

function ProductosContent() {
  const products = getAllProducts()
  const searchParams = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Abrir producto desde URL query param
  useEffect(() => {
    const productId = searchParams.get('product')
    if (productId) {
      const product = getProductById(productId)
      if (product) {
        setSelectedProduct(product)
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* Hero section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            NUESTROS GUANTES
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Guantes profesionales diseñados con la experiencia del entrenador de arqueros
            de la Selección Colombia. Calidad premium para cada atajada.
          </p>
        </div>
      </section>

      {/* Grid de productos */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Slide Over */}
      <ProductSlideOver
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">
            AO33 - Pure Goalkeeping
          </p>
          <p className="text-white/20 text-xs mt-1">
            Colombia
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function ProductosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse text-white/40">Cargando...</div>
      </div>
    }>
      <ProductosContent />
    </Suspense>
  )
}
