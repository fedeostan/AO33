'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product, ProductColor } from '@/types'
import { useCart } from './CartProvider'
import { formatPrice, DEFAULT_SIZE, getPriceForSize } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  color: ProductColor
  onOpenDetail: (product: Product, colorId: string) => void
}

export default function ProductCard({ product, color, onOpenDetail }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(DEFAULT_SIZE)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const currentPrice = getPriceForSize(product.priceSmall, product.priceLarge, selectedSize)

  const handleAddToCart = () => {
    if (!product.available) return
    addItem({
      productId: product.id,
      productName: product.name,
      productSubtitle: product.subtitle,
      colorId: color.id,
      colorName: color.name,
      size: selectedSize,
      quantity: 1,
      price: currentPrice,
      image: color.image,
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }

  return (
    // pt-12 on mobile creates the space the floating image peeks out from above the card
    <div
      className="relative pt-12 lg:pt-0 cursor-pointer"
      onClick={() => onOpenDetail(product, color.id)}
    >
      {/* Mobile: cut-out image floats above-right of the card */}
      {color.cutImage && (
        <div className="lg:hidden absolute top-0 right-0 w-[55%] h-44 z-10 pointer-events-none">
          <Image
            src={color.cutImage}
            alt={`${product.name} ${color.name}`}
            fill
            className="object-contain object-right-bottom"
          />
        </div>
      )}

      <div className="bg-[#191919] rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-white/10 transition-all">

        {/* Desktop: image hero displayed at top of the card */}
        {color.cutImage && (
          <div className="hidden lg:block relative h-52 bg-gradient-to-b from-[#252525] to-[#191919]">
            <Image
              src={color.cutImage}
              alt={`${product.name} ${color.name}`}
              fill
              className="object-contain py-3 px-6"
            />
          </div>
        )}

        <div className="p-3 flex flex-col gap-5">
          {/* w-[60%] on mobile keeps content clear of the floating image on the right */}
          <div className="w-[60%] lg:w-full flex flex-col gap-3">

            <div>
              <div className="flex items-center gap-2">
                <p className="text-2xl text-white">{product.name}</p>
                <div
                  className="hidden lg:block w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: color.hex,
                    border: color.id === 'blanco' ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  }}
                />
              </div>
              <p className="text-[#a3a3a3] text-sm">{product.claim}</p>
              <p className="hidden lg:block text-xs text-white/40 mt-0.5">{color.name}</p>
            </div>

            <p className="text-lg text-white">{formatPrice(currentPrice)}</p>

            <div>
              <p className="text-[11px] text-[#a3a3a3] mb-2">Seleccionar talla:</p>
              <div className="flex gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => { e.stopPropagation(); setSelectedSize(size) }}
                    className={`w-6 h-6 rounded-[7px] text-[13px] shrink-0 transition-all ${
                      selectedSize === size
                        ? 'bg-white text-[#0d0d0d]'
                        : 'bg-[#303030] text-[#a3a3a3] hover:bg-[#404040]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart() }}
            disabled={!product.available}
            className={`w-full py-3 rounded-2xl text-base transition-all ${
              !product.available
                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                : addedFeedback
                ? 'bg-green-600 text-white'
                : 'bg-[#e61535] hover:bg-[#c41530] text-white'
            }`}
          >
            {!product.available
              ? 'No disponible'
              : addedFeedback
              ? '¡Agregado!'
              : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}
