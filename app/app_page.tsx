import PersonalDetailsForm from '@/components/personal-details-form'
import { ThemeProvider } from '@/components/theme-provider'
import Image from 'next/image'

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center justify-between mb-12">
            <svg width="102.83" height="22" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 31.8293V0.170732H12.8205V11.4634H20.5128V0.170732H33.3333V31.8293H20.5128V20.5366H12.8205V31.8293H0Z" fill="#FF5D38"/>
              <path d="M38.4615 31.8293V0.170732H51.2821V31.8293H38.4615Z" fill="#FF5D38"/>
              <path d="M56.4103 31.8293V0.170732H69.2308L80 17.0732V0.170732H92.8205V31.8293H80L69.2308 14.9268V31.8293H56.4103Z" fill="#FF5D38"/>
            </svg>
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Be_The_Hero-bQBaOxHCBwbQUYgrHxr58PyblD2Zx4.png"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </nav>
          <div className="flex flex-col lg:flex-row items-start justify-between">
            <div className="w-full lg:w-[calc(100%-692px)] mb-8 lg:mb-0">
              <PersonalDetailsForm />
            </div>
            <div className="w-full lg:w-[692px] lg:ml-8">
              <div className="relative w-full" style={{ height: 'calc(100vh - 120px)' }}>
                <Image
                  src="/placeholder.svg?height=1000&width=692"
                  alt="Decorative image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}

