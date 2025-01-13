'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Supplement {
  id: string
  name: string
  taken: boolean
  timeOfDay: 'morning' | 'postWorkout' | 'evening'
}

const SUPPLEMENTS: Supplement[] = [
  { id: '1', name: 'L-Theanine', taken: false, timeOfDay: 'morning' },
  { id: '2', name: 'Omega-3 Fish Oil', taken: false, timeOfDay: 'morning' },
  { id: '3', name: 'Vitamin D3', taken: false, timeOfDay: 'morning' },
  { id: '4', name: 'Protein Powder Shake', taken: false, timeOfDay: 'postWorkout' },
  { id: '5', name: 'Zinc', taken: false, timeOfDay: 'evening' },
]

export default function SupplementTracker() {
  const router = useRouter()
  const [supplements, setSupplements] = useState<Supplement[]>(SUPPLEMENTS)

  const progress = (supplements.filter(s => s.taken).length / supplements.length) * 100

  const toggleSupplement = (id: string) => {
    setSupplements(supplements.map(supplement =>
      supplement.id === id ? { ...supplement, taken: !supplement.taken } : supplement
    ))
  }

  const groupedSupplements = supplements.reduce((acc, supplement) => {
    if (!acc[supplement.timeOfDay]) {
      acc[supplement.timeOfDay] = []
    }
    acc[supplement.timeOfDay].push(supplement)
    return acc
  }, {} as Record<string, Supplement[]>)

  const timeLabels = {
    morning: 'Morning',
    postWorkout: 'After Workout',
    evening: 'Evening'
  }

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start py-4">
            <div className="text-[#e35d23] text-2xl font-bold">HERO</div>
            <Button
              variant="ghost"
              size="icon"
              className="mt-2 text-[#6b6a6b] hover:text-[#082032]"
              onClick={() => router.push('/weekly-plan')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-[#082032]">
                  Daily Supplements
                </h1>
                <p className="text-[#6b6a6b] mt-2">
                  {formattedDate}
                </p>
                <p className="text-[#6b6a6b] mt-2">
                  {supplements.filter(s => s.taken).length} of {supplements.length} supplements taken
                </p>
              </div>
              <Link href="/supplements/store">
                <Button variant="outline" className="gap-2">
                  View Store
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="h-1 bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      progress === 100 ? "bg-[#00A656]" : "bg-[#a0aec0]"
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-6">
                  {Object.entries(groupedSupplements).map(([timeOfDay, timeSupplements]) => (
                    <div key={timeOfDay}>
                      <h2 className="font-medium text-[#082032] mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {timeLabels[timeOfDay as keyof typeof timeLabels]}
                      </h2>
                      <div className="space-y-2">
                        {timeSupplements.map(supplement => (
                          <div
                            key={supplement.id}
                            className="flex items-center gap-3 p-4 rounded-lg bg-white border border-[#f5f5f5] hover:border-[#a0aec0] transition-colors"
                          >
                            <Checkbox
                              id={supplement.id}
                              checked={supplement.taken}
                              onCheckedChange={() => toggleSupplement(supplement.id)}
                              className="h-5 w-5 rounded border-[#a0aec0] text-[#e35d23] focus:ring-[#e35d23]"
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={supplement.id}
                                className={cn(
                                  "font-medium",
                                  supplement.taken && "line-through text-[#d9d9d9]"
                                )}
                              >
                                {supplement.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

