'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProgressIndicator } from '@/app/components/progress-indicator'
import { Navigation } from '@/app/components/navigation'
import { OptionCard } from '@/app/components/option-card'
import { Dumbbell } from 'lucide-react'
import { sportsPreferencesSchema, type SportsPreferencesFormValues } from '@/app/lib/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Header } from '@/app/components/header'
import Image from 'next/image'

const FITNESS_LEVELS = ["Beginner", "Intermediate", "Advanced"]

const SPORTS = [
  "General Fitness",
  "Basketball",
  "Golf",
  "Brazilian Jiu Jitsu",
  "Cycling",
  "Running"
]

export default function SportsPreferences() {
  const form = useForm<SportsPreferencesFormValues>({
    resolver: zodResolver(sportsPreferencesSchema),
    defaultValues: {
      fitnessLevel: undefined,
      preferredSport: undefined,
    },
  })

  function onSubmit(data: SportsPreferencesFormValues) {
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#1b1b1b]">
      <Header />
      <main className="grid min-h-screen md:grid-cols-2">
        <div className="px-4 py-20 md:px-12 lg:px-20">
          <div className="max-w-xl">
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-[#1b1b1b]">
                  What's your preferred sport?
                </h1>
                <ProgressIndicator currentStep={2} totalSteps={6} />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fitnessLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fitness Level</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                          {FITNESS_LEVELS.map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => form.setValue("fitnessLevel", level as any)}
                              className={`
                                w-full rounded-full px-4 py-2 text-sm transition-colors
                                ${field.value === level 
                                  ? 'bg-[#1b1b1b] text-[#fdfdfd]' 
                                  : 'bg-[#f1f1f1] text-[#1b1b1b] hover:bg-[#282828] hover:text-[#fdfdfd]'}
                              `}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                        <FormMessage>{field.error?.message?.toString() || ''}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredSport"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {SPORTS.map((sport) => (
                            <OptionCard
                              key={sport}
                              icon={Dumbbell}
                              label={sport}
                              selected={field.value === sport}
                              onClick={() => form.setValue("preferredSport", sport as any)}
                            />
                          ))}
                        </div>
                        <FormMessage>{field.error?.message?.toString() || ''}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Navigation
                      currentStep={2}
                      totalSteps={6}
                      previousPath="/survey/step1"
                    />
                    <Navigation
                      currentStep={2}
                      totalSteps={6}
                      nextPath="/survey/step3"
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Illustration-N0YPFmobR6WkXx8fqRriAwUAVb7duF.png"
            alt="Lifestyle illustration"
            width={720}
            height={1080}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </main>
    </div>
  )
}

