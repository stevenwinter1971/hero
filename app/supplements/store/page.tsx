'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  primaryCategory: 'Cognitive' | 'Vitality' | 'Longevity'
  secondaryCategory: string
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Creatine Monohydrate',
    brand: 'Thorne',
    price: 27,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/supplementExample-6CH6u32RhpnXRAnhwsPg5NuTevivba.png',
    primaryCategory: 'Vitality',
    secondaryCategory: 'Strength and Power'
  },
  {
    id: '2',
    name: 'L-Theanine Complex',
    brand: 'Thorne',
    price: 27,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/supplementExample-6CH6u32RhpnXRAnhwsPg5NuTevivba.png',
    primaryCategory: 'Cognitive',
    secondaryCategory: 'Focus Improvement'
  },
  {
    id: '3',
    name: 'Omega-3 Fish Oil',
    brand: 'Thorne',
    price: 27,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/supplementExample-6CH6u32RhpnXRAnhwsPg5NuTevivba.png',
    primaryCategory: 'Longevity',
    secondaryCategory: 'Anti-Inflammatory Support'
  },
  {
    id: '4',
    name: 'Magnesium Glycinate',
    brand: 'Thorne',
    price: 27,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/supplementExample-6CH6u32RhpnXRAnhwsPg5NuTevivba.png',
    primaryCategory: 'Cognitive',
    secondaryCategory: 'Sleep Support'
  },
  {
    id: '5',
    name: 'Vitamin D3/K2',
    brand: 'Thorne',
    price: 27,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/supplementExample-6CH6u32RhpnXRAnhwsPg5NuTevivba.png',
    primaryCategory: 'Longevity',
    secondaryCategory: 'Bone Health'
  },
  {
    id: '6',
    name: 'Pre-Workout Complex',
    brand: 'Thorne',
    price: 27,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/supplementExample-6CH6u32RhpnXRAnhwsPg5NuTevivba.png',
    primaryCategory: 'Vitality',
    secondaryCategory: 'Energy and Endurance'
  },
]

const CATEGORIES = ['All', 'Cognitive', 'Vitality', 'Longevity']

export default function SupplementStore() {
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    const storedCartCount = localStorage.getItem('cartCount')
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount, 10))
    }
  }, [])

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.primaryCategory === selectedCategory)

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
              onClick={() => router.push('/supplements')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute top-4 right-4">
            <button className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5 text-[#082032]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#e35d23] text-white text-xs flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-[#082032]">
                Your Personalized Supplement Plan
              </h1>
              <p className="text-[#6b6a6b] mt-2">
                Curated to optimize your health and performance based on your unique profile and lifestyle.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="mr-2"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative bg-white p-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-[#6b6a6b]">by {product.brand}</p>
                      </div>
                      <p className="font-medium">${product.price}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-[#f5f5f5] px-2 py-1 text-xs">
                        {product.primaryCategory}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-[#f5f5f5] px-2 py-1 text-xs">
                        {product.secondaryCategory}
                      </span>
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => {
                        const newCount = cartCount + 1
                        setCartCount(newCount)
                        localStorage.setItem('cartCount', newCount.toString())
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

