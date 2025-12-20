'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useCart } from '@/components/CartProvider'
import { formatPrice } from '@/lib/utils'

export default function Home() {
  const { itemCount, total, handleWhatsAppCheckout } = useCart()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Imágenes de la galería (solo de carpeta galeria)
  const galleryImages = [
    '/images/illustrations/galeria/Mark2_arte_1.png',
    '/images/illustrations/galeria/mark1_black.png',
    '/images/illustrations/galeria/mark1_white.png',
    '/images/illustrations/galeria/mark2_arte_2.png',
    '/images/illustrations/galeria/mark2_creative.png',
    '/images/illustrations/galeria/read_mark1.png',
    '/images/illustrations/galeria/agarrando_pelota.jpeg',
    '/images/illustrations/galeria/WhatsApp Image 2025-09-28 at 18.27.15 (3).png',
  ]

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex(lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1)
      if (e.key === 'ArrowRight') setLightboxIndex(lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, galleryImages.length])

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header compartido */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/illustrations/WhatsApp Image 2025-09-28 at 18.27.15 (4).png"
            alt="Entrenador Selección Colombia"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 leading-none tracking-tight">
            PURE
            <br />
            <span className="text-[#e31937]">GOALKEEPING</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-10">
            Guantes profesionales diseñados con la experiencia de quien entrena a los mejores arqueros del país.
          </p>
          <div className="flex justify-center">
            <Link
              href="/productos"
              className="inline-block bg-white hover:bg-gray-100 text-black font-bold py-4 px-10 text-sm tracking-widest transition-all hover:scale-105"
            >
              COMPRAR
            </Link>
          </div>
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
          <div className="grid grid-cols-2 gap-8 text-center max-w-md mx-auto">
            <div>
              <p className="text-4xl sm:text-5xl font-black text-white">15+</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 tracking-wider uppercase">Años Experiencia</p>
            </div>
            <div className="border-l border-white/10 pl-8">
              <p className="text-4xl sm:text-5xl font-black text-white">100+</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 tracking-wider uppercase">Partidos Int.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Comprar Ahora - Imágenes en paralelo */}
      <section className="pt-16 md:pt-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Card MARK 1 */}
            <Link href="/productos?product=mark-1" className="group relative overflow-hidden">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/illustrations/WhatsApp Image 2025-09-28 at 18.32.24.jpeg"
                  alt="MARK 1"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay oscuro en hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
                {/* Botón que aparece desde abajo */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-center">
                    <span className="bg-white text-black px-8 py-3 rounded-full font-medium text-sm tracking-wide">
                      Comprar ahora
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card SKINNING ROLL */}
            <Link href="/productos?product=skinning-roll" className="group relative overflow-hidden">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/illustrations/WhatsApp Image 2025-10-07 at 16.21.41.jpeg"
                  alt="SKINNING ROLL"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay oscuro en hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
                {/* Botón que aparece desde abajo */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-center">
                    <span className="bg-white text-black px-8 py-3 rounded-full font-medium text-sm tracking-wide">
                      Comprar ahora
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Mark 2 Banner */}
      <section className="pt-4 md:pt-6 pb-8 md:pb-12 px-4 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <Link href="/productos?product=mark-2" className="group block relative overflow-hidden">
            <div className="relative aspect-[21/9] md:aspect-[21/7]">
              <Image
                src="/images/illustrations/mark2_tres_juntos.png"
                alt="MARK 2 - El control está en tus manos"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay con contenido */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70 md:from-transparent md:via-transparent md:to-transparent md:bg-black/0 group-hover:bg-black/50 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg md:text-2xl lg:text-3xl font-light italic max-w-[50%] drop-shadow-lg">
                    &quot;El control está en tus manos&quot;
                  </p>
                  <span className="bg-white text-black px-6 md:px-8 py-3 rounded-full font-medium text-sm md:text-base tracking-wide whitespace-nowrap shadow-lg">
                    Comprar ya
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Gallery Section - Horizontal Scroll */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-xs font-bold text-gray-500 tracking-[0.3em] mb-6">GALERÍA</p>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 px-4 pb-4" style={{ width: 'max-content' }}>
            {galleryImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="relative w-64 h-64 md:w-72 md:h-72 flex-shrink-0 overflow-hidden rounded-lg bg-[#1a1a1a] cursor-pointer group"
              >
                <Image
                  src={src}
                  alt={`Galería ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1)
            }}
            className="absolute left-2 sm:left-6 p-2 sm:p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex(lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1)
            }}
            className="absolute right-2 sm:right-6 p-2 sm:p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4 sm:mx-12 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex]}
              alt={`Galería ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-wider">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button (mobile) */}
      {itemCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-40">
          <button
            onClick={handleWhatsAppCheckout}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 flex items-center justify-center gap-2 shadow-xl transition-colors text-sm tracking-wider"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            COMPRAR ({itemCount}) - {formatPrice(total)}
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
