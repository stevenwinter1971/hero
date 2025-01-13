'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProgressIndicator } from '@/app/components/progress-indicator'
import { Navigation } from '@/app/components/navigation'
import { OptionCard } from '@/app/components/option-card'
import { Filter } from 'lucide-react'
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from 'next/image'
import { Header } from '@/app/components/header';

const DIETS = [
  'No dietary restrictions',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb'
]

const dietaryRestrictionsSchema = z.object({
  dietaryRestrictions: z.array(z.string()).min(1, "Please select at least one option"),
})

type DietaryRestrictionsFormValues = z.infer<typeof dietaryRestrictionsSchema>

export default function DietaryRestrictions() {
  const form = useForm<DietaryRestrictionsFormValues>({
    resolver: zodResolver(dietaryRestrictionsSchema),
    defaultValues: {
      dietaryRestrictions: [],
    },
  })

  function onSubmit(data: DietaryRestrictionsFormValues) {
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#1b1b1b]">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <Header />
      </header>

      <main className="grid min-h-screen md:grid-cols-2">
        <div className="px-4 py-20 md:px-12 lg:px-20">
          <div className="max-w-xl">
            <div className="space-y-8">
              <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-[#1b1b1b]">
                  Select any specific diets or restrictions.
                </h1>
                <ProgressIndicator currentStep={5} totalSteps={6} />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {DIETS.map((diet) => (
                            <OptionCard
                              key={diet}
                              icon={Filter}
                              label={diet}
                              selected={field.value.includes(diet)}
                              onClick={() => {
                                let updatedValue: string[];
                                if (diet === 'No dietary restrictions') {
                                  updatedValue = field.value.includes(diet) ? [] : ['No dietary restrictions'];
                                } else {
                                  updatedValue = field.value.includes(diet)
                                    ? field.value.filter(d => d !== diet && d !== 'No dietary restrictions')
                                    : [...field.value.filter(d => d !== 'No dietary restrictions'), diet];
                                }
                                form.setValue("dietaryRestrictions", updatedValue);
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
                      currentStep={5}
                      totalSteps={6}
                      previousPath="/survey/step4"
                    />
                    <Navigation
                      currentStep={5}
                      totalSteps={6}
                      nextPath="/survey/review"
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

