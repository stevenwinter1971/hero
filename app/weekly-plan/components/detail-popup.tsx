'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogPortal } from "@/components/ui/dialog"
import { ChevronDown } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DetailPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subtitle?: string
  duration: number
  image: string
  sections: {
    title: string
    content: React.ReactNode
  }[]
}

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-[#f5f5f5]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <ChevronDown className={cn(
          "w-5 h-5 transition-transform duration-200",
          isOpen && "transform rotate-180"
        )} />
      </button>
      {isOpen && (
        <div className="pb-6">
          {children}
        </div>
      )}
    </div>
  )
}

export function DetailPopup({
  open,
  onOpenChange,
  title,
  subtitle,
  duration,
  image,
  sections
}: DetailPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="max-w-3xl p-0">
          <div className="max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => onOpenChange(false)}
              className="absolute right-5 top-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:opacity-80 transition-colors"
              aria-label="Close"
            >
              <span className="text-2xl text-white leading-none">&times;</span>
            </button>
            
            <div className="relative h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight">
                      {title}
                    </h2>
                    {subtitle && (
                      <p className="text-lg text-white/90 mt-2">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm whitespace-nowrap mt-1">
                    <span>{duration} min</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6">
              {sections.map((section, index) => (
                <CollapsibleSection key={index} title={section.title} defaultOpen>
                  {section.content}
                </CollapsibleSection>
              ))}
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

