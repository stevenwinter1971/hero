interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm bg-[#00A656]/10 text-[#00A656] whitespace-nowrap">
      {currentStep}/{totalSteps}
    </div>
  )
}

