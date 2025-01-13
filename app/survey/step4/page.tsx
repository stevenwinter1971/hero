'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProgressIndicator } from '@/app/components/progress-indicator'
import { Navigation } from '@/app/components/navigation'
import { OptionCard } from '@/app/components/option-card'
import { AlertTriangle } from 'lucide-react'
import { allergenPreferencesSchema, type AllergenPreferencesFormValues } from '@/app/lib/schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from 'next/image'
import {Header} from "@/app/components/header";

const ALLERGENS = [
  "No food allergies",
  "Milk (Dairy)",
  "Wheat / Gluten",
  "Eggs",
  "Peanuts",
  "Shellfish"
]

export default function AllergenPreferences() {
  const form = useForm<AllergenPreferencesFormValues>({
    resolver: zodResolver(allergenPreferencesSchema),
    defaultValues: {
      allergens: [],
    },
  })

  function onSubmit(data: AllergenPreferencesFormValues) {
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
                  Let us know any allergens to avoid.
                </h1>
                <ProgressIndicator currentStep={4} totalSteps={6} />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="allergens"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {ALLERGENS.map((allergen) => (
                            <OptionCard
                              key={allergen}
                              icon={AlertTriangle}
                              label={allergen}
                              selected={field.value.includes(allergen)}
                              onClick={() => {
                                let updatedValue: string[];
                                if (allergen === "No food allergies") {
                                  updatedValue = field.value.includes(allergen) ? [] : ["No food allergies"];
                                } else {
                                  updatedValue = field.value.includes(allergen)
                                    ? field.value.filter(a => a !== allergen && a !== "No food allergies")
                                    : [...field.value.filter(a => a !== "No food allergies"), allergen];
                                }
                                form.setValue("allergens", updatedValue as any);
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
                      currentStep={4}
                      totalSteps={6}
                      previousPath="/survey/step3"
                    />
                    <Navigation
                      currentStep={4}
                      totalSteps={6}
                      nextPath="/survey/step5"
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

