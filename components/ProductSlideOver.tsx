'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import type { Product, ProductColor } from '@/types'
import { useCart } from './CartProvider'
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector'
import { formatPrice, DEFAULT_SIZE, getPriceForSize } from '@/lib/utils'

interface ProductSlideOverProps {
  product: Product | null
  onClose: () => void
}

export default function ProductSlideOver({ product, onClose }: ProductSlideOverProps) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [selectedSize, setSelectedSize] = useState(DEFAULT_SIZE)
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Combine color images + gallery images
  const allImages = useMemo(() => {
    if (!product) return []
    const colorImages = product.colors.map(c => c.image)
    const galleryImages = product.galleryImages || []
    return [...colorImages, ...galleryImages]
  }, [product])

  // Calcular precio según talla seleccionada
  const currentPrice = useMemo(() => {
    if (!product) return 0
    return getPriceForSize(product.priceSmall, product.priceLarge, selectedSize)
  }, [product, selectedSize])

  // Inicializar estado cuando cambia el producto
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0])
      setSelectedSize(DEFAULT_SIZE)
      setQuantity(1)
      setCurrentImageIndex(0)
      // Delay para animación
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [product])

  // Sync color selection with image index
  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color)
    const colorIndex = product?.colors.findIndex(c => c.id === color.id) ?? 0
    setCurrentImageIndex(colorIndex)
  }

  // Navigation
  const goToPrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    setCurrentImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  // Manejar tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleAddToCart = () => {
    if (!product || !selectedColor || !product.available) return

    addItem({
      productId: product.id,
      productName: product.name,
      productSubtitle: product.subtitle,
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      size: selectedSize,
      quantity,
      price: currentPrice,
      image: selectedColor.image,
    })

    setAddedFeedback(true)
    setTimeout(() => {
      setAddedFeedback(false)
      handleClose()
    }, 1000)
  }

  if (!product || !selectedColor) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-full sm:w-[90%] md:w-[50%] lg:w-[40%] bg-[#0a0a0a] border-l border-white/10 overflow-y-auto transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del panel */}
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-10 p-4 flex items-center justify-between border-b border-white/10">
          <h2 className="text-lg font-bold">Detalle del producto</h2>
          <button
            onClick={handleClose}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-6">
          {/* Imagen grande con carrusel */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
            <Image
              src={allImages[currentImageIndex] || selectedColor.image}
              alt={`${product.name} ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
            {product.comingSoon && (
              <div className="absolute top-4 left-4 px-4 py-2 bg-[#e31937] text-white text-sm font-bold rounded-full">
                PROXIMAMENTE
              </div>
            )}

            {/* Navigation arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                  aria-label="Imagen anterior"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                  aria-label="Imagen siguiente"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium">
                  {currentImageIndex + 1} / {allImages.length}
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info del producto */}
          <div>
            <h3 className="text-2xl font-black">{product.name}</h3>
            <p className="text-lg text-white/60">{product.subtitle}</p>
            <p className="text-sm text-white/40 mt-2 italic">&quot;{product.claim}&quot;</p>
          </div>

          {/* Precio */}
          <p className="text-3xl font-bold">{formatPrice(currentPrice)}</p>

          {/* Descripción */}
          <p className="text-sm text-white/70 leading-relaxed">{product.description}</p>

          {/* Especificaciones */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/60">Tipo de corte</span>
              <span className="font-medium">{product.cutType}</span>
            </div>
            {product.palm && (
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/60">Palma</span>
                <span className="font-medium text-right max-w-[60%]">{product.palm}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/60">Cierre</span>
              <span className="font-medium">{product.closure}</span>
            </div>
            {product.punchZone && (
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-white/60">Punch Zone</span>
                <span className="font-medium text-green-500">Incluido</span>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <svg className="w-4 h-4 text-[#e31937]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature.text}
              </div>
            ))}
          </div>

          {/* Selectores */}
          {product.available && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              {/* Color */}
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Color: <span className="text-white font-medium">{selectedColor.name}</span>
                </label>
                <ColorSelector
                  colors={product.colors}
                  selected={selectedColor.id}
                  onChange={handleColorChange}
                />
              </div>

              {/* Talla */}
              <div>
                <label className="block text-sm text-white/60 mb-2">
                  Talla: <span className="text-white font-medium">{selectedSize}</span>
                </label>
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onChange={setSelectedSize}
                />
              </div>

              {/* Cantidad */}
              <div>
                <label className="block text-sm text-white/60 mb-2">Cantidad</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-lg font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Botón agregar al carrito */}
          <button
            onClick={handleAddToCart}
            disabled={!product.available}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              !product.available
                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                : addedFeedback
                ? 'bg-green-600 text-white'
                : 'bg-[#e31937] hover:bg-[#c41530] text-white'
            }`}
          >
            {!product.available
              ? 'Proximamente'
              : addedFeedback
              ? 'Agregado al carrito!'
              : `Agregar al carrito - ${formatPrice(currentPrice * quantity)}`}
          </button>
        </div>
      </div>
    </div>
  )
}
