'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/app/components/header'

export default function Review() {
  const router = useRouter()
  const sections = [
    {
      title: 'Personal details',
      path: '/survey/step1',
      fields: [
        { label: 'Age', value: '53' },
        { label: 'Biological Sex', value: 'Male' },
        { label: 'Weight', value: '165 lbs' },
        { label: 'Height', value: "5' 8\"" },
        { label: 'Fitness Level', value: 'Intermediate' },
      ],
      layout: 'grid'
    },
    {
      title: "Preferred sport",
      path: '/survey/step2',
      fields: [
        { value: 'Brazilian Jiu Jitsu' }
      ],
      layout: 'grid'
    },
    {
      title: 'Food preferences',
      path: '/survey/step3',
      fields: [
        { value: 'American' },
        { value: 'Chinese' },
        { value: 'Mexican' }
      ],
      layout: 'column'
    },
    {
      title: 'Allergens to avoid',
      path: '/survey/step4',
      fields: [
        { value: 'Milk (Dairy)' },
        { value: 'Eggs' }
      ],
      layout: 'column'
    },
    {
      title: 'Dietary restrictions',
      path: '/survey/step5',
      fields: [
        { value: 'Gluten-free' },
        { value: 'Low-Carb' }
      ],
      layout: 'column'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/survey/generating')
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#1b1b1b]">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-[#1b1b1b]">
                Review & confirm your details
              </h1>
              <Button 
                onClick={handleSubmit}
                className="inline-flex items-center justify-center h-11 px-8 py-3 bg-[#fdfdfd]/70 text-[#1b1b1b] transition-all duration-300
                  rounded-[90px] border border-white/90 gap-2.5
                  backdrop-blur-[32px]
                  shadow-[0_2.15px_0.5px_-2px_rgba(0,0,0,0.25),0_24px_24px_-16px_rgba(8,8,8,0.04),0_6px_13px_0_rgba(8,8,8,0.03),0_6px_4px_-4px_rgba(8,8,8,0.05),0_5px_1.5px_-4px_rgba(8,8,8,0.09)]
                  hover:bg-[#f1f1f1] hover:rounded-[100px] hover:border-t hover:border-t-[#282828]/10
                  hover:shadow-[inset_0_-1px_0_rgba(255,255,255,0.8),inset_0_6px_13px_rgba(24,24,24,0.03),inset_0_6px_4px_-4px_rgba(24,24,24,0.05),inset_0_4.5px_1.5px_-4px_rgba(24,24,24,0.07)]"
              >
                Generate
                <span className="text-[#00a656]">✓</span>
              </Button>
            </div>

            <div className="space-y-4">
              {sections.map((section, index) => (
                <Card key={index} className="border border-[#f1f1f1] shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium text-[#1b1b1b]">
                      {section.title}
                    </CardTitle>
                    <Link 
                      href={section.path}
                      className="p-2 hover:bg-[#f1f1f1] rounded-full transition-colors"
                    >
                      <Pencil className="h-4 w-4 text-[#727272]" />
                    </Link>
                  </CardHeader>
                  <CardContent>
                    {section.layout === 'grid' ? (
                      <dl className="grid grid-cols-3 gap-2 text-sm">
                        {section.fields.map((field, fieldIndex) => (
                          <div key={fieldIndex} className="flex flex-col">
                            {field.label && (
                              <dt className="text-[#727272]">{field.label}</dt>
                            )}
                            <dd className="font-medium text-[#1b1b1b]">{field.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <div className="space-y-1 text-sm">
                        {section.fields.map((field, fieldIndex) => (
                          <div key={fieldIndex} className="font-medium text-[#1b1b1b]">
                            {field.value}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

