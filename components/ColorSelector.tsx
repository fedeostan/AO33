'use client'

import type { ProductColor } from '@/types'

interface ColorSelectorProps {
  colors: ProductColor[]
  selected: string
  onChange: (color: ProductColor) => void
  size?: 'sm' | 'md'
}

export default function ColorSelector({
  colors,
  selected,
  onChange,
  size = 'md',
}: ColorSelectorProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
  }

  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onChange(color)}
          className={`${sizeClasses[size]} rounded-full border-2 transition-all ${
            selected === color.id
              ? 'border-white scale-110'
              : 'border-white/20 hover:border-white/50'
          }`}
          style={{ backgroundColor: color.hex }}
          aria-label={`Color ${color.name}`}
          title={color.name}
        >
          {/* Borde interno para el color blanco */}
          {color.hex === '#ffffff' && (
            <span className="block w-full h-full rounded-full border border-gray-300" />
          )}
        </button>
      ))}
    </div>
  )
}
