'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Configuración - Reemplazar con número real
const WHATSAPP_NUMBER = '573001234567'
const PRICE = 280000

// Tipos
interface CartItem {
  color: string
  colorName: string
  size: number
  qty: number
  image: string
}

interface Selection {
  color: string
  colorName: string
  size: number
  qty: number
  image: string
}

// Productos con imágenes reales
const PRODUCTS = [
  {
    id: 'negro',
    name: 'Negro',
    hex: '#0a0a0a',
    image: '/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.15.jpeg',
  },
  {
    id: 'rojo',
    name: 'Rojo',
    hex: '#e31937',
    image: '/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.15 (2).jpeg',
  },
  {
    id: 'blanco',
    name: 'Blanco',
    hex: '#ffffff',
    image: '/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.15 (1).jpeg',
  },
]

const SIZES = [7, 8, 9, 10, 11]
const QUANTITIES = [1, 2, 3, 4, 5]

// Analytics helper
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function trackEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Formatear precio colombiano
function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selection, setSelection] = useState<Selection>({
    color: 'negro',
    colorName: 'Negro',
    size: 9,
    qty: 1,
    image: PRODUCTS[0].image,
  })
  const [showCart, setShowCart] = useState(false)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll for header effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track view_item on mount
  useEffect(() => {
    trackEvent('view_item', {
      color: selection.color,
      size: selection.size,
    })
  }, [])

  const cartTotal = cart.reduce((sum, item) => sum + item.qty * PRICE, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const handleProductSelect = (product: typeof PRODUCTS[0]) => {
    setSelection(prev => ({
      ...prev,
      color: product.id,
      colorName: product.name,
      image: product.image,
    }))
    trackEvent('view_item', { color: product.id, size: selection.size })
  }

  const handleAddToCart = () => {
    const existingIndex = cart.findIndex(
      item => item.color === selection.color && item.size === selection.size
    )

    if (existingIndex >= 0) {
      const newCart = [...cart]
      newCart[existingIndex].qty += selection.qty
      setCart(newCart)
    } else {
      setCart([...cart, { ...selection }])
    }

    trackEvent('add_to_cart', {
      color: selection.color,
      size: selection.size,
      quantity: selection.qty,
      value: selection.qty * PRICE,
    })

    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const handleWhatsAppCheckout = () => {
    trackEvent('begin_checkout', {
      items_total: cartCount,
      value: cartTotal,
    })

    const itemsList = cart
      .map(item => `- ${item.qty}x Guante AO33 ${item.colorName}, Talla ${item.size}`)
      .join('\n')

    const message = `Hola, me interesan los guantes profesionales AO33:

${itemsList}

Total: ${formatPrice(cartTotal)}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header Premium */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image
              src="/images/logos/AO logo.svg"
              alt="AO33"
              width={50}
              height={50}
              className="h-10 w-auto"
            />
          </a>

          {/* Cart Button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Ver carrito"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e31937] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Cart Dropdown */}
        {showCart && (
          <div className="absolute right-4 sm:right-6 top-full mt-2 w-80 bg-[#1a1a1a] rounded-lg shadow-2xl border border-white/10 p-4">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-6 text-sm">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                      <div>
                        <p className="font-medium text-white">{item.qty}x AO33 {item.colorName}</p>
                        <p className="text-gray-500 text-xs">Talla {item.size}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white">{formatPrice(item.qty * PRICE)}</span>
                        <button
                          onClick={() => handleRemoveFromCart(index)}
                          className="text-gray-500 hover:text-[#e31937] transition-colors"
                          aria-label="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 mt-4 pt-4">
                  <div className="flex justify-between font-bold mb-4 text-white">
                    <span>Total:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm tracking-wide"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    COMPRAR POR WHATSAPP
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.15 (4).jpeg"
            alt="Entrenador Selección Colombia"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <p className="text-[#e31937] text-xs sm:text-sm font-bold tracking-[0.3em] mb-4">
            ENTRENADOR SELECCION COLOMBIA
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 leading-none tracking-tight">
            PURE
            <br />
            <span className="text-[#e31937]">GOALKEEPING</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-10">
            Guantes profesionales diseñados con la experiencia de quien entrena a los mejores arqueros del país.
          </p>
          <a
            href="#producto"
            className="inline-block bg-white hover:bg-gray-100 text-black font-bold py-4 px-10 text-sm tracking-widest transition-all hover:scale-105"
          >
            SHOP NOW
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-16 px-4 bg-[#0a0a0a] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-black text-white">15+</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 tracking-wider uppercase">Años Experiencia</p>
            </div>
            <div className="border-x border-white/10">
              <p className="text-4xl sm:text-5xl font-black text-white">200+</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 tracking-wider uppercase">Partidos Int.</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-white">3</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 tracking-wider uppercase">Copas América</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="producto" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <p className="text-[#e31937] text-xs font-bold tracking-[0.3em] mb-3">AO33 COLLECTION</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">ELIGE TU GUANTE</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="relative aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden">
              <Image
                src={selection.image}
                alt={`Guante AO33 ${selection.colorName}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Product Title */}
              <div>
                <p className="text-[#e31937] text-xs font-bold tracking-[0.2em] mb-2">GUANTE PROFESIONAL</p>
                <h3 className="text-3xl sm:text-4xl font-black text-white">AO33 {selection.colorName.toUpperCase()}</h3>
                <p className="text-3xl font-bold text-white mt-4">{formatPrice(PRICE)}</p>
              </div>

              {/* Color Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-4 tracking-wider">
                  COLOR: <span className="text-white">{selection.colorName.toUpperCase()}</span>
                </label>
                <div className="flex gap-3">
                  {PRODUCTS.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className={`w-14 h-14 rounded-sm border-2 transition-all overflow-hidden ${
                        selection.color === product.id
                          ? 'border-white scale-110'
                          : 'border-transparent hover:border-white/50'
                      }`}
                      aria-label={`Color ${product.name}`}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-4 tracking-wider">
                  TALLA: <span className="text-white">{selection.size}</span>
                </label>
                <div className="flex gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelection(prev => ({ ...prev, size }))}
                      className={`w-14 h-14 font-bold text-lg transition-all ${
                        selection.size === size
                          ? 'bg-white text-black'
                          : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] border border-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-4 tracking-wider">
                  CANTIDAD: <span className="text-white">{selection.qty}</span>
                </label>
                <div className="flex gap-2">
                  {QUANTITIES.map(qty => (
                    <button
                      key={qty}
                      onClick={() => setSelection(prev => ({ ...prev, qty }))}
                      className={`w-12 h-12 font-bold transition-all ${
                        selection.qty === qty
                          ? 'bg-white text-black'
                          : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] border border-white/10'
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-5 font-bold text-sm tracking-widest transition-all ${
                  addedFeedback
                    ? 'bg-[#25D366] text-white'
                    : 'bg-[#e31937] hover:bg-[#c41530] text-white'
                }`}
              >
                {addedFeedback ? 'AGREGADO AL CARRITO' : 'AGREGAR AL CARRITO'}
              </button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Látex alemán premium
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Corte negativo
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Envío a todo Colombia
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Garantía de calidad
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-bold text-gray-500 tracking-[0.3em] mb-10">GALERÍA</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              '/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.14.jpeg',
              '/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.14 (4).jpeg',
              '/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.13.jpeg',
              '/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.15 (3).jpeg',
            ].map((src, i) => (
              <div key={i} className="aspect-square relative overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={src}
                  alt={`Galería ${i + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button (mobile) */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-40">
          <button
            onClick={handleWhatsAppCheckout}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 flex items-center justify-center gap-2 shadow-xl transition-colors text-sm tracking-wider"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            COMPRAR ({cartCount}) - {formatPrice(cartTotal)}
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/logos/AO logo.svg"
              alt="AO33"
              width={80}
              height={80}
              className="h-16 w-auto"
            />
          </div>
          <p className="text-xs text-gray-500 tracking-widest">PURE GOALKEEPING</p>
          <p className="text-xs text-gray-600 mt-4">Colombia</p>
        </div>
      </footer>
    </main>
  )
}
