'use client'

import { LoadingIndicator } from './loading-indicator'
import { PreviewCard } from './preview-card'
import { useEffect, useState } from 'react'
import { Header } from '@/app/components/header'
import { useRouter } from 'next/navigation'

const PREVIEW_CARDS = [
  {
    category: "Exercises",
    subcategory: "Brazilian Jiu Jitsu"
  },
  {
    category: "Nutrition",
    subcategory: "7 day meal plan"
  },
  {
    category: "Supplements",
    subcategory: "Recovery"
  }
]

export default function GeneratingPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((current) => (current + 1) % PREVIEW_CARDS.length)
    }, 3000) // Change card every 3 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // After 3 seconds of showing the generating state, navigate to weekly plan
    const navigationTimer = setTimeout(() => {
      router.push('/weekly-plan')
    }, 3000)

    return () => clearTimeout(navigationTimer)
  }, [router])

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <Header />

      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[720px] space-y-8">
          <div className="text-center space-y-8">
            <h1 className="text-[56px] leading-[1.1] font-bold tracking-[-0.02em] text-[#1b1b1b]">
              Your personalized<br />lifestyle report is<br />generating.
            </h1>
            <LoadingIndicator />
          </div>

          <div className="relative h-[140px]">
            {PREVIEW_CARDS.map((card, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-500 ${
                  index === currentCardIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <PreviewCard 
                  category={card.category}
                  subcategory={card.subcategory}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

