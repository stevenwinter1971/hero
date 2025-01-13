export interface Meal {
  name: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
}

export interface DailyMeals {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export const weeklyMeals: DailyMeals[] = [
  {
    breakfast: {
      name: "Oatmeal with Berries",
      ingredients: [
        { name: "Oats", amount: 50, unit: "g" },
        { name: "Mixed Berries", amount: 100, unit: "g" },
        { name: "Honey", amount: 1, unit: "tbsp" },
      ],
    },
    lunch: {
      name: "Chicken Salad Sandwich",
      ingredients: [
        { name: "Chicken Breast", amount: 150, unit: "g" },
        { name: "Whole Wheat Bread", amount: 2, unit: "slices" },
        { name: "Lettuce", amount: 30, unit: "g" },
        { name: "Tomato", amount: 50, unit: "g" },
        { name: "Mayonnaise", amount: 1, unit: "tbsp" },
      ],
    },
    dinner: {
      name: "Grilled Salmon with Quinoa",
      ingredients: [
        { name: "Salmon Fillet", amount: 150, unit: "g" },
        { name: "Quinoa", amount: 50, unit: "g" },
        { name: "Broccoli", amount: 100, unit: "g" },
        { name: "Lemon", amount: 0.5, unit: "" },
        { name: "Olive Oil", amount: 1, unit: "tbsp" },
      ],
    },
  },
  // Add more daily meals for the rest of the week...
];

// Repeat the above daily meals 6 more times to complete a week
for (let i = 1; i < 7; i++) {
  weeklyMeals.push(weeklyMeals[0]);
}

export function getIngredientsForDays(days: number): { name: string; amount: number; unit: string }[] {
  const ingredients: { [key: string]: { amount: number; unit: string } } = {};

  for (let i = 0; i < days; i++) {
    const dailyMeals = weeklyMeals[i];
    [dailyMeals.breakfast, dailyMeals.lunch, dailyMeals.dinner].forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        if (ingredients[ingredient.name]) {
          ingredients[ingredient.name].amount += ingredient.amount;
        } else {
          ingredients[ingredient.name] = { ...ingredient };
        }
      });
    });
  }

  return Object.entries(ingredients).map(([name, { amount, unit }]) => ({
    name,
    amount,
    unit: formatUnit(unit, amount),
  }));
}

function formatUnit(unit: string, amount: number): string {
  switch (unit.toLowerCase()) {
    case 'g':
      return amount >= 453 ? 'lb' : 'oz';
    case 'ml':
      return amount >= 946 ? 'qt' : 'cup';
    case 'tbsp':
      return 'tbsp';
    case 'tsp':
      return 'tsp';
    case '':
      return amount === 1 ? 'piece' : 'pieces';
    default:
      return unit;
  }
}

