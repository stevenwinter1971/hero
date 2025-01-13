interface PreviewCardProps {
  category: string
  subcategory?: string
}

export function PreviewCard({ category, subcategory }: PreviewCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#00a656]" />
        <span className="text-[#727272] text-sm">{category}</span>
        {subcategory && (
          <>
            <span className="text-[#727272] text-sm">/</span>
            <span className="text-sm text-[#1b1b1b]">{subcategory}</span>
          </>
        )}
      </div>
      <div className="space-y-2 mt-4">
        <div className="h-2 bg-[#f1f1f1] rounded-full w-3/4" />
        <div className="h-2 bg-[#f1f1f1] rounded-full w-full" />
        <div className="h-2 bg-[#f1f1f1] rounded-full w-2/3" />
      </div>
    </div>
  )
}

