interface ReportPreviewCardProps {
  title: string
  subtitle?: string
  className?: string
}

export function ReportPreviewCard({ title, subtitle, className }: ReportPreviewCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-[#00a656]" />
        <span className="text-sm text-[#727272]">{title}</span>
        {subtitle && (
          <>
            <span className="text-sm text-[#727272]">/</span>
            <span className="text-sm text-[#1b1b1b]">{subtitle}</span>
          </>
        )}
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-[#f1f1f1] rounded-full w-3/4" />
        <div className="h-2 bg-[#f1f1f1] rounded-full w-1/2" />
      </div>
    </div>
  )
}

