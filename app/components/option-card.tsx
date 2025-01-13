import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'

interface OptionCardProps {
  icon: LucideIcon
  label: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function OptionCard({
  icon: Icon,
  label,
  selected,
  onClick,
  className
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full h-24 p-4 rounded-lg border text-center transition-colors flex flex-col items-center justify-center",
        selected ? "bg-[#1b1b1b] text-[#fdfdfd] border-[#1b1b1b]" : "border-gray-200 text-[#1b1b1b]",
        selected ? "hover:bg-[#282828]" : "hover:bg-[#f1f1f1]",
        className
      )}
    >
      <Icon className="h-6 w-6 mb-2" />
      <span className="text-sm">{label}</span>
    </button>
  )
}

