'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, ChevronRight, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { weeklyData } from './data'
import { MealDetail } from './components/meal-detail'
import { ExerciseDetail } from './components/exercise-detail'
import { useRouter } from 'next/navigation'

interface TimeBlockProps {
  duration: number
  children: React.ReactNode
  showTime?: boolean
  onClick?: () => void
  completed?: boolean
}

function TimeBlock({ duration, children, showTime = true, onClick, completed }: TimeBlockProps) {
  return (
    <div 
      className={cn(
        "flex items-start justify-between gap-4 pb-4",
        onClick && "cursor-pointer hover:bg-[#f5f5f5] rounded-lg transition-colors duration-200 p-2 -m-2"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "flex-1",
        completed && "text-[#d9d9d9] line-through"
      )}>
        {children}
      </div>
      {showTime && (
        <div className="flex items-center gap-1.5 text-sm text-[#6b6a6b] whitespace-nowrap">
          <Clock className="w-4 h-4" />
          <span>{duration} min</span>
        </div>
      )}
    </div>
  )
}

export default function WeeklyPlan() {
  const router = useRouter()
  const [activeDay, setActiveDay] = useState(0)
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const storedCartCount = localStorage.getItem('cartCount')
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount, 10))
    }
  }, [])

  const dayData = weeklyData[activeDay]

  const handleMealClick = (meal: string) => {
    setSelectedMeal(meal)
  }

  const handleExerciseClick = (exercise: string) => {
    setSelectedExercise(exercise)
  }

  // Calculate progress for each section
  const exerciseProgress = dayData.exercise.weightTraining.exercises.reduce((acc, ex) => 
    acc + (completedExercises.has(ex) ? 1 : 0), 0) / 
    (dayData.exercise.weightTraining.exercises.length + 1) * 100 // +1 for cardio

  return (
    <>
      {selectedMeal && (
        <MealDetail
          open={!!selectedMeal}
          onOpenChange={(open) => !open && setSelectedMeal(null)}
          mealId={selectedMeal}
        />
      )}

      {selectedExercise && (
        <ExerciseDetail
          open={!!selectedExercise}
          onOpenChange={(open) => !open && setSelectedExercise(null)}
          exerciseId={selectedExercise}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-[#FFF6F3] via-white to-[#F5F3FF]">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 h-16 flex justify-between items-center">
            <div className="text-[#e35d23] text-2xl font-bold">HERO</div>
            <button 
              className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
              onClick={() => router.push('/supplements/store')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#e35d23] text-white text-xs flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Title Section */}
          <div className="mb-12 max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-[#082032] mb-3">
              Your Daily Overview
            </h1>
            <p className="text-[#6b6a6b]">
              Track your nutrition, exercise, and supplement plan for optimal health and performance.
            </p>
          </div>

          {/* Day Selection */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-8">
            {weeklyData.map((day, index) => (
              <button
                key={day.date}
                onClick={() => setActiveDay(index)}
                className={cn(
                  "p-4 rounded-2xl text-left transition-all duration-200",
                  activeDay === index
                    ? "bg-[#082032] text-white shadow-lg"
                    : "bg-white/70 hover:bg-white"
                )}
              >
                <div className="text-sm font-medium">{day.date}</div>
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Nutrition Section */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">NUTRITION</h2>
                <Link href="/grocery">
                  <Button variant="outline" size="sm" className="gap-2">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Breakfast</h3>
                  <TimeBlock 
                    duration={dayData.nutrition.breakfast.duration}
                    onClick={() => handleMealClick(dayData.nutrition.breakfast.meal)}
                  >
                    {dayData.nutrition.breakfast.meal}
                  </TimeBlock>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Lunch</h3>
                  <TimeBlock 
                    duration={dayData.nutrition.lunch.duration}
                    onClick={() => handleMealClick(dayData.nutrition.lunch.meal)}
                  >
                    {dayData.nutrition.lunch.meal}
                  </TimeBlock>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Dinner</h3>
                  <TimeBlock 
                    duration={dayData.nutrition.dinner.duration}
                    onClick={() => handleMealClick(dayData.nutrition.dinner.meal)}
                  >
                    {dayData.nutrition.dinner.meal}
                  </TimeBlock>
                </div>
              </div>
            </Card>

            {/* Exercise Section */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">EXERCISE</h2>
                <Link href="/exercise-checklist">
                  <Button variant="outline" size="sm" className="gap-2">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-6">
                {/* Removed horizontal gray line */}
                <div className="space-y-4"> {/* Added space-y-4 */}
                  <div>
                    <h3 className="font-medium mb-3">Weight Training</h3>
                    <TimeBlock 
                      duration={dayData.exercise.weightTraining.duration}
                      onClick={() => handleExerciseClick(dayData.exercise.weightTraining.exercises[0])}
                    >
                      <div className="space-y-2">
                        {dayData.exercise.weightTraining.exercises.map((exercise, index) => (
                          <div 
                            key={index}
                            className={cn(
                              completedExercises.has(exercise) && "line-through text-[#d9d9d9]"
                            )}
                          >
                            {exercise}
                          </div>
                        ))}
                      </div>
                    </TimeBlock>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Cardio</h3>
                    <TimeBlock 
                      duration={dayData.exercise.cardio.duration}
                      onClick={() => handleExerciseClick('Steady-State Cardio')}
                      completed={completedExercises.has(dayData.exercise.cardio.exercise)}
                    >
                      {dayData.exercise.cardio.exercise}
                    </TimeBlock>
                  </div>
                </div>
              </div>
            </Card>

            {/* Supplements Section */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">SUPPLEMENTS</h2>
                <Link href="/supplements">
                  <Button variant="outline" size="sm" className="gap-2">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Morning</h3>
                  <TimeBlock 
                    duration={dayData.supplements.morning.duration}
                    showTime={false}
                  >
                    <div className="space-y-2">
                      {dayData.supplements.morning.items.map((item, index) => (
                        <div key={index}>{item}</div>
                      ))}
                    </div>
                  </TimeBlock>
                </div>
                <div>
                  <h3 className="font-medium mb-3">After workout</h3>
                  <TimeBlock 
                    duration={dayData.supplements.postWorkout.duration}
                    showTime={false}
                  >
                    {dayData.supplements.postWorkout.items[0]}
                  </TimeBlock>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Evening</h3>
                  <TimeBlock 
                    duration={dayData.supplements.evening.duration}
                    showTime={false}
                  >
                    {dayData.supplements.evening.items[0]}
                  </TimeBlock>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}

