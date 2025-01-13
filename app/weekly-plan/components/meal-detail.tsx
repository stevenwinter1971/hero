import { DetailPopup } from './detail-popup'
import { mealDetails } from '../data/meal-details'

interface MealDetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mealId: string
}

export function MealDetail({ open, onOpenChange, mealId }: MealDetailProps) {
  const meal = mealDetails[mealId]

  if (!meal) {
    return null
  }

  const sections = [
    {
      title: "INGREDIENTS",
      content: (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="font-medium text-[#727272] uppercase text-sm tracking-wider">Main</h4>
            {meal.ingredients.main.map((ingredient, index) => (
              <div key={index} className="flex items-baseline justify-between gap-4 text-[15px]">
                <span>{ingredient.item}</span>
                <span className="text-[#727272] whitespace-nowrap">
                  {ingredient.amount} {ingredient.unit}
                  {ingredient.optional && ' (optional)'}
                </span>
              </div>
            ))}
          </div>
          {meal.ingredients.sides && (
            <div className="space-y-3">
              <h4 className="font-medium text-[#727272] uppercase text-sm tracking-wider">Sides</h4>
              {meal.ingredients.sides.map((ingredient, index) => (
                <div key={index} className="flex items-baseline justify-between gap-4 text-[15px]">
                  <span>{ingredient.item}</span>
                  <span className="text-[#727272] whitespace-nowrap">
                    {ingredient.amount} {ingredient.unit}
                    {ingredient.optional && ' (optional)'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    },
    {
      title: "INSTRUCTIONS",
      content: (
        <div className="space-y-6">
          {meal.instructions.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-medium">{section.title}</h4>
              <ol className="space-y-3">
                {section.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-[15px] text-[#414141] pl-8 relative">
                    <span className="absolute left-0 font-medium text-black">
                      {stepIndex + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )
    }
  ]

  return (
    <DetailPopup
      open={open}
      onOpenChange={onOpenChange}
      title={meal.title}
      subtitle={meal.subtitle}
      duration={meal.prepTime}
      image={meal.image}
      sections={sections}
    />
  )
}

