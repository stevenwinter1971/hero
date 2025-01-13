'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProgressIndicator } from '@/app/components/progress-indicator'
import { Navigation } from '@/app/components/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OptionCard } from '@/app/components/option-card'
import { UserIcon as Male, UserIcon as Female } from 'lucide-react'
import { personalDetailsSchema, type PersonalDetailsFormValues } from '@/app/lib/schema'
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

export default function PersonalDetails() {
  const form = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      birthdate: "",
      weight: undefined,
      heightFeet: undefined,
      heightInches: undefined,
      sex: undefined,
    },
  })

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    let formattedDate = ''
    if (value.length > 0) {
      formattedDate += value.substr(0, 2)
      if (value.length > 2) {
        formattedDate += '/' + value.substr(2, 2)
        if (value.length > 4) {
          formattedDate += '/' + value.substr(4, 4)
        }
      }
    }
    form.setValue("birthdate", formattedDate)
  }

  function onSubmit(data: PersonalDetailsFormValues) {
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
                  Provide your personal details.
                </h1>
                <ProgressIndicator currentStep={1} totalSteps={6} />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="birthdate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birthdate</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MM/DD/YYYY"
                              {...field}
                              onChange={handleBirthdateChange}
                              maxLength={10}
                            />
                          </FormControl>
                          <FormMessage>{field.error?.message?.toString() || ''}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (pounds)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g. 165"
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                          </FormControl>
                          <FormMessage>{field.error?.message?.toString() || ''}</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="heightFeet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (feet)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g. 5"
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                          </FormControl>
                          <FormMessage>{field.error?.message?.toString() || ''}</FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="heightInches"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g. 9"
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                          </FormControl>
                          <FormMessage>{field.error?.message?.toString() || ''}</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biological Sex</FormLabel>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <OptionCard
                            icon={Female}
                            label="Female"
                            selected={field.value === 'Female'}
                            onClick={() => form.setValue("sex", "Female")}
                          />
                          <OptionCard
                            icon={Male}
                            label="Male"
                            selected={field.value === 'Male'}
                            onClick={() => form.setValue("sex", "Male")}
                          />
                        </div>
                        <FormMessage>{field.error?.message?.toString() || ''}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <div>{/* Placeholder for consistency */}</div>
                    <Navigation
                      currentStep={1}
                      totalSteps={6}
                      nextPath="/survey/step2"
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

