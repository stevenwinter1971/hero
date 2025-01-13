'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Minus, Plus, ChevronLeft } from 'lucide-react'
import { Header } from '@/app/components/header'
import { cn } from '@/lib/utils'
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { getIngredientsForDays } from './meal-data'
import { useRouter } from 'next/navigation'
import { shareGroceryList } from './actions'
import { useToast } from "@/components/ui/use-toast"

interface GroceryItem {
  id: string
  name: string
  amount: number
  unit: string
  category: string
  checked: boolean
}

const CATEGORIES = ['Produce', 'Grains', 'Protein', 'Dairy', 'Pantry'];

export default function GroceryList() {
  const router = useRouter()
  const { toast } = useToast()
  const [days, setDays] = useState(1)
  const [servings, setServings] = useState(1)
  const [items, setItems] = useState<GroceryItem[]>([])
  const [view, setView] = useState<'meal' | 'category'>('category')
  const [shareEmail, setShareEmail] = useState('')
  const [isSharing, setIsSharing] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const ingredients = getIngredientsForDays(days);
    setItems(ingredients.map((ingredient, index) => ({
      id: `${index}`,
      name: ingredient.name,
      amount: ingredient.amount * servings,
      unit: ingredient.unit,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      checked: false,
    })));
  }, [days, servings]);

  const progress = (items.filter(item => item.checked).length / items.length) * 100

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const adjustNumber = (setter: (n: number) => void, current: number, increment: boolean) => {
    if (increment && current < 10) {
      setter(current + 1)
    } else if (!increment && current > 1) {
      setter(current - 1)
    }
  }

  const groupedItems = items.reduce((acc, item) => {
    const key = view === 'meal' ? 'All Meals' : item.category
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(item)
    return acc
  }, {} as Record<string, GroceryItem[]>)

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSharing(true)

    try {
      const itemsList = items.map(item => 
        `${item.name}: ${item.amount} ${item.unit}`
      ).join('\n')

      const result = await shareGroceryList(shareEmail, itemsList)

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        setDialogOpen(false)
        setShareEmail('')
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share grocery list. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

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
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold tracking-tight text-[#082032]">
                Grocery List
              </h1>
              <div className="flex gap-2">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 bg-[#f5f5f5] border border-[#e2e8f0]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#082032]"
                      >
                        <path
                          fill="currentColor"
                          d="M27.71 4.29a1 1 0 0 0-1.05-.23l-22 8a1 1 0 0 0 0 1.87l9.6 3.84l3.84 9.6a1 1 0 0 0 .9.63a1 1 0 0 0 .92-.66l8-22a1 1 0 0 0-.21-1.05M19 24.2l-2.79-7L21 12.41L19.59 11l-4.83 4.83L7.8 13l17.53-6.33Z"
                        />
                      </svg>
                      Share
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Share Grocery List</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleShare} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                        required
                      />
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isSharing}
                      >
                        {isSharing ? 'Sending...' : 'Send'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline"
                  className="gap-2 bg-[#f5f5f5] hover:bg-[#f5f5f5]/90 border border-[#e2e8f0]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#FE710B]"
                  >
                    <path
                      fill="currentColor"
                      d="M15.629 9.619c1.421 1.429 2.58 3.766 1.917 5.152c-1.778 3.715-15.04 10.226-16.169 9.1C.252 22.746 6.768 9.476 10.481 7.697c1.388-.66 3.724.51 5.152 1.92l-.005.014v-.012zm7.028-1.566c-.231-.855-.821-1.717-1.7-1.82c-1.61-.186-4.151 2.663-3.971 3.339c.181.69 3.766 1.875 5.1.915c.691-.494.781-1.56.556-2.414zM17.666.158c1.198.324 2.407 1.148 2.551 2.382c.261 2.259-3.732 5.819-4.68 5.564c-.948-.251-2.618-5.284-1.269-7.162c.695-.972 2.201-1.106 3.399-.788z"
                    />
                  </svg>
                  Delivery
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-2 flex-1 w-full">
                  <label className="text-sm font-medium text-[#082032]">Days to shop for</label>
                  <div className="w-full">
                    <Slider
                      min={1}
                      max={7}
                      step={1}
                      value={[days]}
                      onValueChange={(value) => setDays(value[0])}
                    />
                  </div>
                  <div className="text-sm text-[#6b6a6b]">{days} day{days > 1 ? 's' : ''}</div>
                </div>

                <div className="space-y-2 flex-1 w-full md:w-auto">
                  <label className="text-sm font-medium text-[#082032]">Cooking for</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustNumber(setServings, servings, false)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-2xl font-medium w-8 text-center">{servings}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => adjustNumber(setServings, servings, true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Tabs defaultValue="category" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger
                      value="category"
                      onClick={() => setView('category')}
                    >
                      By Category
                    </TabsTrigger>
                    <TabsTrigger
                      value="meal"
                      onClick={() => setView('meal')}
                    >
                      By Meal Type
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="text-sm text-[#082032]">
                  {items.filter(item => item.checked).length} of {items.length} items
                </div>
              </div>

              <div className="h-1 bg-[#f5f5f5] rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    progress === 100 ? "bg-[#00A656]" : "bg-[#A0AEC0]"
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-6">
                {Object.entries(groupedItems).map(([group, groupItems]) => (
                  <div key={group}>
                    <h3 className="font-medium text-[#082032] mb-3">{group}</h3>
                    <div className="space-y-2">
                      {groupItems.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white"
                        >
                          <Checkbox
                            id={item.id}
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(item.id)}
                          />
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between gap-4 text-[15px]">
                              <label
                                htmlFor={item.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {item.name}
                              </label>
                              <span className="text-[#727272] whitespace-nowrap">
                                {item.amount % 1 === 0 ? Math.floor(item.amount) : item.amount.toFixed(1)} {item.unit}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

