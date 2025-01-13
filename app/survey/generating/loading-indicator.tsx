export function LoadingIndicator() {
  return (
    <div className="inline-flex items-center justify-center rounded-full px-6 py-2.5 bg-white gap-3
      border border-[#f1f1f1] shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
    >
      <span className="text-[#1b1b1b] font-medium">Generating</span>
      <div className="w-4 h-4 border-2 border-[#1b1b1b]/20 border-t-[#1b1b1b] rounded-full animate-spin" />
    </div>
  )
}

