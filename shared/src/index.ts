import { z } from 'zod'

export const MenuIngredientSchema = z.object({
    id: z.string(),
    ingredientId: z.string(),
    name: z.string(),
    unit: z.string(),
    quantity: z.number().positive(),
    fiberPerUnit: z.number().nonnegative(),
    fiberGrams: z.number().nonnegative(),
})

export const SavedMealSchema = z.object({
    id: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    name: z.string().min(1),
    ingredients: z.array(MenuIngredientSchema),
    totalFiberGrams: z.number().nonnegative(),
})

export const UpdateMealSchema = SavedMealSchema.omit({ id: true, date: true })

export type MenuIngredient = z.infer<typeof MenuIngredientSchema>
export type SavedMeal = z.infer<typeof SavedMealSchema>
export type UpdateMeal = z.infer<typeof UpdateMealSchema>
