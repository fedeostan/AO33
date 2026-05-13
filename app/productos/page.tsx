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
  const [selectedColorId, setSelectedColorId] = useState<string | undefined>()

  useEffect(() => {
    const productId = searchParams.get('product')
    if (productId) {
      const product = getProductById(productId)
      if (product) setSelectedProduct(product)
    }
  }, [searchParams])

  const handleOpenDetail = (product: Product, colorId: string) => {
    setSelectedProduct(product)
    setSelectedColorId(colorId)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

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

      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Mobile: flat vertical list — one card per color variant */}
          <div className="lg:hidden flex flex-col gap-6">
            {products.flatMap((product) =>
              product.colors.map((color) => (
                <ProductCard
                  key={`${product.id}-${color.id}`}
                  product={product}
                  color={color}
                  onOpenDetail={handleOpenDetail}
                />
              ))
            )}
          </div>

          {/* Desktop: grouped by product model with section headers */}
          <div className="hidden lg:flex flex-col gap-16">
            {products.map((product) => (
              <div key={product.id}>
                <div className="flex items-baseline gap-4 mb-8 pb-4 border-b border-white/10">
                  <h2 className="text-2xl font-black tracking-tight">{product.name}</h2>
                  <span className="text-sm text-white/40 uppercase tracking-widest">
                    {product.subtitle}
                  </span>
                </div>
                <div
                  className={`grid gap-6 ${
                    product.colors.length === 1
                      ? 'grid-cols-1 max-w-xs'
                      : 'grid-cols-3'
                  }`}
                >
                  {product.colors.map((color) => (
                    <ProductCard
                      key={`${product.id}-${color.id}`}
                      product={product}
                      color={color}
                      onOpenDetail={handleOpenDetail}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductSlideOver
        product={selectedProduct}
        initialColorId={selectedColorId}
        onClose={() => setSelectedProduct(null)}
      />

      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">AO33 - Pure Goalkeeping</p>
          <p className="text-white/20 text-xs mt-1">Colombia</p>
        </div>
      </footer>
    </div>
  )
}

export default function ProductosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="animate-pulse text-white/40">Cargando...</div>
        </div>
      }
    >
      <ProductosContent />
    </Suspense>
  )
}
