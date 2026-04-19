import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
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

const _meals = new Hono()
    .get('/', (c) => c.json<SavedMeal[]>(null!))
    .post('/', zValidator('json', SavedMealSchema), (c) => c.json<SavedMeal>(null!, 201))
    .put('/:id', zValidator('json', UpdateMealSchema), (c) => c.json<SavedMeal>(null!))
    .delete('/:id', (c) => c.body(null, 204))

const _app = new Hono().route('/meals', _meals)
export type AppType = typeof _app
