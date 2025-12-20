// Tipos compartidos para AO33

export interface ProductColor {
  id: string
  name: string
  hex: string
  image: string
}

export interface ProductFeature {
  icon: string
  text: string
}

export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  sku: string
  priceSmall: number  // Precio para tallas 6-8
  priceLarge: number  // Precio para tallas 9-11
  claim: string
  description: string
  cutType: string
  palm?: string
  body?: string
  closure: string
  punchZone?: boolean
  features: ProductFeature[]
  colors: ProductColor[]
  sizes: number[]
  available: boolean
  comingSoon?: boolean
  order: number
  galleryImages?: string[]
}

export interface CartItem {
  productId: string
  productName: string
  productSubtitle: string
  colorId: string
  colorName: string
  size: number
  quantity: number
  price: number
  image: string
}

export interface Selection {
  colorId: string
  colorName: string
  size: number
  quantity: number
  image: string
}
