import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { PrismaClient } from '@prisma/client'
import { SavedMealSchema, UpdateMealSchema } from '@fc/shared'

const prisma = new PrismaClient()

export const mealsRouter = new Hono()

mealsRouter.get('/', async (c) => {
    const meals = await prisma.meal.findMany({
        include: { ingredients: true },
        orderBy: { date: 'desc' },
    })
    return c.json(meals)
})

mealsRouter.post('/', zValidator('json', SavedMealSchema), async (c) => {
    const body = c.req.valid('json')
    const meal = await prisma.meal.create({
        data: {
            id: body.id,
            date: body.date,
            name: body.name,
            totalFiberGrams: body.totalFiberGrams,
            ingredients: {
                create: body.ingredients.map((i) => ({
                    id: i.id,
                    ingredientId: i.ingredientId,
                    name: i.name,
                    unit: i.unit,
                    quantity: i.quantity,
                    fiberPerUnit: i.fiberPerUnit,
                    fiberGrams: i.fiberGrams,
                })),
            },
        },
        include: { ingredients: true },
    })
    return c.json(meal, 201)
})

mealsRouter.put('/:id', zValidator('json', UpdateMealSchema), async (c) => {
    const id = c.req.param('id')
    const body = c.req.valid('json')
    const meal = await prisma.$transaction(async (tx) => {
        await tx.mealIngredient.deleteMany({ where: { mealId: id } })
        return tx.meal.update({
            where: { id },
            data: {
                name: body.name,
                totalFiberGrams: body.totalFiberGrams,
                ingredients: {
                    create: body.ingredients.map((i) => ({
                        id: i.id,
                        ingredientId: i.ingredientId,
                        name: i.name,
                        unit: i.unit,
                        quantity: i.quantity,
                        fiberPerUnit: i.fiberPerUnit,
                        fiberGrams: i.fiberGrams,
                    })),
                },
            },
            include: { ingredients: true },
        })
    })
    return c.json(meal)
})

mealsRouter.delete('/:id', async (c) => {
    const id = c.req.param('id')
    await prisma.meal.delete({ where: { id } })
    return c.body(null, 204)
})
