import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Navigation({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <Link href={`/survey/step${currentStep - 1}`}>
          <Button variant="outline">Back</Button>
        </Link>
      )}
      {currentStep < 5 && (
        <Link href={`/survey/step${currentStep + 1}`} className="ml-auto">
          <Button>Next</Button>
        </Link>
      )}
      {currentStep === 5 && (
        <Button type="submit" className="ml-auto">Submit</Button>
      )}
    </div>
  )
}

