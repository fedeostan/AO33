// Datos de productos AO33

import type { Product } from '@/types'
import { SIZES } from './utils'

// Precios por talla
const MARK_PRICE_SMALL = 230000   // Tallas 6-8
const MARK_PRICE_LARGE = 250000   // Tallas 9-11
const SKINNING_PRICE_SMALL = 270000  // Tallas 6-8
const SKINNING_PRICE_LARGE = 290000  // Tallas 9-11

export const products: Product[] = [
  {
    id: 'mark-1',
    slug: 'mark-1-negative-cut',
    name: 'MARK 1',
    subtitle: 'NEGATIVE CUT',
    sku: 'AC33-NC',
    priceSmall: MARK_PRICE_SMALL,
    priceLarge: MARK_PRICE_LARGE,
    claim: 'Control total. Sensación pura.',
    description: 'El guante MARK 1 ofrece un ajuste excepcional gracias a su corte Negative Cut, que permite un contacto más directo con el balón. Diseñado para arqueros que priorizan control, sensibilidad y precisión.',
    cutType: 'Negative Cut (costuras internas)',
    palm: 'Látex de alto rendimiento, adherencia en seco y húmedo',
    closure: 'Muñequera elástica con correa ajustable',
    features: [
      { icon: 'latex', text: 'Látex alemán premium' },
      { icon: 'cut', text: 'Corte negativo profesional' },
      { icon: 'fit', text: 'Ajuste segunda piel' },
      { icon: 'shipping', text: 'Envío a todo Colombia' },
    ],
    colors: [
      {
        id: 'rojo',
        name: 'Rojo',
        hex: '#e31937',
        image: '/images/illustrations/mark1_rojo.png',
      },
      {
        id: 'blanco',
        name: 'Blanco',
        hex: '#ffffff',
        image: '/images/illustrations/mark1_blanco.png',
      },
      {
        id: 'negro',
        name: 'Negro',
        hex: '#0a0a0a',
        image: '/images/illustrations/Mark1_negro.png',
      },
    ],
    sizes: SIZES,
    available: true,
    order: 1,
    galleryImages: ['/images/illustrations/mark1_tres_juntos.png'],
  },
  {
    id: 'mark-2',
    slug: 'mark-2-doble-cierre',
    name: 'MARK 2',
    subtitle: 'NEGATIVE CUT DOBLE CIERRE',
    sku: 'AC33-DC',
    priceSmall: MARK_PRICE_SMALL,
    priceLarge: MARK_PRICE_LARGE,
    claim: 'El control está en tus manos.',
    description: 'El MARK 2 combina el popular corte Negative Cut con un sistema de doble cierre elástico para máxima seguridad. Perfecto para partidos y entrenamientos exigentes.',
    cutType: 'Negative Cut (costuras internas)',
    palm: 'Látex profesional, agarre potente y estable',
    closure: 'Doble elástico para muñeca firme',
    punchZone: true,
    features: [
      { icon: 'latex', text: 'Látex alemán premium' },
      { icon: 'punch', text: 'Punch zone reforzado' },
      { icon: 'double', text: 'Doble cierre elástico' },
      { icon: 'shipping', text: 'Envío a todo Colombia' },
    ],
    colors: [
      {
        id: 'rojo',
        name: 'Rojo',
        hex: '#e31937',
        image: '/images/illustrations/mark2_rojo.png',
      },
      {
        id: 'blanco',
        name: 'Blanco',
        hex: '#ffffff',
        image: '/images/illustrations/mark2_blanco.png',
      },
      {
        id: 'negro',
        name: 'Negro',
        hex: '#0a0a0a',
        image: '/images/illustrations/mark2_negro.png',
      },
    ],
    sizes: SIZES,
    available: true,
    order: 2,
    galleryImages: ['/images/illustrations/mark2_tres_juntos.png'],
  },
  {
    id: 'skinning-roll',
    slug: 'skinning-roll-rollfinger',
    name: 'SKINNING ROLL',
    subtitle: 'ROLLFINGER',
    sku: 'AO33-SR',
    priceSmall: SKINNING_PRICE_SMALL,
    priceLarge: SKINNING_PRICE_LARGE,
    claim: 'Agarre superior. Seguridad total.',
    description: 'El SKINNING ROLL presenta un corte envolvente que maximiza el área de contacto con el balón. Ideal para arqueros que priorizan adherencia y control en entrenamientos y competencia.',
    cutType: 'Rollfinger (envolvente)',
    palm: 'Látex de alto rendimiento, superficie continua, máximo grip',
    body: 'Base elástica tipo neopreno, ajuste anatómico',
    closure: 'Doble elástico, ajuste firme y seguro',
    punchZone: true,
    features: [
      { icon: 'roll', text: 'Corte rollfinger envolvente' },
      { icon: 'neoprene', text: 'Cuerpo de neopreno' },
      { icon: 'double', text: 'Doble cierre elástico' },
      { icon: 'shipping', text: 'Envío a todo Colombia' },
    ],
    colors: [
      {
        id: 'default',
        name: 'Default',
        hex: '#0a0a0a',
        image: '/images/illustrations/Skinning Roll.png',
      },
    ],
    sizes: SIZES,
    available: true,
    order: 3,
    galleryImages: ['/images/illustrations/WhatsApp Image 2025-10-07 at 16.21.41.jpeg'],
  },
]

export function getAllProducts(): Product[] {
  return products.sort((a, b) => a.order - b.order)
}

export function getAvailableProducts(): Product[] {
  return getAllProducts().filter((p) => p.available)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
