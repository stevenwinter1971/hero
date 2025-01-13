export default function ProgressIndicator({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3, 4, 5]
  
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step) => (
        <div
          key={step}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  )
}

