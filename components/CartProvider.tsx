'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { CartItem } from '@/types'
import { WHATSAPP_NUMBER, formatPrice, trackEvent } from '@/lib/utils'

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  handleWhatsAppCheckout: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'ao33-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Cargar carrito de localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
    setIsHydrated(true)
  }, [])

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      // Buscar si ya existe el mismo producto con mismo color y talla
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.colorId === newItem.colorId &&
          item.size === newItem.size
      )

      if (existingIndex >= 0) {
        // Actualizar cantidad del existente
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        }
        return updated
      }

      // Agregar nuevo item
      return [...prev, newItem]
    })

    // Track evento de analytics
    trackEvent('add_to_cart', {
      product_id: newItem.productId,
      product_name: newItem.productName,
      color: newItem.colorName,
      size: newItem.size,
      quantity: newItem.quantity,
      value: newItem.price * newItem.quantity,
    })
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], quantity }
      return updated
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return

    // Track evento de checkout
    trackEvent('begin_checkout', {
      items_total: itemCount,
      value: total,
    })

    // Construir mensaje de WhatsApp
    const itemsList = items
      .map(
        (item) =>
          `- ${item.productName} ${item.productSubtitle} (${item.colorName}, Talla ${item.size}) x${item.quantity}`
      )
      .join('\n')

    const message = `Hola! Quiero comprar:\n\n${itemsList}\n\nTotal: ${formatPrice(total)}`
    const encodedMessage = encodeURIComponent(message)

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank')
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        handleWhatsAppCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
