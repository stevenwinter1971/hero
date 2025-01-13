'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Dumbbell, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation'

interface Exercise {
  id: string
  name: string
  duration: number
  sets?: number
  reps?: number
  completed: boolean
  category: 'Strength' | 'Cardio' | 'Mobility'
  instructions: string[]
}

const EXERCISES: Exercise[] = [
  {
    id: "Dumbbell Bench Press",
    name: "Dumbbell Bench Press",
    duration: 8,
    sets: 5,
    reps: 5,
    completed: false,
    category: 'Strength',
    instructions: [
      "Lie on a flat bench with a dumbbell in each hand resting on your thighs.",
      "Lift the dumbbells to chest height with your palms facing your feet.",
      "Press the dumbbells up with your elbows slightly bent.",
      "Lower the dumbbells slowly until they are level with your chest.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    id: "Steady-State Cardio",
    name: "Steady-State Cardio",
    duration: 30,
    completed: false,
    category: 'Cardio',
    instructions: [
      "Choose a cardio machine (treadmill, elliptical, or stationary bike).",
      "Start with a 5-minute warm-up at a low intensity.",
      "Increase to a moderate intensity where you can still hold a conversation.",
      "Maintain this pace for 20 minutes.",
      "Cool down for 5 minutes at a lower intensity."
    ]
  },
  {
    id: "Bent Over Rows",
    name: "Bent Over Rows",
    duration: 10,
    sets: 4,
    reps: 8,
    completed: false,
    category: 'Strength',
    instructions: [
      "Stand with your feet shoulder-width apart, knees slightly bent.",
      "Bend at your hips, keeping your back straight until your upper body is nearly parallel to the floor.",
      "Hold a dumbbell in each hand with your arms hanging straight down.",
      "Lift the dumbbells to the sides of your chest, keeping your elbows close to your body.",
      "Lower the dumbbells back to the starting position.",
      "Repeat for the desired number of repetitions."
    ]
  },
  {
    id: "Dynamic Stretching",
    name: "Dynamic Stretching",
    duration: 10,
    completed: false,
    category: 'Mobility',
    instructions: [
      "Start with arm circles: 10 forward, 10 backward.",
      "Do 10 leg swings for each leg.",
      "Perform 10 torso twists.",
      "Do 10 hip rotations in each direction.",
      "Finish with 10 jumping jacks."
    ]
  }
]

export default function ExerciseChecklist() {
  const router = useRouter()
  const [exercises, setExercises] = useState<Exercise[]>(EXERCISES)
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null)

  const progress = (exercises.filter(ex => ex.completed).length / exercises.length) * 100

  const toggleExercise = (id: string) => {
    setExercises(exercises.map(exercise =>
      exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise
    ))
  }

  const toggleExpand = (id: string) => {
    setExpandedExercise(expandedExercise === id ? null : id)
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
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[#082032]">
                Today's Workout
              </h1>
              <p className="text-[#6b6a6b] mt-2">
                {formattedDate}
              </p>
              <p className="text-[#6b6a6b] mt-2">
                {exercises.filter(ex => ex.completed).length} of {exercises.length} exercises completed
              </p>
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
                  {exercises.map(exercise => (
                    <div key={exercise.id}>
                      <div
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-lg bg-white border transition-colors",
                          expandedExercise === exercise.id ? "border-[#a0aec0]" : "border-[#f5f5f5]",
                          "hover:border-[#a0aec0]"
                        )}
                      >
                        <Checkbox
                          id={exercise.id}
                          checked={exercise.completed}
                          onCheckedChange={() => toggleExercise(exercise.id)}
                          className="h-5 w-5 rounded border-[#a0aec0] text-[#e35d23] focus:ring-[#e35d23]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor={exercise.id}
                              className={cn(
                                "font-medium",
                                exercise.completed && "line-through text-[#d9d9d9]"
                              )}
                            >
                              {exercise.name}
                            </label>
                            <button
                              onClick={() => toggleExpand(exercise.id)}
                              className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors"
                            >
                              <ChevronDown 
                                className={cn(
                                  "w-4 h-4 text-[#6b6a6b] transition-transform duration-200",
                                  expandedExercise === exercise.id && "transform rotate-180"
                                )} 
                              />
                            </button>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#6b6a6b] mt-1">
                            <div className="flex items-center gap-1">
                              <Dumbbell className="w-4 h-4" />
                              {exercise.category}
                            </div>
                            {exercise.sets && exercise.reps && (
                              <div>
                                {exercise.sets} sets × {exercise.reps} reps
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {expandedExercise === exercise.id && (
                        <div className="mt-2 p-4 bg-[#f7f9fb] rounded-lg">
                          <h4 className="font-medium mb-2">Instructions:</h4>
                          <ol className="list-decimal list-inside space-y-1">
                            {exercise.instructions.map((instruction, index) => (
                              <li key={index} className="text-sm text-[#414141]">{instruction}</li>
                            ))}
                          </ol>
                        </div>
                      )}
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

