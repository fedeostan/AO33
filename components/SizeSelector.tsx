'use client'

interface SizeSelectorProps {
  sizes: number[]
  selected: number
  onChange: (size: number) => void
  compact?: boolean
}

export default function SizeSelector({
  sizes,
  selected,
  onChange,
  compact = false,
}: SizeSelectorProps) {
  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'}`}>
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`${
            compact ? 'w-7 h-7 text-xs' : 'w-10 h-10 text-sm'
          } rounded-lg font-medium transition-all ${
            selected === size
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
