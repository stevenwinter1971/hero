'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProgressIndicator } from '@/app/components/progress-indicator'
import { Navigation } from '@/app/components/navigation'
import { OptionCard } from '@/app/components/option-card'
import { Utensils } from 'lucide-react'
import { cuisinePreferencesSchema, type CuisinePreferencesFormValues } from '@/app/lib/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from 'next/image'
import { Header } from "@/app/components/header";

const CUISINES = [
  "American",
  "Italian",
  "Mexican",
  "Chinese",
  "Japanese",
  "Thai"
]

export default function CuisinePreferences() {
  const form = useForm<CuisinePreferencesFormValues>({
    resolver: zodResolver(cuisinePreferencesSchema),
    defaultValues: {
      preferredCuisines: [],
    },
  })

  function onSubmit(data: CuisinePreferencesFormValues) {
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#1b1b1b]">
      {/* Header */}
      <Header />

      <main className="grid min-h-screen md:grid-cols-2">
        <div className="px-4 py-20 md:px-12 lg:px-20">
          <div className="max-w-xl">
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-[#1b1b1b]">
                  Choose the types of foods you enjoy.
                </h1>
                <ProgressIndicator currentStep={3} totalSteps={6} />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="preferredCuisines"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {CUISINES.map((cuisine) => (
                            <OptionCard
                              key={cuisine}
                              icon={Utensils}
                              label={cuisine}
                              selected={field.value.includes(cuisine)}
                              onClick={() => {
                                const updatedValue = field.value.includes(cuisine)
                                  ? field.value.filter(c => c !== cuisine)
                                  : [...field.value, cuisine]
                                form.setValue("preferredCuisines", updatedValue as any)
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage>{field.error?.message?.toString() || ''}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Navigation
                      currentStep={3}
                      totalSteps={6}
                      previousPath="/survey/step2"
                    />
                    <Navigation
                      currentStep={3}
                      totalSteps={6}
                      nextPath="/survey/step4"
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

