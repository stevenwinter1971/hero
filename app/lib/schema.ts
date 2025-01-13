import * as z from "zod"

export const personalDetailsSchema = z.object({
  birthdate: z.string().min(1, "Birthdate is required"),
  weight: z.number().min(50, "Weight must be at least 50 pounds").max(400, "Weight must be at most 400 pounds"),
  heightFeet: z.number().min(3, "Height must be at least 3 feet").max(8, "Height must be at most 8 feet"),
  heightInches: z.number().min(0, "Inches must be between 0 and 11").max(11, "Inches must be between 0 and 11"),
  sex: z.enum(["Male", "Female"], {
    required_error: "Please select your biological sex",
  }),
})

export type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>

export const sportsPreferencesSchema = z.object({
  fitnessLevel: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Please select your fitness level",
  }),
  preferredSport: z.enum(["General Fitness", "Basketball", "Golf", "Brazilian Jiu Jitsu", "Cycling", "Running"], {
    required_error: "Please select your preferred sport",
  }),
})

export type SportsPreferencesFormValues = z.infer<typeof sportsPreferencesSchema>

export const cuisinePreferencesSchema = z.object({
  preferredCuisines: z.array(z.enum(["American", "Italian", "Mexican", "Chinese", "Japanese", "Thai"])).min(1, "Please select at least one cuisine"),
})

export type CuisinePreferencesFormValues = z.infer<typeof cuisinePreferencesSchema>

export const allergenPreferencesSchema = z.object({
  allergens: z.array(z.enum(["No food allergies", "Milk (Dairy)", "Wheat / Gluten", "Eggs", "Peanuts", "Shellfish"])),
})

export type AllergenPreferencesFormValues = z.infer<typeof allergenPreferencesSchema>

