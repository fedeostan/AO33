'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product, ProductColor } from '@/types'
import { useCart } from './CartProvider'
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector'
import { formatPrice, DEFAULT_SIZE } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onOpenDetail: (product: Product) => void
}

export default function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(DEFAULT_SIZE)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const handleAddToCart = () => {
    if (!product.available) return

    addItem({
      productId: product.id,
      productName: product.name,
      productSubtitle: product.subtitle,
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      size: selectedSize,
      quantity: 1,
      price: product.price,
      image: selectedColor.image,
    })

    // Feedback visual
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }

  return (
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
      {/* Imagen - clickeable para abrir detalle */}
      <div
        className="relative aspect-square cursor-pointer group"
        onClick={() => onOpenDetail(product)}
      >
        <Image
          src={selectedColor.image}
          alt={`${product.name} ${selectedColor.name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge Coming Soon */}
        {product.comingSoon && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#e31937] text-white text-xs font-bold rounded-full">
            PROXIMAMENTE
          </div>
        )}

        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
            Ver detalles
          </span>
        </div>
      </div>

      {/* Info del producto */}
      <div className="p-4 space-y-3">
        {/* Nombre y claim */}
        <div
          className="cursor-pointer"
          onClick={() => onOpenDetail(product)}
        >
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm text-white/60">{product.subtitle}</p>
          <p className="text-xs text-white/40 mt-1 italic">{product.claim}</p>
        </div>

        {/* Precio */}
        <p className="text-xl font-bold">{formatPrice(product.price)}</p>

        {/* Selector de color */}
        <div>
          <p className="text-xs text-white/40 mb-2">Color: {selectedColor.name}</p>
          <ColorSelector
            colors={product.colors}
            selected={selectedColor.id}
            onChange={setSelectedColor}
            size="sm"
          />
        </div>

        {/* Selector de talla */}
        <div>
          <p className="text-xs text-white/40 mb-2">Talla</p>
          <SizeSelector
            sizes={product.sizes}
            selected={selectedSize}
            onChange={setSelectedSize}
            compact
          />
        </div>

        {/* Botón agregar al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={!product.available}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            !product.available
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
              : addedFeedback
              ? 'bg-green-600 text-white'
              : 'bg-[#e31937] hover:bg-[#c41530] text-white'
          }`}
        >
          {!product.available
            ? 'No disponible'
            : addedFeedback
            ? 'Agregado!'
            : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}
