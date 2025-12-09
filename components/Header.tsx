'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from './CartProvider'
import CartDropdown from './CartDropdown'

export default function Header() {
  const { itemCount } = useCart()
  const [showCart, setShowCart] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logos/AO logo.svg"
            alt="AO33"
            width={50}
            height={50}
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/productos"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            PRODUCTOS
          </Link>
        </nav>

        {/* Cart */}
        <div className="relative">
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Carrito de compras"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e31937] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {showCart && <CartDropdown onClose={() => setShowCart(false)} />}
        </div>
      </div>
    </header>
  )
}
