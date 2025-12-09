// Utilidades compartidas para AO33

// Configuración global
export const WHATSAPP_NUMBER = '573001234567'
export const PRICE = 280000
export const DEFAULT_SIZE = 9
export const SIZES = [7, 8, 9, 10, 11]

// Declaración global para Google Analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Formatear precio colombiano
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Track eventos de Google Analytics
export function trackEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}
